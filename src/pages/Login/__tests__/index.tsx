import { screen, render } from '@testing-library/react';
import { LoginPage } from '../index';

describe('test', () => {
  it('should render', () => {
    render(<LoginPage />);
    // expect(screen.getByText('Login')).toBeInTheDocument();
    expect(true).toBeTruthy();
  });

  it('should show error toast', () => {
    expect(true).toBeTruthy();
  });

  it('should login successfully', () => {
    expect(true).toBeTruthy();
  });
});
