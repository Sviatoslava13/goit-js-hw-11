import axios from 'axios';

export async function getUser(searchQuery, page) {
   const API_KEY = '30284950-1e08157aafd4339d0b59ad3e4';
  try {
return await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    ).then(response => { return response.data })
    
  } catch (error) {
    console.error(error);
  }

}
