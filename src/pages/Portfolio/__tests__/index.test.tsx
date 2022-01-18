import { screen, render } from '@testing-library/react';
import { PortfolioPage } from '../index';

describe('test', () => {
  it('should render', () => {
    render(<PortfolioPage />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });
});
