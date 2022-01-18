import { screen, render } from '@testing-library/react';
import { ProfilePage } from '../index';

describe('test', () => {
  it('should render', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
