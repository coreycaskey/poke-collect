import { screen, render } from '@testing-library/react';
import { AdminPage } from '../index';

describe('test', () => {
  it('should render', () => {
    render(<AdminPage />);
    expect(screen.getByText('Sync Pokemon Data')).toBeInTheDocument();
  });
});
