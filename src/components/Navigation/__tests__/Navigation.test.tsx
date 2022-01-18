import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from '../Navigation';

test('renders learn react link', () => {
  render(
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>,
  );
  expect(screen.getByText('Gallery')).toBeInTheDocument();
});
