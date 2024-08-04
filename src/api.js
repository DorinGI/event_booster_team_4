const ENDPOINT = "https://app.ticketmaster.com/discovery/v2/events";
const API_KEY = 'Z9sML3GkU2JtjpwYuKAphTWzMdRrsxCG';

export default class EventsApi {
    constructor() {
        this.querryPage = 1;
        this.searchQuerry = '';
    }

    getEvents() {
        const url = `${ENDPOINT}?apikey=${API_KEY}&p=${this.searchQuerry}&pageSize=16&page=${this.querryPage}`;
        return fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.incrementPage();
                return data;
            });
    }
    resetPage() {
        this.querryPage = 1;
    }
    incrementPage() {
        this.querryPage += 1;
    }
}