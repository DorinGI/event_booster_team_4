document.addEventListener("DOMContentLoaded", function() {
    const totalPages = 29;
    const paginationContainer = document.getElementById("pagination-container");
    const apiKey = 'Z9sML3GkU2JtjpwYuKAphTWzMdRrsxCG';

    async function loadPage(page) {
        const content = document.querySelector(".cards");
        content.innerHTML = `<p>Loading content for page ${page}...</p>`;
        
        try {
            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events?page=${page}&apikey=${apiKey}`);
            const data = await response.json();
            console.log(data); 
            if (data._embedded && data._embedded.events) {
                displayCards(data._embedded.events);
            } else {
                content.innerHTML = `<p>No data available for page ${page}.</p>`;
            }
        } catch (error) {
            content.innerHTML = `<p>Error loading content for page ${page}.</p>`;
        }
    }

    function displayCards(events) {
        const content = document.querySelector(".cards");
        content.innerHTML = events.map(event => {
            
            const date = event.dates && event.dates.start ? event.dates.start.localDate : 'Date not available';
            const location = event._embedded && event._embedded.venues && event._embedded.venues.length > 0 
                ? event._embedded.venues[0].name 
                : 'Location not available';
    
            return `
                <div class="card">
                    <img src="${event.images[0].url}" alt="${event.name}">
                    <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-date">${date}</p>
                        <p class="card-location">${location}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    function createPagination(currentPage) {
        paginationContainer.innerHTML = '';

        const createPageButton = (page, isActive = false, isDisabled = false) => {
            const button = document.createElement('button');
            button.textContent = page;
            if (isActive) button.classList.add('active');
            if (isDisabled) button.disabled = true;
            button.addEventListener('click', () => {
                loadPage(page);
                createPagination(page);
            });
            return button;
        };

        const maxVisibleButtons = 5;
        const startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

        if (startPage > 1) {
            paginationContainer.appendChild(createPageButton(1));
            if (startPage > 2) {
                const dots = document.createElement('button');
                dots.textContent = '...';
                dots.disabled = true;
                paginationContainer.appendChild(dots);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationContainer.appendChild(createPageButton(i, i === currentPage));
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const dots = document.createElement('button');
                dots.textContent = '...';
                dots.disabled = true;
                paginationContainer.appendChild(dots);
            }
            paginationContainer.appendChild(createPageButton(totalPages));
        }
    }

    loadPage(1); // Load the first page initially
    createPagination(1); // Initialize pagination
});