import { siteConfig } from '@/config/site';
import { render, screen } from '@testing-library/react';

import { Header } from '../Header';

describe('Header', () => {
  it('renders the header element with proper attributes', () => {
    render(<Header />);
    const header = screen.getByTestId('header');

    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute('id', 'header');
  });

  it('renders the Vercel logo with correct link', () => {
    render(<Header />);
    const vercelLink = screen.getByLabelText('Go to Vercel homepage');

    expect(vercelLink).toBeInTheDocument();
    expect(vercelLink).toHaveAttribute(
      'href',
      'https://vercel.com/home?utm_source=next-site&utm_medium=banner&utm_campaign=home'
    );
    expect(screen.getByTestId('logo-vercelmark')).toBeInTheDocument();
  });

  it('renders the Next logo with correct link', () => {
    render(<Header />);
    const nextLink = screen.getByLabelText('Go to the homepage');

    expect(nextLink).toBeInTheDocument();
    expect(nextLink).toHaveAttribute(
      'href',
      'https://vercel.com/home?utm_source=next-site&utm_medium=banner&utm_campaign=home'
    );
    expect(screen.getByTestId('logo-next')).toBeInTheDocument();
  });

  it('renders the divider SVG', () => {
    render(<Header />);
    const divider = screen.getByRole('img', { hidden: true });

    expect(divider).toBeInTheDocument();
  });

  it('renders all navigation items', () => {
    render(<Header />);
    siteConfig.navItems.forEach((item) => {
      const link = screen.getByText(item.title);

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', item.href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
