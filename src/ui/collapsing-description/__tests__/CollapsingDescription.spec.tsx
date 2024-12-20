import { fireEvent, render, screen } from '@testing-library/react';

import { CollapsingDescription } from '../CollapsingDescription';

jest.mock('../../sanitize-html', () => ({
  SanitizeHtmlAsync: ({ text }: { text: string }) => <div>{text}</div>,
}));

describe('CollapsingDescription', () => {
  const sampleText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan tortor.';

  beforeEach(() => {
    Object.defineProperty(HTMLDivElement.prototype, 'scrollHeight', {
      configurable: true,
      value: 100,
      writable: true,
    });
  });

  it('renders with default collapsed state', () => {
    render(<CollapsingDescription maxHeight={50} text={sampleText} />);

    const container = screen.getByTestId('collapsing-description');

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('collapsing-description');

    const content = screen.getByTestId('collapsing-description-content');

    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('collapsing-description__content--trim');
  });

  it('shows expand button if content exceeds maxHeight', () => {
    render(<CollapsingDescription maxHeight={50} text={sampleText} />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('collapsing-description__button');
  });

  it('hides expand button if content does not exceed maxHeight', () => {
    render(<CollapsingDescription maxHeight={500} text='Short text' />);

    const button = screen.queryByRole('button');

    expect(button).not.toBeInTheDocument();
  });

  it('expands and collapses content on button click', () => {
    render(<CollapsingDescription maxHeight={50} text={sampleText} />);

    const button = screen.getByRole('button');
    const content = screen.getByTestId('collapsing-description-content');

    expect(content).toHaveStyle('max-height: 50px');

    fireEvent.click(button);

    expect(content).toHaveStyle('max-height: 100px');

    fireEvent.click(button);

    expect(content).toHaveStyle('max-height: 50px');
  });

  it('applies custom className', () => {
    render(
      <CollapsingDescription
        className='custom-class'
        maxHeight={50}
        text={sampleText}
      />
    );

    const container = screen.getByTestId('collapsing-description');

    expect(container).toHaveClass('custom-class');
  });
});
