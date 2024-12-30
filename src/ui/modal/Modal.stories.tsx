import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { Button } from '../button';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  argTypes: {
    documentBodyClassName: {
      control: false,
    },
    isOpen: {
      control: false,
    },
    size: {
      control: { type: 'radio' },
      options: [
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        'full',
        'lg',
        'md',
        'sm',
        'xl',
        'xs',
      ],
    },
  },
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    children: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
          hendrerit risus, sed porttitor quam.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
          hendrerit risus, sed porttitor quam.
        </p>
        <p>
          Magna exercitation reprehenderit magna aute tempor cupidatat consequat
          elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum
          quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do
          dolor eiusmod. Et mollit incididunt nisi consectetur esse laborum
          eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad
          veniam.
        </p>
      </>
    ),
    primaryAction: {
      children: 'Action',
    },
    secondaryAction: {
      children: 'Close',
    },
    size: 'md',
    title: 'Title',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)} theme='secondary'>
          Open modal
        </Button>
        {isOpen && (
          <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        )}
      </>
    );
  },
} satisfies Story;
