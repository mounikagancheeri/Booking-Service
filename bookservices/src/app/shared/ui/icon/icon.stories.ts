import type { Meta, StoryObj } from '@storybook/angular-vite';

import { Icon } from './icon';

const meta: Meta<Icon> = {
  title: 'UI/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: { name: 'mode_fan', size: 24, filled: false },
};

export default meta;
type Story = StoryObj<Icon>;

export const Default: Story = {};

export const Filled: Story = { args: { name: 'verified', filled: true } };

export const Labelled: Story = {
  args: { name: 'verified', filled: true, label: 'Verified professional' },
};
