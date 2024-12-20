import type { Meta, StoryObj } from '@storybook/react';

import { CollapsingDescription } from './CollapsingDescription';

const meta: Meta<typeof CollapsingDescription> = {
  component: CollapsingDescription,
  title: 'UI/Collapsing Description',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    text: '<p style="margin-bottom: 16px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor, elit viverra varius blandit, nunc metus dictum diam, ac aliquet magna ex sit amet turpis. Nam tellus orci, maximus nec molestie ac, pretium ac neque. Ut fermentum consequat urna, eget sodales lorem cursus et. Suspendisse vitae enim vitae est dignissim dapibus. Suspendisse ac euismod velit. Fusce tortor nulla, tristique et nunc at, malesuada feugiat lorem. Sed eu tristique lorem, eget semper lectus. Vestibulum feugiat magna ut erat malesuada euismod. Vivamus diam tellus, tincidunt eget sem et, maximus sollicitudin felis. Curabitur sed leo eros. Praesent blandit quis ipsum quis gravida. Nullam quis eleifend ipsum. Phasellus pellentesque vulputate est quis ultrices. Donec iaculis enim vel arcu rhoncus, ac dignissim sem rhoncus.</p><p style="margin-bottom: 16px;">Sed feugiat, ante porttitor eleifend interdum, lectus quam fringilla nibh, sed ornare nibh odio nec justo. Fusce ac suscipit libero. Fusce odio ex, sagittis vel fermentum quis, sollicitudin quis nulla. Aenean quis rhoncus velit. Phasellus elit lorem, accumsan tempus euismod tincidunt, suscipit id erat. Fusce sagittis auctor quam, non ultrices elit ultricies non. Nullam vulputate nisi non ornare tincidunt. Fusce consectetur iaculis sollicitudin. Nullam fermentum vehicula finibus. Phasellus condimentum eros nulla, in pulvinar tortor facilisis eget. Morbi venenatis rutrum ante pellentesque tristique.</p><p>Quisque eget efficitur lectus. Etiam faucibus ultricies justo, sit amet feugiat arcu aliquet non. Nam tristique quis eros sed sollicitudin. Ut eu velit cursus, congue nunc sed, facilisis ante. Mauris imperdiet tellus non dolor suscipit, ac euismod dui interdum. Nunc ac risus sed sapien aliquam tristique ac non neque. Ut consequat nunc a erat fringilla, vitae interdum dui congue. Cras tincidunt mi nunc, eget tincidunt felis porttitor non. Integer eu tempor ante, sed rhoncus urna. Mauris gravida quis mi a consectetur. Proin varius porta arcu, in dignissim odio. Fusce erat nulla, varius pellentesque lorem vel, eleifend efficitur nibh. Phasellus fermentum tempor lacus, viverra condimentum felis cursus eget. Sed mauris ipsum, ultrices non mauris at, lacinia iaculis augue.</p>',
  },
} satisfies Story;
