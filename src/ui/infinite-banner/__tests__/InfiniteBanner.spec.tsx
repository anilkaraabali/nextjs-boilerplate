import { render, screen } from '@testing-library/react';

import { InfiniteBanner } from '../InfiniteBanner';

describe('InfiniteBanner', () => {
  it('renders the banner with default props', () => {
    render(
      <InfiniteBanner>
        <div data-testid='child'>Test Content</div>
      </InfiniteBanner>
    );

    const banner = screen.getByTestId('infinite-banner');

    expect(banner).toBeInTheDocument();
    expect(banner).toHaveClass('infinite-banner');

    const children = screen.getAllByTestId('child');

    expect(children[0]).toHaveTextContent('Test Content');
  });

  it('repeats children the specified number of times', () => {
    render(
      <InfiniteBanner count={3}>
        <div data-testid='child'>Repeated Content</div>
      </InfiniteBanner>
    );

    const children = screen.getAllByTestId('child');

    expect(children).toHaveLength(4);

    children.forEach((child) => {
      expect(child).toHaveTextContent('Repeated Content');
    });
  });

  it('applies custom class names', () => {
    render(
      <InfiniteBanner
        carouselClassName='carousel-class'
        className='custom-class'
      >
        <div>Custom Classes</div>
      </InfiniteBanner>
    );

    const banner = screen.getByTestId('infinite-banner');

    expect(banner).toHaveClass('custom-class');

    // eslint-disable-next-line testing-library/no-node-access
    const carousel = banner.querySelector('.infinite-banner__carousel');

    expect(carousel).toHaveClass('carousel-class');
  });

  it('handles an empty children prop gracefully', () => {
    render(<InfiniteBanner count={3} />);

    const banner = screen.getByTestId('infinite-banner');

    expect(banner).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-node-access
    const carousel = banner.querySelector('.infinite-banner__carousel');

    expect(carousel).toBeEmptyDOMElement();
  });
});
