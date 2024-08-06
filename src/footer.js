document.addEventListener("DOMContentLoaded", function() {
    const totalPages = 29;
    const paginationContainer = document.getElementById("pagination-container");

    function loadPage(page) {
        const content = document.getElementsByClassName("cards");
        content.innerHTML = `<p>Loading content for page ${page}...</p>`;
        setTimeout(() => {
            content.innerHTML = `<p>This is the content of page ${page}.</p>`;
        }, 500);
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