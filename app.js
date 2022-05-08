const container = document.getElementById('root');
const content = document.createElement('div');

const ajax = new XMLHttpRequest();
const BASE_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

ajax.open('GET', BASE_URL, false);
ajax.send();

window.addEventListener('hashchange', () => {
  const id = window.location.hash.substring(1);
  ajax.open('GET', CONTENT_URL.replace('@id', id), false);
  ajax.send();
  const newsDetail = JSON.parse(ajax.response);
  const h1 = document.createElement('h1');
  h1.innerHTML = newsDetail.title;
  content.appendChild(h1);
});

const newsList = JSON.parse(ajax.response);

const ul = document.createElement('ul');

for (const news of newsList) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = `#${news.id}`;
  a.innerHTML = news.title;
  li.appendChild(a);
  ul.appendChild(li);
}

container.appendChild(ul);
container.appendChild(content);
