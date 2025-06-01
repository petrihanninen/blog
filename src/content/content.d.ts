declare module '*.mdx' {
  import { NextMDXOptions } from '@next/mdx';

  export const metadata: {
    title: string;
    date: Date;
  }
}
