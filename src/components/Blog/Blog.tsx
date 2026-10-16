'use client'

import type { PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';
import { usePosts } from '@/components/Posts/Posts';

type BlogProps = {
  slug: string;
  title: string;
  lede?: string;
  date?: string;
}

export const Blog: React.FC<PropsWithChildren<BlogProps>> = ({ slug, title, lede, date, children }) => {
  const { openSlug, toggle } = usePosts();
  const open = openSlug === slug;
  const articleRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const article = articleRef.current;
    const body = bodyRef.current;
    if (!open || !article || !body) return;

    const scrollIntoView = () => {
      if (article.getBoundingClientRect().top < 0) {
        article.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.target === body && event.propertyName === 'grid-template-rows') scrollIntoView();
    };

    body.addEventListener('transitionend', onTransitionEnd);
    return () => body.removeEventListener('transitionend', onTransitionEnd);
  }, [open]);

  return (
    <article ref={articleRef} className="post" data-open={open}>
      <div className="post-head">
        {date && <time className="post-date" dateTime={date}>{date}</time>}
        <h2 className="post-title">
          <button
            type="button"
            className="post-toggle"
            aria-expanded={open}
            aria-controls={`content-${slug}`}
            onClick={() => toggle(slug)}
          >
            {title}
          </button>
        </h2>
        {lede && <p className="post-lede">{lede}</p>}
        <span className="post-marker" aria-hidden />
      </div>

      <div ref={bodyRef} className="post-body" id={`content-${slug}`} inert={!open}>
        <div className="post-body-clip">
          <div className="post-body-inner prose">{children}</div>
        </div>
      </div>
    </article>
  )
}
