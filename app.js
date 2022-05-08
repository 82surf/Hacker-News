const container = document.getElementById('root');
const content = document.createElement('div');

ajax = new XMLHttpRequest();
function getData(url) {
  ajax.open('GET', url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

const BASE_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

window.addEventListener('hashchange', () => {
  const id = window.location.hash.substring(1);
  const newsDetail = getData(CONTENT_URL.replace('@id', id));
  const h1 = document.createElement('h1');
  h1.innerHTML = newsDetail.title;
  content.appendChild(h1);
});

const newsList = getData(BASE_URL);

const ul = document.createElement('ul');

for (const news of newsList) {
  const div = document.createElement('div');
  div.innerHTML = `
    <li>
      <a href="#${news.id}">${news.title}</a>
    </li>
  `;
  ul.appendChild(div.firstElementChild);
}

container.appendChild(ul);
container.appendChild(content);
