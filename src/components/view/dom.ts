export function getElement<T extends Element>(
    parent: ParentNode,
    selector: string,
    elementType: { new (...args: never[]): T }
): T {
    const element = parent.querySelector(selector);

    if (!(element instanceof elementType)) {
        throw new Error(`Missing or invalid element: ${selector}`);
    }

    return element;
}