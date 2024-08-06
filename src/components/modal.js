export function openModal(event) {
  const modal = document.getElementById('eventModal');
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
                <img class="modal-logo" src="${event.images[0].url}" alt="${
    event.name
  }"> 
                <div class="modal-main">             
                    <img class="modal-image" src="${
                      event.images[0].url
                    }" alt="${event.name}">
                    <div class="modal-main-text">
                        <h2 class="modal-title">Info</h2>          
                        <div class="modal-text">${event.info || ''}</div>
                        <h2 class="modal-title">When</h2>
                        <p class="modal-text">${event.dates.start.localDate}</p>
                        <h2 class="modal-title">Where</h2>
                        <p class="modal-text">${
                          event._embedded.venues[0].name
                        }</p>
                    </div>
                </div>
                <div class="modal-buy">
                    <h2 class="modal-title">Who</h2>
                    <p class="modal-text">${event.name}</p>
                    <h2 class="modal-title">Prices</h2>
                    <p class="modal-text">${event.priceRanges[0].type || ''} ${
    event.priceRanges[0].min || ''
  }-${event.priceRanges[0].max || ''} ${event.priceRanges[0].currency || ''}</p>
                </div>`;
  modal.style.display = 'flex';
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
