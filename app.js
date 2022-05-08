const ajax = new XMLHttpRequest();
const BASE_URL = 'https://api.hnpwa.com/v0/news/1.json';
ajax.open('GET', BASE_URL, false);
ajax.send();

const newsList = JSON.parse(ajax.response);

const root = document.getElementById('root');
const ul = document.createElement('ul');

for (const news of newsList) {
  const li = document.createElement('li');
  li.innerHTML = news.title;
  ul.appendChild(li);
}

root.appendChild(ul);
