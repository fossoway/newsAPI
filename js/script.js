import { createNewsBlock } from './create.js';
import { selectOption } from './select.js';
import fetchRequest from './fetchRequest.js';
import preload from './preload.js';

const app = document.querySelector('.app');
const form = document.querySelector('.form');
const select = document.querySelector('.form__select');

const init = () => {
    preload.show();
    selectOption(select);
    
    const news = fetchRequest('top-headlines?', {
        title: 'Свежие новости',
        callback: createNewsBlock,
        param: {
            country: 'ru',
            pageSize: 8,
            apiKey: '59830de4fc58433aa1d02f7406842ea2',
        }
    })
    return news;
};

init().then(data => {
    app.innerHTML = '';
    preload.remove();
    app.append(data);
});

select.addEventListener('change', e => {
    preload.show();
    const answer = fetchRequest('top-headlines?', {
        title: `Свежие новости`,
        callback: createNewsBlock,
        param: {
            q: e.target.value,
            pageSize: 8,
            apiKey: '59830de4fc58433aa1d02f7406842ea2',
        }
    });

    console.log(answer)

    answer.then(data => {
        app.innerHTML = '';
        preload.remove();
        app.append(data);
    })
})

form.addEventListener('submit', e => {
    e.preventDefault();
    preload.show();
    const formData = new FormData(e.target);
    const news = Object.fromEntries(formData);
    
    const answer = Promise.all([fetchRequest('everything?', {
        title: `По вашему запросу "${news.search}" найдено`,
        callback: createNewsBlock,
        param: {
            q: news.search,
            pageSize: 8,
            apiKey: '59830de4fc58433aa1d02f7406842ea2',
        }
    }),
    fetchRequest('top-headlines?', {
        title: `Свежие новости`,
        callback: createNewsBlock,
        param: {
            country: news.country,
            pageSize: 4,
            apiKey: '59830de4fc58433aa1d02f7406842ea2',
        }
    })
    ]);

    answer.then(data => {
        app.innerHTML = '';
        preload.remove();
        app.append(data[0]);
        app.append(data[1]);
    })
});


window.newsLoad = init;