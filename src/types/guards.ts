import type {
    Article,
    NewsResponse,
    Source,
    SourcesResponse,
} from './news';

function isRecord(value: unknown): value is Record<string, unknown> {
    return (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
    );
}

function isNullableString(value: unknown): value is string | null {
    return typeof value === 'string' || value === null;
}

function isSource(value: unknown): value is Source {
    return (
        isRecord(value) &&
        typeof value.id === 'string' &&
        typeof value.name === 'string' &&
        typeof value.description === 'string'
    );
}

function isArticle(value: unknown): value is Article {
    if (!isRecord(value) || !isRecord(value.source)) {
        return false;
    }

    return (
        isNullableString(value.source.id) &&
        typeof value.source.name === 'string' &&
        isNullableString(value.author) &&
        typeof value.title === 'string' &&
        isNullableString(value.description) &&
        typeof value.url === 'string' &&
        isNullableString(value.urlToImage) &&
        typeof value.publishedAt === 'string'
    );
}

export function isSourcesResponse(
    value: unknown
): value is SourcesResponse {
    return (
        isRecord(value) &&
        value.status === 'ok' &&
        Array.isArray(value.sources) &&
        value.sources.every(isSource)
    );
}

export function isNewsResponse(
    value: unknown
): value is NewsResponse {
    return (
        isRecord(value) &&
        value.status === 'ok' &&
        typeof value.totalResults === 'number' &&
        Array.isArray(value.articles) &&
        value.articles.every(isArticle)
    );
}