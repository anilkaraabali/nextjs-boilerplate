import { fireEvent, render, screen } from '@testing-library/react';

import { EmptyState } from '../EmptyState';

describe('EmptyState', () => {
  it('renders with heading and description', () => {
    render(
      <EmptyState
        description='There seems to be no content at the moment.'
        heading='No Data Available'
      />
    );

    expect(
      screen.getByRole('heading', { name: /no data available/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/there seems to be no content at the moment/i)
    ).toBeInTheDocument();
  });

  it('renders with default image', () => {
    render(<EmptyState heading='No Data Available' />);
    const image = screen.getByAltText(/no content available/i);

    expect(image).toHaveAttribute('src', '/media/empty.svg');
  });

  it('renders with a custom image', () => {
    render(
      <EmptyState
        heading='No Data Available'
        imageUrl='/images/custom-empty.svg'
      />
    );
    const image = screen.getByAltText(/no content available/i);

    expect(image).toHaveAttribute('src', '/images/custom-empty.svg');
  });

  it('renders with a Link action', () => {
    render(
      <EmptyState
        action={{
          children: 'Go Home',
          href: '/home',
        }}
        heading='No Data Available'
      />
    );

    const link = screen.getByRole('link', { name: /go home/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/home');
  });

  it('renders with a Button action', () => {
    const mockOnClick = jest.fn();

    render(
      <EmptyState
        action={{
          children: 'Retry',
          onClick: mockOnClick,
        }}
        heading='No Data Available'
      />
    );

    const button = screen.getByRole('button', { name: /retry/i });

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
