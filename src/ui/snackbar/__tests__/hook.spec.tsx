import { render, screen } from '@testing-library/react';

import { useSnackbar } from '../hook';
import { useSnackbarStore } from '../SnackbarStore';

jest.mock('../SnackbarStore', () => ({
  useSnackbarStore: jest.fn(),
}));

describe('useSnackbar', () => {
  it('should return alert, hide, and isVisible from the store', () => {
    const mockAlert = 'Test Alert';
    const mockHide = jest.fn();
    const mockIsVisible = true;

    (
      useSnackbarStore as jest.MockedFunction<typeof useSnackbarStore>
    ).mockReturnValue({
      alert: mockAlert,
      hide: mockHide,
      isVisible: mockIsVisible,
    });

    const TestComponent = () => {
      const { hide, isVisible } = useSnackbar();

      return (
        <>
          <div>{isVisible ? 'Visible' : 'Hidden'}</div>
          <button onClick={hide}>Hide Snackbar</button>
        </>
      );
    };

    render(<TestComponent />);

    expect(screen.getByText('Visible')).toBeInTheDocument();

    screen.getByText('Hide Snackbar').click();

    expect(mockHide).toHaveBeenCalled();
  });
});
