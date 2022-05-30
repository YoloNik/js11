export default class fetchAPI {
  constructor() {
    this.inputValue = '';
    this.API_KEY = `27731761-2d24267d92059d0b1c4703b1a`;
    this.page = 1;
  }

  async fetchData() {
    return await fetch(
      `https://pixabay.com/api/?key=${this.API_KEY}&q=${this.inputValue}&image_type=photo&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`,
    )
      .then(response => {
        this.page += 1;
        if (response.status === 404) throw new Error();

        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => console.log(error));
  }

  get value() {
    return this.inputValue;
  }

  set value(newValue) {
    this.page = 1;
    this.inputValue = newValue;
  }
}
