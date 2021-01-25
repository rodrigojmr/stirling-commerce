import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { render } from 'test-utils';
import Header from 'ui/header';

describe('Header', () => {
  test('It renders', async () => {
    render(<Header />);
    screen.debug();
  });
});
