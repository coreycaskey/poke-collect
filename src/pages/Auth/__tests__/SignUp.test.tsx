import { render, screen } from "@testing-library/react"
import { SignUpPage } from "../SignUp"

describe('<SignUpPage />', () => {
  it('should render', () => {
    const { container } = render(<SignUpPage />);

    expect(container).toBeInTheDocument();
  });

  it('should show Sign Up form', () => {
    render(<SignUpPage />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up'})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login'})).toBeInTheDocument();
  })
})
