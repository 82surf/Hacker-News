const container = document.getElementById('root');
const BASE_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

ajax = new XMLHttpRequest();
function getData(url) {
  ajax.open('GET', url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

function newsFeed() {
  const newsList = getData(BASE_URL);
  const newsHtml = ['<ul>'];
  for (const news of newsList) {
    titleEl = `
      <li>
        <a href="#${news.id}">${news.title}</a>
      </li>
    `;
    newsHtml.push(titleEl);
  }
  newsHtml.push('</ul>');
  container.innerHTML = newsHtml.join('');
}

function newsDetail() {
  const id = window.location.hash.substring(1);
  const news = getData(CONTENT_URL.replace('@id', id));
  container.innerHTML = `
    <h1>${news.title}</h1>
    <a href="#">돌아가기</a>
  `;
}

function router() {
  const routePath = location.hash;
  if (routePath === '') {
    newsFeed();
  } else {
    newsDetail();
  }
}

window.addEventListener('hashchange', router);

router();
