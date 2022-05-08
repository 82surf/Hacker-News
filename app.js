const container = document.getElementById('root');
const BASE_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const store = {
  currentPage: 1,
};

ajax = new XMLHttpRequest();
function getData(url) {
  ajax.open('GET', url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

function newsFeed() {
  const newsList = getData(BASE_URL);
  const newsHtml = ['<ul>'];
  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    titleEl = `
      <li>
        <a href="#/detail/${newsList[i].id}">${newsList[i].title}</a>
      </li>
    `;
    newsHtml.push(titleEl);
  }
  newsHtml.push('</ul>');
  const maxPage = Math.ceil(newsList.length / 10);
  const pagingBtns = `
    <div>
      <a href="#/page/${store.currentPage > 1 ? store.currentPage - 1 : 1}">
        이전 페이지
      </a>
      <a href="#/page/${
        store.currentPage < maxPage ? store.currentPage + 1 : maxPage
      }">
        다음 페이지
      </a>
    </div>
  `;
  newsHtml.push(pagingBtns);
  container.innerHTML = newsHtml.join('');
}

function newsDetail() {
  const id = location.hash.substring(9);
  const news = getData(CONTENT_URL.replace('@id', id));
  container.innerHTML = `
    <h1>${news.title}</h1>
    <a href="#/page/${store.currentPage}">돌아가기</a>
  `;
}

function router() {
  const routePath = location.hash;
  if (routePath === '') {
    newsFeed();
  } else if (routePath.indexOf('#/page/') >= 0) {
    store.currentPage = +routePath.substring(7);
    newsFeed();
  } else if (routePath.indexOf('#/detail/') >= 0) {
    newsDetail();
  }
}

window.addEventListener('hashchange', router);

router();
