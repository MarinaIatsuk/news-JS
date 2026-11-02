
import type { RequestOptions, Validator } from '../../types/news';
class Loader {
    public constructor(
    private readonly baseLink: string,
    private readonly options: Readonly<Partial<RequestOptions>>
) {}

public async getResp<T>(
    endpoint: string,
    validate: Validator<T>,
    options: Partial<RequestOptions> = {}
): Promise<T> {
    const url = new URL(endpoint, this.baseLink);

    const params = {
        ...this.options,
        ...options,
    };

    Object.entries(params).forEach(([key, value]) => {
        if (typeof value === 'string') {
            url.searchParams.set(key, value);
        }
    });

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!validate(data)) {
        throw new Error('Invalid API response');
    }

    return data;
}
}

export default Loader;
