import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Switch, SwitchProps } from '../Switch';

const renderSwitch = (props: Partial<SwitchProps> = {}) =>
  render(
    <Switch id='test-switch' {...props}>
      Toggle
    </Switch>
  );

describe('Switch', () => {
  it('renders the switch with default props', () => {
    renderSwitch();
    const switchButton = screen.getByRole('switch');

    expect(switchButton).toBeInTheDocument();
    expect(switchButton).not.toBeChecked();
  });

  it('applies the correct size and theme classes', () => {
    renderSwitch({ size: 'lg', theme: 'primary' });
    const switchButton = screen.getByRole('switch');

    expect(switchButton).toHaveClass('switch__button--size-lg');
    expect(switchButton).toHaveClass('switch__button--theme-primary');
  });

  it('toggles aria-checked when checked is true', () => {
    renderSwitch({ checked: true });
    const switchButton = screen.getByRole('switch');

    expect(switchButton).toBeChecked();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();

    renderSwitch({ onClick: handleClick });
    const switchButton = screen.getByRole('switch');

    fireEvent.click(switchButton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    renderSwitch({ className: 'custom-class' });
    const switchButton = screen.getByRole('switch');

    expect(switchButton).toHaveClass('custom-class');
  });

  it('uses the provided id', () => {
    renderSwitch({ id: 'custom-id' });
    const switchButton = screen.getByRole('switch');

    expect(switchButton).toHaveAttribute('id', 'custom-id');
  });

  it('renders in an unchecked state by default', () => {
    renderSwitch();
    const switchButton = screen.getByRole('switch');

    expect(switchButton).not.toBeChecked();
  });
});
