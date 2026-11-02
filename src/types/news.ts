export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export type ApiMode = 'demo' | 'live';

export interface Source {
    id: string;
    name: string;
    description: string;
}

export type SourcePreview = Pick<Source, 'id' | 'name'>;

export interface Article {
    source: {
        id: string | null;
        name: string;
    };

    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
}

export interface SourcesResponse {
    status: 'ok';
    sources: Source[];
}

export interface NewsResponse {
    status: 'ok';
    totalResults: number;
    articles: Article[];
}

export interface RequestOptions {
    apiKey: string;
    sources: string;
}

export type Validator<T> = (data: unknown) => data is T;