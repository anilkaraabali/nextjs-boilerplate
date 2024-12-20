import { siteConfig } from '@/config';
import { render, screen } from '@testing-library/react';

import { Footer } from '../Footer';

describe('Footer', () => {
  it('renders the footer element with proper attributes', () => {
    render(<Footer />);
    const footer = screen.getByTestId('footer');

    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute('id', 'footer');
  });

  it('renders the Vercel logo with correct link', () => {
    render(<Footer />);
    const vercelLink = screen.getByLabelText('Vercel logo');

    expect(vercelLink).toBeInTheDocument();
    expect(vercelLink).toHaveAttribute('href', 'https://vercel.com');
    expect(screen.getByTestId('logo-vercel')).toBeInTheDocument();
  });

  it('renders all footer sections with correct titles', () => {
    render(<Footer />);
    siteConfig.footerItems.forEach((section) => {
      const sectionTitle = screen.getByText(section.title);

      expect(sectionTitle).toBeInTheDocument();
    });
  });

  it('renders all footer links with correct attributes', () => {
    render(<Footer />);

    siteConfig.footerItems.forEach((section) => {
      section.items.forEach((link) => {
        const linkElement = screen.getAllByText(link.title)[0];

        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', link.href);
      });
    });
  });

  it('applies correct styles to the footer elements', () => {
    render(<Footer />);
    const footer = screen.getByTestId('footer');

    expect(footer).toHaveClass('footer');

    const nav = screen.getByRole('navigation');

    expect(nav).toHaveClass('footer__nav');
  });
});
