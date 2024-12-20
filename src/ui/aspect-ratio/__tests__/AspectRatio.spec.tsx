import { render, screen } from '@testing-library/react';

import { AspectRatio } from '../AspectRatio';

describe('AspectRatio', () => {
  it('renders children with the correct ratio', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <div data-testid='child'>Content</div>
      </AspectRatio>
    );

    const wrapper = screen.getByTestId('aspect-ratio');

    expect(wrapper).toHaveStyle('--ratio: 1.7777777777777777');
  });

  it('defaults to 1:1 ratio', () => {
    render(
      <AspectRatio>
        <div data-testid='child'>Content</div>
      </AspectRatio>
    );

    const wrapper = screen.getByTestId('aspect-ratio');

    expect(wrapper).toHaveStyle('--ratio: 1');
  });
});
