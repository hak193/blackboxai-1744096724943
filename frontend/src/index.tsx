import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import type { Store } from '@reduxjs/toolkit';
import { store } from './store';
import MainApp from './components/MainApp';
import './index.css';

type AppElement = React.ReactElement<{
  store: Store;
  children?: React.ReactNode;
}>;

function createAppElement(): AppElement {
  return React.createElement(
    Provider as React.ComponentType<{ store: Store; children?: React.ReactNode }>,
    { store },
    React.createElement(MainApp)
  );
}

function initialize(): void {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Failed to find the root element');
  }

  const appElement = createAppElement();
  ReactDOM.render(appElement, container);
}

// Start the application
initialize();

// Export for testing
export { createAppElement, initialize };
