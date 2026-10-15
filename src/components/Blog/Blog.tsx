'use client'

import type { PropsWithChildren } from 'react';
import { useState } from 'react';

type BlogProps = {
  slug: string;
  title: string;
  lede?: string;
  date?: string;
}

export const Blog: React.FC<PropsWithChildren<BlogProps>> = ({ slug, title, lede, date, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <article className="post" data-open={open}>
      <div className="post-head">
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

      <div className="post-body prose" id={`content-${slug}`} hidden={!open}>
        {children}
      </div>
    </article>
  )
}
