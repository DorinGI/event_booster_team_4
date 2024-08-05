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
        cardsContainer.appendChild(card);
    });
}

eventsApi.getEvents()
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


// Choose Country

const dropdownInput = document.getElementById('dropdown-input');
const dropdownMenu = document.querySelector('.dropdown-menu');

dropdownInput.addEventListener('click', function() {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', function(event) {
    if (!dropdownInput.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});

const dropdownItems = document.querySelectorAll('.dropdown-menu li');
dropdownItems.forEach(item => {
    item.addEventListener('click', function() {
        dropdownInput.value = this.textContent;
        dropdownMenu.style.display = 'none';
    });
});