import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Input, InputProps } from '../Input';

const renderInput = (props: Partial<InputProps> = {}) =>
  render(
    <Input
      id='test-input'
      label='Test Label'
      placeholder='Enter text'
      {...props}
    />
  );

describe('Input', () => {
  it('renders the input with label', () => {
    renderInput();

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('renders placeholder text', () => {
    renderInput({ placeholder: 'Enter text' });

    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('handles startContent and endContent', () => {
    renderInput({
      endContent: <span>End</span>,
      startContent: <span>Start</span>,
    });

    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('End')).toBeInTheDocument();
  });

  it('shows description text', () => {
    renderInput({ description: 'This is a description' });

    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('shows error message and sets aria attributes', () => {
    renderInput({ errorMessage: 'This is an error' });

    expect(screen.getByText('This is an error')).toBeInTheDocument();

    const input = screen.getByLabelText('Test Label');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-errormessage', 'input-error');
  });

  it('disables the input when disabled is true', () => {
    renderInput({ disabled: true });
    const input = screen.getByLabelText('Test Label');

    expect(input).toBeDisabled();
  });

  it('focuses the input when container is clicked', () => {
    renderInput();
    const container = screen.getByRole('button');
    const input = screen.getByLabelText('Test Label');

    fireEvent.click(container);

    expect(input).toHaveFocus();
  });

  it('handles input value change', () => {
    const handleChange = jest.fn();

    renderInput({ onChange: handleChange, value: '' });
    const input = screen.getByLabelText('Test Label');

    fireEvent.change(input, { target: { value: 'Hello' } });

    expect(handleChange).toHaveBeenCalledWith(expect.anything());
  });

  it('applies the correct radius and size classes', () => {
    renderInput({ radius: 'lg', size: 'md' });
    const wrapper = screen.getByTestId('input-wrapper');

    expect(wrapper).toHaveClass('input__wrapper--radius-lg');
    expect(wrapper).toHaveClass('input__wrapper--size-md');
  });
});
