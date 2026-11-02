import News from './news/news';
import Sources from './sources/sources';
import type {
    NewsResponse,
    SourcesResponse,
} from '../../types/news';

export class AppView {
    // constructor() {
    //     this.news = new News();
    //     this.sources = new Sources();
    // }

private readonly news = new News();

private readonly sources = new Sources();

public drawNews(data: NewsResponse): void {
    this.news.draw(data.articles);
}

public drawSources(data: SourcesResponse): void {
    this.sources.draw(data.sources);
}
}

export default AppView;
