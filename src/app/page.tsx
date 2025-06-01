import { Article } from "~/components/Article/Article";

import * as Foo from '../content/Foo.mdx';
import * as Bar from '../content/Bar.mdx';
import * as Baz from '../content/Baz.mdx';

import styles from './styles.module.css';

const articles = [Foo, Bar, Baz]

export default function Home() {
  return (
    <main>
      <h1>
        Petri Hänninen
      </h1>

      <p className={styles.lede}>
        I write code, climb rocks, click heads and am curious about pretty much everything.
      </p>

      {articles.map(article => <Article key={article.metadata.title} title={article.metadata.title} date={article.metadata.date}>{<article.default />}</Article>)}
    </main>
  );
}
