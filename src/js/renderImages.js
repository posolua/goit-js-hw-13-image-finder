import list from '../templates/images.hbs';
import refs from './refs';

function renderImages(images) {
  refs.galleryList.insertAdjacentHTML('beforeend', list(images));
}
export default renderImages;
