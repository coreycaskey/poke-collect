import { render, screen } from "@testing-library/react"
import { LoginPage } from "../Login"

describe('<LoginPage />', () => {
  it('should render', () => {
    const { container } = render(<LoginPage />);

    expect(container).toBeInTheDocument();
  });

  it('should show Login form', () => {
    render(<LoginPage />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login'})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up'})).toBeInTheDocument();
  })
})
