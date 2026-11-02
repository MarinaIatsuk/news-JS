import Loader from './loader';
import type { ApiMode } from '../../types/news';

const API_MODE: ApiMode = 'live'; 

class AppLoader extends Loader {
protected readonly mode: ApiMode = API_MODE;

public constructor() {
    const apiUrl = process.env.API_URL;
    const apiKey = process.env.API_KEY;

    if (!apiUrl || !apiKey) {
        throw new Error('API_URL or API_KEY is missing in .env');
    }

    super(apiUrl, { apiKey });
}
}

export default AppLoader;
