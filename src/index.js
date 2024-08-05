import EventsApi from './api.js';

const eventsApi = new EventsApi();

function displayEvents(events) {
  const cardsContainer = document.querySelector('.cards');
  events.forEach(event => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
            <img class="event-image" src="${event.images[0].url}" alt="${event.name}">
            <h3 class="event-name">${event.name}</h3>
            <p class="event-date">${event.dates.start.localDate}</p>
            <p class="event-place">${event._embedded.venues[0].name}</p>
                `;
    card.addEventListener('click', () => showModal(event));
    cardsContainer.appendChild(card);
  });
}


function showModal(event) {
    const modal = document.getElementById('event-modal');
    document.getElementById('modal-image').src = event.images[0].url;
    document.getElementById('modal-event-name').textContent = event.name;
    document.getElementById('modal-event-date').textContent = event.dates.start.localDate;
    document.getElementById('modal-event-place').textContent = event._embedded.venues[0].name;
    document.getElementById('modal-event-description').textContent = event.description || 'Nu există o descriere disponibilă.';

    modal.style.display = 'flex';

    const closeButton = modal.querySelector('.close-button');
    closeButton.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

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
    console.error('There has been a problem with your fetch operation:', error);
  });
