import { Article } from "~/components/Article/Article";
import Foo from '../content/Foo.mdx';
import Bar from '../content/Bar.mdx';
import Baz from '../content/Baz.mdx';

import styles from './styles.module.css';

export default function Home() {
  return (
    <main>
      <h1>
        Petri Hänninen
      </h1>

      <p className={styles.lede}>
        I write code, climb rocks, click heads and am curious about pretty much everything.
      </p>

      <Article title="Foobar" date={new Date()}><Foo /></Article>

      <Article title="Foobar" date={new Date('2025-03-14')}><Bar /></Article>

      <Article title="Foobar" date={new Date('2025-01-01')}><Baz /></Article>
    </main>
  );
}
