'use client'

import type { PropsWithChildren } from 'react';
import { useState } from "react";

import styles from './blog.module.css';
import type { Frontmatter } from '@/app/types';

type BlogProps = {
  frontmatter: Frontmatter;
  slug: string;
}

export const Blog: React.FC<PropsWithChildren<BlogProps>> = ({ frontmatter: { title, date, lede }, slug, children }) => {
  const [hidden, setHidden] = useState(true);

  return (
    <article className={styles.article}>
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
        {date && <span className={styles.date}>{new Date(date).toLocaleDateString()}</span>}
        {lede && <p className={styles.lede}>{lede}</p>}
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
