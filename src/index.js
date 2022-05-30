import card from './templates/card.hbs';
import FetchAPI from './fetchAPI';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const fetchAPI = new FetchAPI();

const userInput = document.getElementById(`search-form`);
const cardContainer = document.querySelector(`.gallery`);
const LoadMoreBtn = document.querySelector(`.load-more`);

userInput.addEventListener(`click`, onSearchBtn);
LoadMoreBtn.addEventListener(`click`, onLoadMoreBtn);

function onSearchBtn(e) {
  if (e.target.closest(`button`)) {
    e.preventDefault();
    fetchAPI.value = e.currentTarget.elements[0].value;
    fetchAPI.fetchData().then(data => {
      createCards(data);
      LoadMoreBtn.style.visibility = 'visible';

      if (data.total === 0) {
        LoadMoreBtn.style.visibility = 'hidden';
        cardContainer.innerHTML = '';
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
      } else {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        cardContainer.innerHTML = createCards(data);
        const lightbox = new SimpleLightbox('.photo-card a');
      }
    });
  }
}

function onLoadMoreBtn(e) {
  fetchAPI.fetchData().then(data => {
    cardContainer.insertAdjacentHTML(`beforeend`, createCards(data));
    const lightbox = new SimpleLightbox('.photo-card a');
  });
}

function createCards(data) {
  return data.hits
    .map(el => {
      return card(el);
    })
    .join('');
}
