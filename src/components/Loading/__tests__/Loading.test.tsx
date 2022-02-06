import { render, screen } from '@testing-library/react';
import { Loading } from '../Loading';

describe('<Loading />', () => {
  it('should render', () => {
    render(
      <div data-testid="loading">
        <Loading />
      </div>,
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
