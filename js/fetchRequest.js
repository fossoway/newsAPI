const URL = 'https://newsapi.org/v2/';

const fetchRequest = async (prefix, {
    method = 'get',
    callback,
    title,
    body,
    headers,
    param,
}) => {
    try {
        const options = {
            method,
        };

        if (body) options.body = JSON.stringify(body);
        if (headers) options.headers = headers;

        const search = new URLSearchParams(param);
        
        const response = await fetch(`${URL}${prefix}${search}`, options);
        
        if (response.ok) {
            const data = await response.json();
            if (callback) return callback(null, title, data.articles);
            return;
        }

        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        } catch (err) {
        return callback(err);
        }
};

export default fetchRequest;