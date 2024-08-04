import EventsApi from './api.js';

// const window = document.defaultView;

const eventsApi = new EventsApi();

// window.addEventListener('load', onSubmit);

// function onSubmit(e) {
//     e.preventDefault();

//     const window = document.defaultView;
//     console.log(window);
//     fetchEvents();
// }

// function fetchEvents() {
//     return eventsApi
//         .getEvents()
//         .then(({ events }) => {
//             if (events?.length === 0) {
//                 throw new Error("No Data")
//             }
//             return events.reduce(
//                 (markup, event) => createMarkup(event) + markup,
//                 ""
//             );
//         })
//         .then((markup) => {
//         updateEventsList(markup);
//         })
//         .catch(onError);
// }
// function createMarkup(event) {
//     const { name,url} = event;

//     return `
//      <div class="event-card">
//      <img src= class="event-img"> 
//      <h2 class="event-title">${name}</h2>
//      <h3 class="event-date"></h3>
//      <p class="event-locations"></p>
//      <a href=${url} class="event-link" target="_blank">Read more</a>
//     </div>
//     `;
// }

// function updateEventsList(markup) {
//   document
//     .querySelector('.cards')
//     .insertAdjacentHTML("beforeend", markup);
// }
// function onError(err) {
//   console.error(err);
// }

// GPT
// const apiKey = 'Z9sML3GkU2JtjpwYuKAphTWzMdRrsxCG';
// const apiUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}&pageSize=16&page=1`;

// function fetchEvents() {
//     return fetch(apiUrl)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         });
// }

function displayEvents(events) {
    const cardsContainer = document.querySelector('.cards');
    events.forEach(event => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${event.images[0].url}" alt="${event.name}">
            <h3>${event.name}</h3>
            <p>${event.dates.start.localDate}</p>
            <p>${event._embedded.venues[0].name}</p>
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