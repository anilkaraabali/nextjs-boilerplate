import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Modal } from '../Modal';

describe('Modal Component', () => {
  it('renders the modal when open', () => {
    render(
      <Modal
        isOpen={true}
        onClose={jest.fn()}
        onOverlayClick={jest.fn()}
        title='Test Modal'
      >
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render the modal when closed', () => {
    render(
      <Modal
        isOpen={false}
        onClose={jest.fn()}
        onOverlayClick={jest.fn()}
        title='Test Modal'
      >
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls onOverlayClick when backdrop is clicked', () => {
    const onOverlayClickMock = jest.fn();

    render(
      <Modal
        isOpen={true}
        onClose={jest.fn()}
        onOverlayClick={onOverlayClickMock}
        title='Test Modal'
      >
        <p>Modal Content</p>
      </Modal>
    );

    const backdrop = screen.getByTestId('modal/overlay');

    fireEvent.click(backdrop);

    expect(onOverlayClickMock).toHaveBeenCalled();
  });

  it('closes the modal when backdrop is clicked and isDismissable is true', () => {
    const setOpenMock = jest.fn();

    render(
      <Modal
        isDismissable={true}
        isOpen={true}
        onClose={setOpenMock}
        title='Test Modal'
      >
        <p>Modal Content</p>
      </Modal>
    );

    const backdrop = screen.getByTestId('modal/overlay');

    fireEvent.click(backdrop);

    expect(setOpenMock).toHaveBeenCalled();
  });

  it('does not close the modal when isDismissable is false', () => {
    const setOpenMock = jest.fn();

    render(
      <Modal
        isDismissable={false}
        isOpen={true}
        onClose={setOpenMock}
        title='Test Modal'
      >
        <p>Modal Content</p>
      </Modal>
    );

    const backdrop = screen.getByTestId('modal/overlay');

    fireEvent.click(backdrop);

    expect(setOpenMock).not.toHaveBeenCalled();
  });

  it('calls onCloseButtonClick when close button is clicked', () => {
    const onCloseButtonClickMock = jest.fn();

    render(
      <Modal
        isOpen={true}
        onClose={jest.fn()}
        onCloseButtonClick={onCloseButtonClickMock}
        title='Test Modal'
      >
        <p>Modal Content</p>
      </Modal>
    );

    const closeButton = screen.getByTestId('modal/close-button');

    fireEvent.click(closeButton);

    expect(onCloseButtonClickMock).toHaveBeenCalled();
  });
});
