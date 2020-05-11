import axios from 'axios';

class ApiService {
  baseUrl = 'https://pixabay.com/api/';
  key = '16322040-a1680f58c95db15607ca17c03';
   fetchImages(query, page) {
    const imagesData = `?image_type=photo&orientation=horizontal&q=${encodeURIComponent(
      query,
    )}&page=${page}&per_page=12&key=${this.key}`;
    return  axios
      .get(`${this.baseUrl}${imagesData}`)
      .then(images => images.data);
  }
}

export default ApiService;
