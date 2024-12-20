import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '../Button';

describe('Button', () => {
  it('should render the button with text content', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByTestId('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  it('should render with the correct size class', () => {
    render(<Button size='lg'>Large Button</Button>);
    const button = screen.getByTestId('button');

    expect(button).toHaveClass('button-size--lg');
  });

  it('should render with the correct theme class', () => {
    render(<Button theme='primary'>Primary Button</Button>);
    const button = screen.getByTestId('button');

    expect(button).toHaveClass('button-theme--primary');
  });

  it('should render an icon-only button correctly', () => {
    render(<Button isIconOnly={true} startContent={<span>🌟</span>} />);
    const button = screen.getByTestId('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button--fab');
    expect(button).toContainHTML('🌟');
  });

  it('should render startContent and endContent correctly', () => {
    render(
      <Button endContent={<span>👈</span>} startContent={<span>👉</span>}>
        Click Me
      </Button>
    );
    const button = screen.getByTestId('button');

    expect(button).toContainHTML('👈');
    expect(button).toContainHTML('👉');
  });

  it('should handle click events', () => {
    const mockOnClick = jest.fn();

    render(<Button onClick={mockOnClick}>Click me</Button>);
    const button = screen.getByTestId('button');

    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should add aria-label for icon-only buttons', () => {
    render(<Button isIconOnly={true} startContent={<span>🌟</span>} />);
    const button = screen.getByTestId('button');

    expect(button).toHaveAttribute('aria-label', 'icon button');
  });
});
