/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
  }
  
  type FC<P = {}> = FunctionComponent<P>;
  
  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }
  
  type JSXElementConstructor<P> = ((props: P) => ReactElement | null) | (new (props: P) => Component<P, any>);
  
  type Key = string | number;
  
  type ReactText = string | number;
  type ReactChild = ReactElement | ReactText;
  type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
  
  interface ReactPortal extends ReactElement {
    key: Key | null;
    children: ReactNode;
  }
  
  type ReactFragment = {} | ReactNodeArray;
  interface ReactNodeArray extends Array<ReactNode> {}
  
  function useState<T>(initialState: T | (() => T)): [T, Dispatch<SetStateAction<T>>];
  function useState<T = undefined>(): [T | undefined, Dispatch<SetStateAction<T | undefined>>];
  
  type SetStateAction<S> = S | ((prevState: S) => S);
  type Dispatch<A> = (value: A) => void;
  
  type FormEvent<T = Element> = BaseSyntheticEvent<Event, EventTarget & T, HTMLElement>;
  type ChangeEvent<T = Element> = BaseSyntheticEvent<Event, EventTarget & T, HTMLElement>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: React.HTMLAttributes<HTMLDivElement>;
      span: React.HTMLAttributes<HTMLSpanElement>;
      button: React.ButtonHTMLAttributes<HTMLButtonElement>;
      input: React.InputHTMLAttributes<HTMLInputElement>;
      form: React.FormHTMLAttributes<HTMLFormElement>;
      label: React.LabelHTMLAttributes<HTMLLabelElement>;
      h1: React.HTMLAttributes<HTMLHeadingElement>;
      h2: React.HTMLAttributes<HTMLHeadingElement>;
      h3: React.HTMLAttributes<HTMLHeadingElement>;
      p: React.HTMLAttributes<HTMLParagraphElement>;
      i: React.HTMLAttributes<HTMLElement>;
      nav: React.HTMLAttributes<HTMLElement>;
      aside: React.HTMLAttributes<HTMLElement>;
      main: React.HTMLAttributes<HTMLElement>;
      header: React.HTMLAttributes<HTMLElement>;
      br: React.HTMLAttributes<HTMLBRElement>;
      ul: React.HTMLAttributes<HTMLUListElement>;
      li: React.HTMLAttributes<HTMLLIElement>;
      select: React.SelectHTMLAttributes<HTMLSelectElement>;
      option: React.OptionHTMLAttributes<HTMLOptionElement>;
    }
  }
}
