import { fireEvent, render, screen } from '@testing-library/react';

import { Chip } from '../Chip';

describe('Chip', () => {
  it('renders a div by default', () => {
    render(<Chip>Default Chip</Chip>);
    const chip = screen.getByTestId('chip');

    expect(chip.tagName).toBe('DIV');
    expect(chip).toHaveTextContent('Default Chip');
  });

  it('renders as a button when "onClick" is provided', () => {
    const onClick = jest.fn();

    render(<Chip onClick={onClick}>Button Chip</Chip>);
    const chip = screen.getByTestId('chip');

    expect(chip.tagName).toBe('BUTTON');

    fireEvent.click(chip);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders as an anchor when "href" is provided', () => {
    render(
      <Chip href='https://example.com' rel='noopener' target='_blank'>
        Anchor Chip
      </Chip>
    );
    const chip = screen.getByTestId('chip');

    expect(chip.tagName).toBe('A');
    expect(chip).toHaveAttribute('href', 'https://example.com');
    expect(chip).toHaveAttribute('target', '_blank');
  });

  it('applies default classes and props', () => {
    render(<Chip>Styled Chip</Chip>);
    const chip = screen.getByTestId('chip');

    expect(chip).toHaveClass(
      'chip chip--radius-full chip--size-md chip--theme-default chip--variant-solid'
    );
  });

  it('applies custom classes and styles', () => {
    render(
      <Chip className='custom-class' style={{ color: 'red' }}>
        Custom Styled Chip
      </Chip>
    );
    const chip = screen.getByTestId('chip');

    expect(chip).toHaveClass('custom-class');
    expect(chip).toHaveStyle({ color: 'red' });
  });

  it('handles "startContent" and "endContent"', () => {
    render(
      <Chip endContent={<span>End</span>} startContent={<span>Start</span>}>
        Content Chip
      </Chip>
    );
    const chip = screen.getByTestId('chip');

    expect(chip).toHaveTextContent('StartContent ChipEnd');
  });

  it('handles "isDisabled" prop', () => {
    render(
      <Chip isDisabled onClick={() => {}}>
        Disabled Chip
      </Chip>
    );
    const chip = screen.getByTestId('chip');

    expect(chip).toHaveClass('chip--disabled');
    expect(chip).toHaveAttribute('aria-disabled', 'true');
  });

  it('changes radius, size, theme, and variant based on props', () => {
    render(
      <Chip radius='lg' size='lg' theme='primary' variant='flat'>
        Custom Chip
      </Chip>
    );
    const chip = screen.getByTestId('chip');

    expect(chip).toHaveClass(
      'chip--radius-lg chip--size-lg chip--theme-primary chip--variant-flat'
    );
  });
});
