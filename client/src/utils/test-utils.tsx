import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider, ProviderProps } from 'react-redux';
import store from 'store';
import { MemoryRouter } from 'react-router-dom';

const Wrapper = ({ children }: { children: ReactElement }) => {
  return (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
};

const customRender = (ui: ReactElement, options: RenderOptions) =>
  render(ui, { wrapper: Wrapper as React.ComponentType, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
