import { openModal } from './components/modal.js';
import { createPagination } from './components/footer.js';

const API_KEY = 'Z9sML3GkU2JtjpwYuKAphTWzMdRrsxCG';

// Incarcarea cardurilor cu evenimente la deschiderea site-ului sau la reload
document.addEventListener('DOMContentLoaded', function () {
  loadPage(1); // Load the first page initially
  createPagination(1); // Initialize pagination
});

// HTTP Request
export async function loadPage(page) {
  const content = document.querySelector('.cards');
  content.innerHTML = ``;

  try {
    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events?page=${page}&apikey=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    if (data._embedded && data._embedded.events) {
      displayEvents(data._embedded.events);
    } else {
      content.innerHTML = `<p>No data available for page ${page}.</p>`;
    }
  } catch (error) {
    content.innerHTML = `<p>Error loading content for page ${page}.</p>`;
  }
}

function displayEvents(events) {
  const cardsContainer = document.querySelector('.cards');
  events.forEach(event => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="event-image">
          <img src= "${event.images[5].url}" alt="${event.name}" width="267">
        </div>
        <div class="events">
          <h3 class="event-name">
            ${event.name}
          </h3>
          <p class="event-date">
            ${event.dates.start.localDate}
          </p>
          <p class="event-place">
          ${event._embedded.venues[0].name}
          </p>
        </div>`;
    card.addEventListener('click', () => openModal(event));
    cardsContainer.appendChild(card);
  });
}

// Choose Country

const dropdownInput = document.getElementById('dropdown-input');
const dropdownMenu = document.querySelector('.dropdown-menu');

const eventsApi = {
  countryCode: '',
  page: 1,
  resetPage() {
    this.page = 1;
  },
  getEvents() {
    return fetch(
      `https://app.ticketmaster.com/discovery/v2/events?countryCode=${this.countryCode}&page=${this.page}&apikey=${API_KEY}`
    ).then(response => response.json());
  },
};
dropdownInput.addEventListener('click', function () {
  dropdownMenu.style.display =
    dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', function (event) {
  if (
    !dropdownInput.contains(event.target) &&
    !dropdownMenu.contains(event.target)
  ) {
    dropdownMenu.style.display = 'none';
  }
});

const dropdownItems = document.querySelectorAll('.dropdown-menu li');
dropdownItems.forEach(item => {
  item.addEventListener('click', function () {
    dropdownInput.value = this.textContent;
    dropdownMenu.style.display = 'none';
    eventsApi.countryCode = this.getAttribute('data-value');
    eventsApi.resetPage();
    eventsApi
      .getEvents()
      .then(data => {
        if (data._embedded && data._embedded.events) {
          displayEvents(data._embedded.events);
        } else {
          console.error('No events found');
        }
      })
      .catch(error => {
        console.error(
          'There has been a problem with your fetch operation:',
          error
        );
      });
  });
});

// -------------------INPUT START-SEARCHING-------------------------

document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const keyword = document.getElementById('searchInput').value.trim();
  if (keyword) {
    searchEvents(keyword);
  }
});

async function searchEvents(keyword) {
  const content = document.querySelector('.cards');
  content.innerHTML = ``;

  try {
    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events?keyword=${keyword}&apikey=Z9sML3GkU2JtjpwYuKAphTWzMdRrsxCG`
    );
    const data = await response.json();

    if (data._embedded && data._embedded.events) {
      displayEvents(data._embedded.events);
    } else {
      content.innerHTML = `<p>No results found for "${keyword}".</p>`;
    }
  } catch (error) {
    content.innerHTML = `<p>Error searching for "${keyword}". Please try again later.</p>`;
  }
}

// -------------------------------------------------------------------------------------
// Choose Country
