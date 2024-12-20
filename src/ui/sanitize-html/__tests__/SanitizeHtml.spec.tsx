import { render, screen } from '@testing-library/react';
import React from 'react';

import { SanitizeHtml } from '../SanitizeHtml';

describe('SanitizeHtml', () => {
  it('renders sanitized HTML content', () => {
    const html = '<strong>Safe</strong> <script>alert("Unsafe")</script>';

    render(<SanitizeHtml text={html} />);

    const container = screen.getByText('Safe');

    expect(container).toBeInTheDocument();
    expect(screen.queryByText(/alert\("Unsafe"\)/)).not.toBeInTheDocument();
  });

  it('allows additional tags specified in `allowedTags`', () => {
    const html = '<custom-tag>Custom Content</custom-tag>';

    render(<SanitizeHtml allowedTags={['custom-tag']} text={html} />);

    const customTag = screen.getByText('Custom Content');

    expect(customTag).toBeInTheDocument();
    expect(customTag.tagName).toBe('CUSTOM-TAG');
  });

  it('allows additional attributes specified in `allowedAttributes`', () => {
    const html = '<a href="https://example.com" target="_blank">Link</a>';

    render(
      <SanitizeHtml allowedAttributes={{ a: ['href', 'target'] }} text={html} />
    );

    const link = screen.getByText('Link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('uses the specified `as` prop for the wrapper element', () => {
    const html = '<p>Some Content</p>';

    render(<SanitizeHtml as='section' text={html} />);

    const container = screen.getByText('Some Content');

    expect(container.tagName).toBe('P');
  });

  it('sanitizes content to prevent unsafe tags and attributes', () => {
    const html = '<img src="javascript:alert(1)">Unsafe</img>';

    render(<SanitizeHtml text={html} />);

    const unsafeTag = screen.getByText('Unsafe');

    expect(unsafeTag).toBeInTheDocument();

    const imgTag = screen.queryByRole('img');

    expect(imgTag).not.toBeInTheDocument();
  });
});
