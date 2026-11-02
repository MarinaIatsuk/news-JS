import './sources.css';
import { getElement } from '../dom';
import type { SourcePreview } from '../../../types/news';

class Sources {
public draw(data: ReadonlyArray<SourcePreview>): void {
    const fragment = document.createDocumentFragment();

    const template = getElement(
        document,
        '#sourceItemTemp',
        HTMLTemplateElement
    );

    const container = getElement(
        document,
        '.sources',
        HTMLElement
    );

    data.forEach((item) => {
        const clone = document.importNode(template.content, true);

        const name = getElement(
            clone,
            '.source__item-name',
            HTMLElement
        );

        const button = getElement(
            clone,
            '.source__item',
            HTMLButtonElement
        );

        name.textContent = item.name;
        button.dataset.sourceId = item.id;

        fragment.append(clone);
    });

    container.replaceChildren(fragment);
}
}

export default Sources;
