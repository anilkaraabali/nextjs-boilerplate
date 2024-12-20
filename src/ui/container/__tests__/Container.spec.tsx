import { render, screen } from '@testing-library/react';
import React from 'react';

import { Container } from '../Container';

describe('Container', () => {
  it('renders with default properties', () => {
    const { container } = render(<Container>Default Container</Container>);

    expect(container.firstChild).toHaveClass('container');
    expect(container.firstChild).not.toHaveClass('container--fluid');
    expect(container.firstChild).toHaveTextContent('Default Container');
  });

  it('renders as a custom HTML element', () => {
    const { container } = render(
      <Container as='section'>Custom Section</Container>
    );

    expect(container.firstChild).toBeInstanceOf(HTMLElement);
  });

  it('applies the "fluid" class when the fluid prop is true', () => {
    const { container } = render(<Container fluid>Fluid Container</Container>);

    expect(container.firstChild).toHaveClass('container--fluid');
  });

  it('passes additional props to the container', () => {
    const { container } = render(
      <Container data-test='test-data' id='test-id'>
        With Props
      </Container>
    );

    expect(container.firstChild).toHaveAttribute('id', 'test-id');
    expect(container.firstChild).toHaveAttribute('data-test', 'test-data');
  });

  it('merges additional class names with default class', () => {
    const { container } = render(
      <Container className='extra-class'>With Extra Class</Container>
    );

    expect(container.firstChild).toHaveClass('container');
    expect(container.firstChild).toHaveClass('extra-class');
  });

  it('renders children correctly', () => {
    render(
      <Container>
        <span>Child Element</span>
      </Container>
    );

    expect(screen.getByText('Child Element')).toBeInTheDocument();
  });
});
