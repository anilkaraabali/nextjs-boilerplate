/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Portal } from '../Portal';

describe('Portal', () => {
  afterEach(() => {
    const portals = document.querySelectorAll('[data-react-portal]');

    portals.forEach((portal) => portal.remove());
  });

  it('renders children into a dynamically created root element', () => {
    render(
      <Portal>
        <div data-testid='portal-content'>Portal Content</div>
      </Portal>
    );

    const portalContent = screen.getByTestId('portal-content');

    expect(portalContent).toBeInTheDocument();

    const portalElement = document.querySelector('[data-react-portal]');

    expect(portalElement).toBeInTheDocument();
    expect(portalElement?.id).toBe('portal-root');
  });

  it('creates a root element with the specified ID', () => {
    const customRootId = 'custom-portal-root';

    render(
      <Portal rootId={customRootId}>
        <div data-testid='portal-content'>Custom Root Portal</div>
      </Portal>
    );

    const portalElement = document.querySelector('[data-react-portal]');

    expect(portalElement).toBeInTheDocument();
    expect(portalElement?.id).toBe(customRootId);
  });

  it('removes the portal root element from the DOM when unmounted', () => {
    const { unmount } = render(
      <Portal>
        <div>Temporary Portal</div>
      </Portal>
    );

    const portalElement = document.querySelector('[data-react-portal]');

    expect(portalElement).toBeInTheDocument();

    // Unmount the component
    unmount();

    expect(document.querySelector('[data-react-portal]')).toBeNull();
  });

  it('does not render children if not mounted', () => {
    const { container } = render(
      <Portal>
        <div>Unseen Content</div>
      </Portal>
    );

    expect(container).toBeEmptyDOMElement();
  });
});
