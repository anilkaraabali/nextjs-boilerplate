import { useHideOnScrollingDown } from '@/hooks';
import { render, screen } from '@testing-library/react';
import { useInView } from 'react-intersection-observer';
import {
  mockAllIsIntersecting,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils';

import { ScrollShadow } from '../ScrollShadow';

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(() => ({ inView: true, ref: jest.fn() })),
}));

jest.mock('@/hooks', () => ({
  useHideOnScrollingDown: jest.fn(() => false),
}));

describe('ScrollShadow', () => {
  beforeEach(() => {
    setupIntersectionMocking(jest.fn);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the children correctly', () => {
    render(
      <ScrollShadow>
        <div data-testid='child'>Test Content</div>
      </ScrollShadow>
    );
    mockAllIsIntersecting(true);

    expect(screen.getByTestId('child')).toHaveTextContent('Test Content');
  });

  it('applies hidden class when out of view and scrolling down', () => {
    (useHideOnScrollingDown as jest.Mock).mockReturnValue(true);
    (useInView as jest.Mock).mockReturnValue({ inView: false, ref: jest.fn() });

    render(
      <ScrollShadow>
        <div>Hidden Content</div>
      </ScrollShadow>
    );

    expect(screen.getByTestId('scroll-shadow')).toHaveClass(
      'scroll-shadow--hidden'
    );
  });

  it('does not apply hidden class when in view', () => {
    (useHideOnScrollingDown as jest.Mock).mockReturnValue(false);
    (useInView as jest.Mock).mockReturnValue({ inView: true, ref: jest.fn() });

    render(
      <ScrollShadow>
        <div>Visible Content</div>
      </ScrollShadow>
    );

    expect(screen.getByTestId('scroll-shadow')).not.toHaveClass(
      'scroll-shadow--hidden'
    );
  });

  it('applies not-in-view class when out of view', () => {
    (useInView as jest.Mock).mockReturnValue({ inView: false, ref: jest.fn() });

    render(
      <ScrollShadow>
        <div>Not in View Content</div>
      </ScrollShadow>
    );

    expect(screen.getByTestId('scroll-shadow')).toHaveClass(
      'scroll-shadow--not-in-view'
    );
  });
});
