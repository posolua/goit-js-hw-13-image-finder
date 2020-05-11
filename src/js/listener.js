import refs from './refs';
import ApiService from './apiService';
import renderImages from './renderImages';
import notice from './notify';
import * as basicLightbox from 'basiclightbox';
import LoadMoreBtn from './load-more-btn';

class ImageData {
  _search = '';
  _page = 1;
  images = [];
  apiService = new ApiService();
  loadMoreBtn = new LoadMoreBtn({
    selector: 'button[data-action="load_more"]',
    hidden: true,
  });

  get search() {
    return this._search;
  }

  set search(value) {
    this._search = value;
    this.getDataContent(true);
  }

  get page() {
    return this._page;
  }

  set page(value) {
    this._page = value;
    this.getDataContent();
  }

  getDataContent(isReset) {
    return this.apiService
      .fetchImages(this.search, this.page)
      .then(result => {
        if (isReset) {
          refs.galleryList.innerHTML = '';
          notice.totalNummber(result.total);
          this.images = result.hits;
        } else {
          this.images = result.hits;
        }
      })
      .then(() => {
        renderImages(this.images);
      })
      .then(() => {
        this.loadMoreBtn.show();
        this.loadMoreBtn.enable();
      })
      .then(() =>
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        }),
      );
  }

  setListener() {
    refs.findButton.addEventListener(
      'click',
      this.onFindButtonClick.bind(this),
    );
    this.loadMoreBtn.refs.button.addEventListener(
      'click',
      this.onLoadButtonClick.bind(this),
    );
    refs.galleryList.addEventListener(
      'click',
      this.onLargeImageClick.bind(this),
      document
        .getElementById('search_form')
        .addEventListener('click', this.onEnterClick.bind(this)),
    );
  }

  onFindButtonClick(event) {
    event.preventDefault();
    const searchInput = document.getElementById('search_form');
    this.search = searchInput.value;
  }

  onLoadButtonClick(event) {
    event.preventDefault();
    this.page = this._page + 1;
  }

  onEnterClick() {
    if (event.key === 'Enter') {
      onFindButtonClick();
    }
  }

  onLargeImageClick(event) {
    if (event.target.nodeName !== 'IMG') return;

    basicLightbox
      .create(
        `
    <img src="${event.target.dataset.source}" width="800" height="600">
`,
      )

      .show();
  }
}

const imageData = new ImageData();
imageData.setListener();
