import AppLoader from './appLoader';

import {
    isNewsResponse,
    isSourcesResponse,
} from '../../types/guards';

import { Endpoint } from '../../types/news';

import type {
    NewsResponse,
    SourcesResponse,
} from '../../types/news';


class AppController extends AppLoader {
public async getSources(): Promise<SourcesResponse> {
    const endpoint =
        this.mode === 'demo'
            ? `mocks/${Endpoint.Sources}`
            : Endpoint.Sources;

    return this.getResp(endpoint, isSourcesResponse);
}

public async getNews(event: Event): Promise<NewsResponse | null> {
    const target = event.target;
    const container = event.currentTarget;

    if (
        !(target instanceof Element) ||
        !(container instanceof HTMLElement)
    ) {
        return null;
    }

    const item = target.closest<HTMLElement>('.source__item');

    if (!item || !container.contains(item)) {
        return null;
    }

    const sourceId = item.dataset.sourceId;

    if (!sourceId) {
        return null;
    }

    const endpoint =
        this.mode === 'demo'
            ? `mocks/${Endpoint.Everything}`
            : Endpoint.Everything;

    const data = await this.getResp(
        endpoint,
        isNewsResponse,
        { sources: sourceId }
    );

    if (this.mode === 'demo') {
        const articles = data.articles.filter(
            (article) => article.source.id === sourceId
        );

        return {
            ...data,
            articles,
            totalResults: articles.length,
        };
    }

    return data;
}
}

export default AppController;
