'use client'

import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';

type PostsContextValue = {
  openSlug: string | null;
  toggle: (slug: string) => void;
};

const PostsContext = createContext<PostsContextValue | null>(null);

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) throw new Error('usePosts must be used within <Posts>');
  return context;
};

export const Posts: React.FC<PropsWithChildren> = ({ children }) => {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const toggle = (slug: string) => setOpenSlug(current => (current === slug ? null : slug));

  return (
    <PostsContext.Provider value={{ openSlug, toggle }}>
      <main className="posts">{children}</main>
    </PostsContext.Provider>
  );
};
