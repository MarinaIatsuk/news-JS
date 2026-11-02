import Loader from './loader';
import type { ApiMode } from '../../types/news';

const API_MODE: ApiMode = 'demo';

class AppLoader extends Loader {
protected readonly mode: ApiMode = API_MODE;

public constructor() {
    const key =
        API_MODE === 'live'
            ? window.prompt('Enter your News API key')?.trim()
            : '';

    super(
        'https://rss-news-api.onrender.com/',
        key ? { apiKey: key } : {}
    );
}
}

export default AppLoader;
