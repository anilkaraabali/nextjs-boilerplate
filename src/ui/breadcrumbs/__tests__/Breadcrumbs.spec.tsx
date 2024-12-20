import { render, screen } from '@testing-library/react';

import { Breadcrumbs } from '../Breadcrumbs';
import { BreadcrumbOptionType } from '../BreadcrumbsOption';

describe('Breadcrumbs', () => {
  it('renders correctly with given options', () => {
    const options: BreadcrumbOptionType[] = [
      { title: 'Home', url: '/' },
      { title: 'Category', url: '/category' },
      { title: 'Product', url: '/product' },
    ];

    render(<Breadcrumbs options={options} />);

    const navElement = screen.getByRole('navigation', { name: /breadcrumbs/i });

    expect(navElement).toBeInTheDocument();

    const breadcrumbItems = screen.getAllByTestId('breadcrumb-option');

    expect(breadcrumbItems).toHaveLength(options.length);

    options.forEach((option, index) => {
      expect(breadcrumbItems[index]).toHaveTextContent(option.title);
    });
  });

  it('passes isLastOption correctly to BreadcrumbsOption', () => {
    const options: BreadcrumbOptionType[] = [
      { title: 'Home', url: '/' },
      { title: 'Category', url: '/category' },
      { title: 'Product', url: '/product' },
    ];

    render(<Breadcrumbs options={options} />);

    const breadcrumbItems = screen.getAllByTestId('breadcrumb-option');

    expect(breadcrumbItems[breadcrumbItems.length - 1]).toHaveTextContent(
      'Product'
    );
  });

  it('handles empty options gracefully', () => {
    render(<Breadcrumbs options={[]} />);

    const breadcrumbList = screen.getByRole('list');

    // eslint-disable-next-line testing-library/no-node-access
    expect(breadcrumbList.childElementCount).toBe(0);
  });

  it('applies additional props to the nav element', () => {
    render(
      <Breadcrumbs
        className='test-class'
        data-testid='breadcrumbs'
        options={[{ title: 'Home', url: '/' }]}
      />
    );

    const navElement = screen.getByTestId('breadcrumbs');

    expect(navElement).toHaveClass('test-class');
  });
});
