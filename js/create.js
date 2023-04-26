const createNewsHeader = (title) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('news__head');

    const container = document.createElement('div');
    container.classList.add('container');

    const h2 = document.createElement('h2');
    h2.classList.add('news__header');
    h2.innerText = title;

    container.append(h2);
    wrapper.append(container);

    return wrapper;
};

const createImg = (image, title) => {
    const div = document.createElement('div');
    div.classList.add('news__img');
    const img = document.createElement('img');
    if (image) {
        img.src = image;
        img.alt = title;
    } else {
        img.src = 'img/unsplash.png';
        img.alt = 'Изображение отсутствует';
    }

    div.append(img);
    return div;
};

const createLink = (title, url) => {
    const link = document.createElement('a');
    link.classList.add('news__link');
    link.href = url;
    link.target = '_blank';

    const h3 = document.createElement('h3');
    h3.classList.add('news__title');
    h3.innerText = title;

    const arrow = document.createElement('div');

    link.append(h3, arrow);

    return link;
};

const createDate = (published) => {
    const data = new Date(published);
    const date = data.toLocaleDateString('ru-RU');
    const time = `${data.getHours()}:${data.getMinutes()}`;

    const div = document.createElement('div');
    div.classList.add('news__date');

    const pDate = document.createElement('p');
    pDate.classList.add('news__year');
    pDate.innerText = date;

    const pTime = document.createElement('p');
    pTime.classList.add('news__time');
    pTime.innerText = time;

    div.append(pDate, pTime);

    return div;
};

const createNewsItem = (news) => {
    const item = document.createElement('div');
    item.classList.add('news__item');

    const img = createImg(news.urlToImage, news.title);

    const title = createLink(news.title, news.url);

    const body = document.createElement('p');
    body.classList.add('news__body');
    body.innerText = news.description;

    const desc = document.createElement('div');
    desc.classList.add('news__description');

    const date = createDate(news.publishedAt);

    const author = document.createElement('p');
    author.classList.add('news__author');
    author.innerText = news.author;

    desc.append(date, author);
    item.append(img, title, body, desc);

    return item;
};

const renderNews = (newsList, response) => {

    const allNews = response.map(createNewsItem);
    newsList.append(...allNews);
};

export const createNewsBlock = (error, title, response) => {

    const news = document.createElement('section');
    news.classList.add('news');

    if (error) {
        const message = document.createElement('p');
        message.classList.add('error');
        message.innerText = 'Что-то пошло не так...';

        news.append(message);
        return news;
    }

    const header = createNewsHeader(title);

    const newsList = document.createElement('div')
    newsList.classList.add('container', 'news__list');
    renderNews(newsList, response);
    news.append(header, newsList);

    return news;

};
