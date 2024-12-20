import { fireEvent, render, screen } from '@testing-library/react';

import { Snackbar } from '../Snackbar';
import { useSnackbarStore } from '../SnackbarStore';

jest.mock('../SnackbarStore', () => ({
  useSnackbarStore: jest.fn(),
}));

describe('Snackbar', () => {
  it('renders the message when visible', () => {
    (
      useSnackbarStore as jest.MockedFunction<typeof useSnackbarStore>
    ).mockReturnValue({
      isVisible: true,
      message: 'Test Message',
      primaryAction: null,
      secondaryAction: null,
    });

    render(<Snackbar />);

    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('does not render when not visible', () => {
    (
      useSnackbarStore as jest.MockedFunction<typeof useSnackbarStore>
    ).mockReturnValue({
      isVisible: false,
      message: 'Test Message',
      primaryAction: null,
      secondaryAction: null,
    });

    render(<Snackbar />);

    expect(screen.queryByText('Test Message')).not.toBeInTheDocument();
  });

  it('renders primary action and triggers click', () => {
    const mockAction = {
      children: 'Click me',
      onClick: jest.fn(),
    };

    (
      useSnackbarStore as jest.MockedFunction<typeof useSnackbarStore>
    ).mockReturnValue({
      hide: jest.fn(),
      isVisible: true,
      message: 'Test Message',
      primaryAction: mockAction,
      secondaryAction: null,
    });

    render(<Snackbar />);

    const primaryActionButton = screen.getByTestId('snackbar-action');

    expect(primaryActionButton).toBeInTheDocument();

    fireEvent.click(primaryActionButton);

    expect(mockAction.onClick).toHaveBeenCalledTimes(1);
  });

  it('renders secondary action and triggers click', () => {
    const mockSecondaryAction = {
      children: 'Secondary Click',
      onClick: jest.fn(),
    };

    (
      useSnackbarStore as jest.MockedFunction<typeof useSnackbarStore>
    ).mockReturnValue({
      hide: jest.fn(),
      isVisible: true,
      message: 'Test Message',
      primaryAction: null,
      secondaryAction: mockSecondaryAction,
    });

    render(<Snackbar />);

    const secondaryActionButton = screen.getByTestId('snackbar-action');

    expect(secondaryActionButton).toBeInTheDocument();

    fireEvent.click(secondaryActionButton);

    expect(mockSecondaryAction.onClick).toHaveBeenCalledTimes(1);
  });
});
