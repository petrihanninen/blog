'use client'

import type { PropsWithChildren } from 'react';
import { useState } from 'react';

type BlogProps = {
  slug: string;
  index: number;
  title: string;
  lede?: string;
  date?: string;
}

export const Blog: React.FC<PropsWithChildren<BlogProps>> = ({ slug, index, title, lede, date, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <article className="post" data-open={open}>
      <div className="post-head">
        <span className="post-index" aria-hidden>{String(index).padStart(2, '0')}</span>
        {date && <time className="post-date" dateTime={date}>{date}</time>}
        <h2 className="post-title">
          <button
            type="button"
            className="post-toggle"
            aria-expanded={open}
            aria-controls={`content-${slug}`}
            onClick={() => setOpen(!open)}
          >
            {title}
          </button>
        </h2>
        {lede && <p className="post-lede">{lede}</p>}
        <span className="post-marker" aria-hidden />
      </div>

      <div className="post-body" id={`content-${slug}`} hidden={!open}>
        {children}
      </div>
    </article>
  )
}
