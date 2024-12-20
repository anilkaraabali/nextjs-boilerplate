import { render, screen } from '@testing-library/react';

import { CircularProgress } from '../CircularProgress';

describe('CircularProgress', () => {
  it('renders the component with default props', () => {
    render(<CircularProgress />);

    const progress = screen.getByTestId('circular-progress');

    expect(progress).toBeInTheDocument();
    expect(progress).toHaveClass('circular-progress');
    expect(progress).toHaveClass('circular-progress--dark');
    expect(progress).toHaveClass('circular-progress--md');
  });

  it('applies the correct size class', () => {
    render(<CircularProgress size='lg' />);

    const progress = screen.getByTestId('circular-progress');

    expect(progress).toHaveClass('circular-progress--lg');
  });

  it('applies the correct theme class', () => {
    render(<CircularProgress theme='light' />);

    const progress = screen.getByTestId('circular-progress');

    expect(progress).toHaveClass('circular-progress--light');
  });

  it('applies custom class names', () => {
    render(<CircularProgress className='custom-class' />);

    const progress = screen.getByTestId('circular-progress');

    expect(progress).toHaveClass('custom-class');
  });

  it('applies both size and theme class names together', () => {
    render(<CircularProgress size='xl' theme='light' />);

    const progress = screen.getByTestId('circular-progress');

    expect(progress).toHaveClass('circular-progress--xl');
    expect(progress).toHaveClass('circular-progress--light');
  });
});
