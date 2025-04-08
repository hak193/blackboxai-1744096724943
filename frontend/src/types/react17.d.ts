declare namespace React {
  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }

  type JSXElementConstructor<P> = ((props: P) => ReactElement | null) | (new (props: P) => Component<P, any>);
  type Key = string | number;

  interface Component<P = {}, S = {}> {
    render(): ReactNode;
    readonly props: Readonly<P>;
    state: Readonly<S>;
    setState<K extends keyof S>(state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null)): void;
  }

  type ReactText = string | number;
  type ReactChild = ReactElement | ReactText;
  type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
  interface ReactNodeArray extends Array<ReactNode> {}
  type ReactFragment = {} | ReactNodeArray;
  interface ReactPortal extends ReactElement {
    key: Key | null;
    children: ReactNode;
  }

  interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
    displayName?: string;
  }

  type FC<P = {}> = FunctionComponent<P>;

  interface ProviderProps<T> {
    value: T;
    children?: ReactNode;
  }

  function createElement(
    type: string | JSXElementConstructor<any>,
    props?: any,
    ...children: ReactNode[]
  ): ReactElement;

  function render(
    element: ReactElement,
    container: Element | null,
    callback?: () => void
  ): void;
}

declare module 'react' {
  export = React;
  export as namespace React;
}

declare module 'react-dom' {
  export function render(
    element: React.ReactElement,
    container: Element | null,
    callback?: () => void
  ): void;

  export function unmountComponentAtNode(container: Element): boolean;
}

declare module 'react-redux' {
  import { Store } from '@reduxjs/toolkit';

  export interface ProviderProps {
    store: Store;
    children?: React.ReactNode;
  }

  export const Provider: React.FC<ProviderProps>;
}

declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> { }
    
    interface ElementClass extends React.Component<any> {
      render(): React.ReactNode;
    }

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
      br: React.HTMLAttributes<HTMLBRElement>;
    }
  }
}
