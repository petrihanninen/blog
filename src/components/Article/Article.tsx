'use client'

import type { PropsWithChildren } from 'react';
import { useState } from "react";

import styles from './article.module.css';

type ArticleProps = {
  title: string;
  date: Date;
}

const slugify = (str: string) => str.replaceAll('\s', '-').toLowerCase()

export const Article: React.FC<PropsWithChildren<ArticleProps>> = ({ title, date, children }) => {
  const [hidden, setHidden] = useState(true);
  const slug = slugify(title)

  return (
    <article>
      <button
        id={`heading-${slug}`}
        className={styles.title}
        aria-expanded={!hidden}
        aria-controls={`content-${slug}`}
        onClick={() => setHidden(!hidden)}
      >
        <h2>
          {title}
        </h2>
        <span className={styles.date}>{date.toLocaleDateString()}</span>
      </button>

      <div
        role="region"
        hidden={hidden}
        id={`content-${slug}`}
        aria-controls={`heading-${slug}`}
      >
        {children}
      </div>
    </article>
  )
}
