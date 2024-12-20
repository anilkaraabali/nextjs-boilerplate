import { fireEvent, render, screen } from '@testing-library/react';

import { Backdrop } from '../Backdrop';

describe('Backdrop', () => {
  it('renders correctly', () => {
    render(<Backdrop />);
    const backdrop = screen.getByTestId('backdrop');

    expect(backdrop).toBeInTheDocument();
  });

  it('accepts additional class names', () => {
    render(<Backdrop className='extra-class' />);
    const backdrop = screen.getByTestId('backdrop');

    expect(backdrop).toHaveClass('extra-class');
  });

  it('calls onEscape when Escape key is pressed', () => {
    const mockOnEscape = jest.fn();

    render(<Backdrop onEscape={mockOnEscape} />);
    const backdrop = screen.getByTestId('backdrop');

    fireEvent.keyDown(backdrop, { key: 'Escape' });

    expect(mockOnEscape).toHaveBeenCalledTimes(1);
  });

  it('does not call onEscape for other keys', () => {
    const mockOnEscape = jest.fn();

    render(<Backdrop onEscape={mockOnEscape} />);
    const backdrop = screen.getByTestId('backdrop');

    fireEvent.keyDown(backdrop, { key: 'Enter' });

    expect(mockOnEscape).not.toHaveBeenCalled();
  });
});
