import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Alert } from '../Alert';

describe('Alert Component', () => {
  it('renders the correct text and status', () => {
    render(
      <Alert
        onCloseButtonClick={jest.fn()}
        status='success'
        text='This is a success alert'
      />
    );

    const alertElement = screen.getByTestId('alert');

    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveClass('alert--success');
    expect(screen.getByText('This is a success alert')).toBeInTheDocument();
    expect(screen.getByTestId('alert-close-button')).toBeInTheDocument();
  });

  it('calls onCloseButtonClick when close button is clicked', () => {
    const mockOnClose = jest.fn();

    render(
      <Alert
        onCloseButtonClick={mockOnClose}
        status='warning'
        text='This is a warning alert'
      />
    );

    const closeButton = screen.getByTestId('alert-close-button');

    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('hides the icon when hideIcon is true', () => {
    render(
      <Alert
        hideIcon
        onCloseButtonClick={jest.fn()}
        status='danger'
        text='This is a danger alert'
      />
    );

    const iconElement = screen.queryByTestId('alert-icon');

    expect(iconElement).not.toBeInTheDocument();
  });
});
