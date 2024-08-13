export function openModal(event) {
  const modal = document.getElementById('eventModal');
  const modalBody = document.getElementById('modal-body');

  if (event.priceRanges && event.priceRanges.length == 1) {
    // Modalul fara VIP
    modalBody.innerHTML = `
  <style>
        .modal-logo {
            background-image: url('${event.images[1].url}');
        }
        .modal-image {
            background-image: url('${event.images[5].url}');
        }
    </style>    
      <div class="modal-logo"></div> 
      <div class="modal-main">             
        <div class="modal-image"></div> 
        <div class="modal-main-text">
          <h2 class="modal-title">Info</h2>          
          <div class="modal-text">${event.info || ''}</div>
            <h2 class="modal-title">When</h2>
            <p class="modal-text">${event.dates.start.localDate}</p>
            <h2 class="modal-title">Where</h2>
            <p class="modal-text">${event._embedded.venues[0].name}</p>
          </div>
        </div>
        <div class="modal-buy">
          <h2 class="modal-title">Who</h2>
          <p class="modal-text">${event.name}</p>
          <h2 class="modal-title">Prices</h2>
          <div class="button-grup"> 
            <div>   
              <p class="modal-text price">${event.priceRanges[0].type || ''} ${event.priceRanges[0].min || ''
      }-${event.priceRanges[0].max || ''} ${event.priceRanges[0].currency || ''
      }</p>
              <button class="button-standard">BUY TICKETS</button>
            </div> 
          </div> 
        <div>
      <button class="button-more">MORE FROM THIS AUTHOR</button>
      <div id="more-events-container"></div>`;
  } else if (event.priceRanges && event.priceRanges.length > 1) {
    // modalul pentru VIP
    modalBody.innerHTML = `
  <style>
        .modal-logo {
            background-image: url('${event.images[1].url}');
        }
        .modal-image {
            background-image: url('${event.images[5].url}');
        }
    </style>    
      <div class="modal-logo"></div> 
      <div class="modal-main">             
        <div class="modal-image"></div> 
        <div class="modal-main-text">
          <h2 class="modal-title">Info</h2>          
          <div class="modal-text">${event.info || ''}</div>
            <h2 class="modal-title">When</h2>
            <p class="modal-text">${event.dates.start.localDate}</p>
            <h2 class="modal-title">Where</h2>
            <p class="modal-text">${event._embedded.venues[0].name}</p>
          </div>
        </div>
        <div class="modal-buy">
          <h2 class="modal-title">Who</h2>
          <p class="modal-text">${event.name}</p>
          <h2 class="modal-title">Prices</h2>
          <div class="button-grup">  
            <div> 
              <p class="modal-text price">${event.priceRanges[0].type || ''} ${event.priceRanges[0].min || ''
      }-${event.priceRanges[0].max || ''} ${event.priceRanges[0].currency || ''
      }</p>
              <button class="button-standard">BUY TICKETS</button>
            </div> 
            <div>
              <p class="modal-text price">${event.priceRanges[1].type || ''} ${event.priceRanges[1].min || ''
      }-${event.priceRanges[1].max || ''} ${event.priceRanges[1].currency || ''
      }</p>
              <button class="button-vip">BUY TICKETS</button>
            </div> 
          </div> 
        <div>
      <button class="button-more">MORE FROM THIS AUTHOR</button>
      <div id="more-events-container"></div>`;
  } else {
    // Modalul fara Price
    modalBody.innerHTML = `
  <style>
        .modal-logo {
            background-image: url('${event.images[1].url}');
        }
        .modal-image {
            background-image: url('${event.images[5].url}');
        }
    </style>    
      <div class="modal-logo"></div> 
      <div class="modal-main">             
        <div class="modal-image"></div> 
        <div class="modal-main-text">
          <h2 class="modal-title">Info</h2>          
          <div class="modal-text">${event.info || ''}</div>
            <h2 class="modal-title">When</h2>
            <p class="modal-text">${event.dates.start.localDate}</p>
            <h2 class="modal-title">Where</h2>
            <p class="modal-text">${event._embedded.venues[0].name}</p>
          </div>
        </div>
        <div class="modal-buy">
          <h2 class="modal-title">Who</h2>
          <p class="modal-text">${event.name}</p>
          <h2 class="modal-title">Prices</h2>
          <p class="modal-text">No tickets available .</p>
        </div>
      <button class="button-more">MORE FROM THIS AUTHOR</button>
      <div id="more-events-container"></div>`;
  }

  modal.style.display = 'flex';

  document.querySelector('.button-standard').addEventListener('click', () => {
    console.log('Standard Ticket');
  });
  document.querySelector('.button-vip').addEventListener('click', () => {
    console.log(' Vip Ticket');
  });
  document
    .querySelector('.button-more')
    .addEventListener('click', () => loadMoreFromAuthor(event.authorDetails));
}

export function closeModal() {
  const modal = document.getElementById('eventModal');
  modal.style.display = 'none';
}

document.querySelector('.close').addEventListener('click', closeModal);
window.addEventListener('click', event => {
  const modal = document.getElementById('eventModal');
  if (event.target === modal) {
    closeModal();
  }
});

//Function load more
function loadMoreFromAuthor(authorDetails) {
  const moreEventsContainer = document.getElementById('more-events-container');
  if (authorDetails && authorDetails.specialCondition) {
    moreEventsContainer.innerHTML =
      '<p>Loading more events from the author...</p>';
    setTimeout(() => {
      moreEventsContainer.innerHTML = `<h3>Biography</h3>
    <p>${authorDetails.bio}</p>
    <h3>Other Events</h3>
    <ul>
    ${authorDetails.otherEvents.map(e => `<li>${e}</li>`).join('')}
    </ul>`;
    }, 1000);
  } else if (authorDetails) {
    moreEventsContainer.innerHTML =
      '<p>Loading more events from the author...</p>';
    setTimeout(() => {
      moreEventsContainer.innerHTML = `<h3>Biography</h3>
        <p>${authorDetails.bio}</p>
        <h3>Other Events</h3>
        <ul>
          ${authorDetails.otherEvents.map(e => `<li>${e}</li>`).join('')}
        </ul>`;
    }, 1000);
  } else {
    moreEventsContainer.innerHTML =
      '<p>No additional information available</p>';
  }
}
