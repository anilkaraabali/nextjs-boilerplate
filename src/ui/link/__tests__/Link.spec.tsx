import { render, screen } from '@testing-library/react';

import { Link } from '../Link';

describe('Link', () => {
  it('renders with the correct text content', () => {
    render(<Link>Click me</Link>);
    const link = screen.getByTestId('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('Click me');
  });

  it('renders as a block element when isBlock is true', () => {
    render(<Link isBlock>Block Link</Link>);
    const link = screen.getByTestId('link');

    expect(link).toHaveClass('link--block');
  });

  it('adds rel="noopener noreferrer" and target="_blank" for external links', () => {
    render(
      <Link href='https://example.com' isExternal>
        External Link
      </Link>
    );
    const link = screen.getByTestId('link');

    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('adds aria-label for external links', () => {
    render(
      <Link aria-label='Go to Example' href='https://example.com' isExternal>
        External Link
      </Link>
    );
    const link = screen.getByTestId('link');

    expect(link).toHaveAttribute('aria-label', 'Go to Example');
  });
});
