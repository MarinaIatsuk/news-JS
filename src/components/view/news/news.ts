import './news.css';
import { getElement } from '../dom';
import type { Article } from '../../../types/news';

class News {
public draw(data: ReadonlyArray<Readonly<Article>>): void {
    const fragment = document.createDocumentFragment();

    const template = getElement(
        document,
        '#newsItemTemp',
        HTMLTemplateElement
    );

    const container = getElement(
        document,
        '.news',
        HTMLElement
    );

    data.slice(0, 10).forEach((item, index) => {
        const clone = document.importNode(template.content, true);

        const card = getElement(
            clone,
            '.news__item',
            HTMLElement
        );

        const photo = getElement(
            clone,
            '.news__meta-photo',
            HTMLElement
        );

        const link = getElement(
            clone,
            '.news__read-more a',
            HTMLAnchorElement
        );

        if (index % 2) {
            card.classList.add('alt');
        }

        if (item.urlToImage) {
            try {
                const imageUrl = new URL(item.urlToImage);

                if (
                    imageUrl.protocol === 'https:' ||
                    imageUrl.protocol === 'http:'
                ) {
                    const safeUrl = imageUrl.href.replace(/"/g, '%22');
                    photo.style.backgroundImage = `url("${safeUrl}")`;
                }
            } catch {
                // Останется запасной фон из CSS.
            }
        }

        getElement(
            clone,
            '.news__meta-author',
            HTMLElement
        ).textContent = item.author || item.source.name;

        getElement(
            clone,
            '.news__meta-date',
            HTMLElement
        ).textContent = item.publishedAt.slice(0, 10);

        getElement(
            clone,
            '.news__description-title',
            HTMLElement
        ).textContent = item.title;

        getElement(
            clone,
            '.news__description-source',
            HTMLElement
        ).textContent = item.source.name;

        getElement(
            clone,
            '.news__description-content',
            HTMLElement
        ).textContent = item.description ?? 'No description available.';

        try {
            const articleUrl = new URL(item.url);

            if (
                articleUrl.protocol === 'http:' ||
                articleUrl.protocol === 'https:'
            ) {
                link.href = articleUrl.href;
            } else {
                link.removeAttribute('href');
            }
        } catch {
            link.removeAttribute('href');
        }

        fragment.append(clone);
    });

    container.replaceChildren(fragment);
}
}

export default News;
