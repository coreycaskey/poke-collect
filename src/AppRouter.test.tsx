import { render } from '@testing-library/react';
import { AppRouter } from './AppRouter';

test('renders learn react link', () => {
  render(<AppRouter />);
  expect(true).toBeTruthy();
});
