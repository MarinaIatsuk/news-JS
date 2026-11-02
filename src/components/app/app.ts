import AppController from '../controller/controller';
import { AppView } from '../view/appView'
import { getElement } from '../view/dom';

class App {
   private readonly controller = new AppController();

private readonly view = new AppView();

private requestId = 0;

public start(): void {
    const sources = getElement(
        document,
        '.sources',
        HTMLElement
    );

    const status = getElement(
        document,
        '#status',
        HTMLElement
    );

    sources.addEventListener('click', (event: Event) => {
        const requestId = ++this.requestId;

        status.textContent = 'Loading news...';

        this.controller
            .getNews(event)
            .then((data) => {
                if (requestId !== this.requestId) {
                    return;
                }

                if (!data) {
                    status.textContent = '';
                    return;
                }

                this.view.drawNews(data);

                status.textContent = data.articles.length
                    ? ''
                    : 'No news for this source.';
            })
            .catch((error: unknown) => {
                if (requestId !== this.requestId) {
                    return;
                }

                status.textContent =
                    error instanceof Error
                        ? error.message
                        : 'Request failed';
            });
    });

    status.textContent = 'Loading sources...';

    this.controller
        .getSources()
        .then((data) => {
            this.view.drawSources(data);
            status.textContent =
                'Choose a source. Demo data is static.';
        })
        .catch((error: unknown) => {
            status.textContent =
                error instanceof Error
                    ? error.message
                    : 'Request failed';
        });
}
}

export default App;
