import { getUser } from './user.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/style.css';
const ref = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('input'),
  submitBtn: document.querySelector('button'),
  moreBtn: document.querySelector('.load-more'),
  divContainer: document.querySelector('.gallery'),
};
const { form, input, submitBtn, moreBtn, divContainer } = ref;

form.addEventListener('submit', onFormSubmit);
moreBtn.addEventListener('click', moreCrads);

let page = 1;
let searchQuery = '';

function moreCrads() {
  page += 1;
  getUser(searchQuery, page).then(markingCard);

}

function onFormSubmit(e) {
  e.preventDefault();
  searchQuery = e.target.elements.searchQuery.value;
  if (!searchQuery) {
    return Notify.failure('Write more correctly');
  }
  getUser(searchQuery, page).then(markingCard);
  clearCards();
}

function markingCard(data) {
  const imgArr = data.hits;
  const imgHits = data.totalHits;
  let arr = imgArr.length;
  console.log(arr);
  const makrup = imgArr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
      <a class="gallery__item" href="${largeImageURL}" >
  <img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item--current">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`,
    )
    .join('');
  divContainer.insertAdjacentHTML('beforeend', makrup);
  new SimpleLightbox('.photo-card a');
  if (!imgHits) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    return;
  }
  if (page === 1) {
    Notify.info(`Hooray! We found ${imgHits} images.`);
    return;
  }
  if (imgArr.length > 0) {
      moreBtn.classList.add('is-hidden');
  
  } else{
    
    moreBtn.classList.remove('is-hidden');
   Notify.info("We're sorry, but you've reached the end of search results.")
  }

}
function clearCards() {
  page = 1;
  divContainer.innerHTML = '';
moreBtn.classList.remove('is-hidden');

}

//if (imgArr.length === 0)