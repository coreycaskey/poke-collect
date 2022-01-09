import { screen, render } from '@testing-library/react';
import { GalleryPage } from '../index';

describe('test', () => {
  it('should render', () => {
    render(<GalleryPage />);
    expect(screen.getByText('Gallery')).toBeInTheDocument();
  });
});
