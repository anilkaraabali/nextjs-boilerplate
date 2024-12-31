import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('renders correctly with default props', () => {
    render(<Checkbox>Default Checkbox</Checkbox>);

    const checkbox = screen.getByTestId('checkbox');
    const label = screen.getByText('Default Checkbox');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(label).toBeInTheDocument();
  });

  it('applies the correct size and theme classes', () => {
    render(
      <Checkbox size='lg' theme='secondary'>
        Styled Checkbox
      </Checkbox>
    );

    // eslint-disable-next-line testing-library/no-node-access
    const label = screen.getByText('Styled Checkbox').closest('label');

    expect(label).toHaveClass('checkbox--size-lg');
    expect(label).toHaveClass('checkbox--theme-secondary');
  });

  it('renders as checked when the `checked` prop is true', () => {
    const handleChange = jest.fn();

    render(
      <Checkbox checked={true} onChange={handleChange}>
        Checked Checkbox
      </Checkbox>
    );

    const checkbox = screen.getByTestId('checkbox');

    expect(checkbox).toBeChecked();
  });

  it('calls the onChange handler when clicked', () => {
    const handleChange = jest.fn();

    render(
      <Checkbox checked={false} onChange={handleChange}>
        Clickable Checkbox
      </Checkbox>
    );

    const checkbox = screen.getByTestId('checkbox');

    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('toggles the `strokeDashoffset` based on the `checked` prop', () => {
    const handleChange = jest.fn();

    const { rerender } = render(
      <Checkbox checked={false} onChange={handleChange}>
        SVG Animation Test
      </Checkbox>
    );

    // eslint-disable-next-line testing-library/no-node-access
    const polyline = document.querySelector('polyline');

    expect(polyline).toHaveAttribute('stroke-dashoffset', '66');

    rerender(
      <Checkbox checked={true} onChange={handleChange}>
        SVG Animation Test
      </Checkbox>
    );

    expect(polyline).toHaveAttribute('stroke-dashoffset', '44');
  });

  it('applies additional props correctly', () => {
    render(<Checkbox aria-label='Custom Checkbox' data-custom='test' />);

    const checkbox = screen.getByTestId('checkbox');

    expect(checkbox).toHaveAttribute('aria-label', 'Custom Checkbox');
    expect(checkbox).toHaveAttribute('data-custom', 'test');
  });

  it('renders children correctly', () => {
    render(<Checkbox>Custom Label</Checkbox>);

    const label = screen.getByText('Custom Label');

    expect(label).toBeInTheDocument();
  });
});
