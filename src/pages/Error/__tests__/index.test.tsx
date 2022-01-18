import { screen, render } from '@testing-library/react';
import { ErrorPage } from '../index';

describe('test', () => {
  it('should render', () => {
    render(<ErrorPage />);
    expect(screen.getByText('We are unable to find the page you are looking for')).toBeInTheDocument();
  });
});
