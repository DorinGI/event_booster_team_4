// import { openModal } from './components/modal.js';
// import { createPagination } from './components/footer.js';

// const API_KEY = 'Z9sML3GkU2JtjpwYuKAphTWzMdRrsxCG';

// // Incarcarea cardurilor cu evenimente la deschiderea site-ului sau la reload
// document.addEventListener('DOMContentLoaded', function () {
//   loadPage(1); // Load the first page initially
//   createPagination(1); // Initialize pagination
// });

// // HTTP Request
// export async function loadPage(page) {
//   const content = document.querySelector('.cards');
//   content.innerHTML = ``;

//   try {
//     const response = await fetch(
//       `https://app.ticketmaster.com/discovery/v2/events?page=${page}&apikey=${API_KEY}`
//     );
//     const data = await response.json();
//     console.log(data);
//     if (data._embedded && data._embedded.events) {
//       displayEvents(data._embedded.events);
//     } else {
//       content.innerHTML = `<p>No data available for page ${page}.</p>`;
//     }
//   } catch (error) {
//     content.innerHTML = `<p>Error loading content for page ${page}.</p>`;
//   }
// }

// function displayEvents(events) {
//   const cardsContainer = document.querySelector('.cards');
//   events.forEach(event => {
//     const card = document.createElement('div');
//     card.className = 'card';
//     card.innerHTML = `
//         <div class="event-image">
//           <img src= "${event.images[5].url}" alt="${event.name}" width="267">
//         </div>
//         <div class="events">
//           <h3 class="event-name">
//             ${event.name}
//           </h3>
//           <p class="event-date">
//             ${event.dates.start.localDate}
//           </p>
//           <p class="event-place">
//           ${event._embedded.venues[0].name}
//           </p>
//         </div>`;
//     card.addEventListener('click', () => openModal(event));
//     cardsContainer.appendChild(card);
//   });
// }

// // Choose Country

// const dropdownInput = document.getElementById('dropdown-input');
// const dropdownMenu = document.querySelector('.dropdown-menu');

// const eventsApi = {
//   countryCode: '',
//   page: 1,
//   resetPage() {
//     this.page = 1;
//   },
//   getEvents() {
//     return fetch(
//       `https://app.ticketmaster.com/discovery/v2/events?countryCode=${this.countryCode}&page=${this.page}&apikey=${API_KEY}`
//     ).then(response => response.json());
//   },
// };
// dropdownInput.addEventListener('click', function () {
//   dropdownMenu.style.display =
//     dropdownMenu.style.display === 'block' ? 'none' : 'block';
// });

// document.addEventListener('click', function (event) {
//   if (
//     !dropdownInput.contains(event.target) &&
//     !dropdownMenu.contains(event.target)
//   ) {
//     dropdownMenu.style.display = 'none';
//   }
// });

// const dropdownItems = document.querySelectorAll('.dropdown-menu li');
// dropdownItems.forEach(item => {
//   item.addEventListener('click', function () {
//     dropdownInput.value = this.textContent;
//     dropdownMenu.style.display = 'none';
//     eventsApi.countryCode = this.getAttribute('data-value');
//     eventsApi.resetPage();
//     eventsApi
//       .getEvents()
//       .then(data => {
//         if (data._embedded && data._embedded.events) {
//           displayEvents(data._embedded.events);
//         } else {
//           console.error('No events found');
//         }
//       })
//       .catch(error => {
//         console.error(
//           'There has been a problem with your fetch operation:',
//           error
//         );
//       });
//   });
// });

// // -------------------INPUT START-SEARCHING-------------------------

// // document.getElementById('searchForm').addEventListener('submit', function (e) {
// //   e.preventDefault();

// //   const keyword = document.getElementById('searchInput').value.trim();
// //   if (keyword) {
// //     searchEvents(keyword);
// //   }
// // });

// // async function searchEvents(keyword) {
// //   const content = document.querySelector('.cards');
// //   content.innerHTML = ``;

// //   try {
// //     const response = await fetch(
// //       `https://app.ticketmaster.com/discovery/v2/events?keyword=${keyword}&apikey=Z9sML3GkU2JtjpwYuKAphTWzMdRrsxCG`
// //     );
// //     const data = await response.json();

// //     if (data._embedded && data._embedded.events) {
// //       displayEvents(data._embedded.events);
// //     } else {
// //       content.innerHTML = `<p>No results found for "${keyword}".</p>`;
// //     }
// //   } catch (error) {
// //     content.innerHTML = `<p>Error searching for "${keyword}". Please try again later.</p>`;
// //   }
// // }

// // ---------------Acest cod va oferi utilizatorilor feedback instant despre starea cererilor API și rezultatele căutărilor lor.----------------------------------------------------------------------

import { openModal } from './components/modal.js';
import { createPagination } from './components/footer.js';
import Notiflix from 'notiflix';

const API_KEY = 'Z9sML3GkU2JtjpwYuKAphTWzMdRrsxCG';

let keyword = ''; // Variabilă globală pentru cuvântul cheie
let currentPage = 1; // Variabilă globală pentru pagina curentă

// Încarcă cardurile cu evenimente la deschiderea site-ului sau la reload
document.addEventListener('DOMContentLoaded', function () {
  loadPage(currentPage); // Încarcă pagina inițială
  createPagination(currentPage, 1); // Inițializează paginarea (cu 1 pagină inițială)
});

// Funcție pentru încărcarea paginii
async function loadPage(page) {
  const content = document.querySelector('.cards');
  content.innerHTML = '';

  try {
    Notiflix.Loading.standard('Loading...');
    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events?keyword=${keyword}&page=${page}&apikey=${API_KEY}`
    );
    const data = await response.json();
    Notiflix.Loading.remove();

    if (data._embedded && data._embedded.events) {
      displayEvents(data._embedded.events);
      const totalResults = data.page.totalElements; // Numărul total de rezultate
      const resultsPerPage = data.page.size; // Numărul de rezultate pe pagină (din răspunsul API)
      const totalPages = Math.ceil(totalResults / resultsPerPage); // Calculează numărul total de pagini
      createPagination(page, totalPages); // Actualizează paginarea
      Notiflix.Notify.success(`Found ${totalResults} results for "${keyword}"`);
    } else {
      content.innerHTML = `<p>No results found for "${keyword}".</p>`;
      createPagination(page, 1); // Nu sunt rezultate, avem o singură pagină
      Notiflix.Notify.failure(`No results found for "${keyword}"`);
    }
  } catch (error) {
    content.innerHTML = `<p>Error searching for "${keyword}". Please try again later.</p>`;
    createPagination(page, 1); // Nu au fost găsite rezultate din cauza unei erori
    Notiflix.Notify.failure(
      'There was an error processing your request. Please try again later.'
    );
  }
}

// Funcție pentru afișarea evenimentelor
function displayEvents(events) {
  const cardsContainer = document.querySelector('.cards');
  events.forEach(event => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="event-image">
          <img src="${event.images[5].url}" alt="${event.name}" width="267">
        </div>
        <div class="events">
          <h3 class="event-name">${event.name}</h3>
          <p class="event-date">${event.dates.start.localDate}</p>
          <p class="event-place">${event._embedded.venues[0].name}</p>
        </div>`;
    card.addEventListener('click', () => openModal(event));
    cardsContainer.appendChild(card);
  });
}

// Choose Country

const dropdownInput = document.getElementById('dropdown-input');
const dropdownMenu = document.querySelector('.dropdown-menu');
const noEventsMessage = document.getElementById('no-events-message');

const eventsApi = {
  countryCode: '',
  page: 1,
  resetPage() {
    this.page = 1;
  },
  async getEvents() {
    try {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events?countryCode=${this.countryCode}&page=${this.page}&apikey=${API_KEY}`
      );
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch events');
    }
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
          const totalResults = data.page.totalElements; // Numărul total de rezultate
          const resultsPerPage = data.page.size; // Numărul de rezultate pe pagină (din răspunsul API)
          const totalPages = Math.ceil(totalResults / resultsPerPage); // Calculează numărul total de pagini
          createPagination(1, totalPages); // Actualizează paginarea
          Notiflix.Notify.success(
            `Found ${totalResults} results for the selected country.`
          );
          noEventsMessage.style.display = 'none';
        } else {
          clearEvents();
          noEventsMessage.textContent = `No event was found for country ${dropdownInput.value}.😊 Don't be upset, maybe for this reason you will have the opportunity to travel to another country. 😊`;
          noEventsMessage.style.display = 'block';
          createPagination(1, 1); // Nu sunt evenimente, avem o singură pagină
        }
      })
      .catch(error => {
        clearEvents();
        noEventsMessage.textContent =
          'A apărut o eroare la încărcarea evenimentelor. Vă rugăm să încercați din nou mai târziu.';
        noEventsMessage.style.display = 'block';
        console.error('No events found');
        createPagination(1, 1); // Nu sunt evenimente, avem o singură pagină
        Notiflix.Notify.failure('No events found for the selected country.');
      });
  });
});

function clearEvents() {
  const eventsContainer = document.querySelector('.cards');
  eventsContainer.innerHTML = '';
}
// Choose Country

// -------------------INPUT START-SEARCHING-------------------------
document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();

  keyword = document.getElementById('searchInput').value.trim();
  if (keyword) {
    currentPage = 1; // Resetează pagina curentă la 1 atunci când începi o nouă căutare
    loadPage(currentPage); // Încarcă pagina 1 cu rezultatele căutării
  }
});

// Actualizează pagina atunci când utilizatorul face clic pe un număr de pagină
document.getElementById('pagination-container').addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const page = parseInt(e.target.textContent, 10);
    if (!isNaN(page) && page !== currentPage) {
      currentPage = page; // Actualizează pagina curentă
      loadPage(currentPage); // Încarcă pagina curentă
    }
  }
});
