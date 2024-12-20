import type { Meta, StoryObj } from '@storybook/react';

import Image from 'next/image';

import { AspectRatio } from './AspectRatio';

const meta: Meta<typeof AspectRatio> = {
  component: AspectRatio,
  title: 'UI/Aspect Ratio',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    children: (
      <Image
        alt='Landscape photograph by Tobias Tullius'
        className='Image'
        height={902}
        src='https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80'
        width={600}
      />
    ),
    ratio: 4 / 3,
  },
} satisfies Story;
