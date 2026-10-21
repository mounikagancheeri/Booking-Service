import type { Meta, StoryObj } from '@storybook/angular-vite';

import { Rating } from './rating';

const meta: Meta<Rating> = {
  title: 'UI/Rating',
  component: Rating,
  tags: ['autodocs'],
  args: { value: 4.9, count: 124, compact: false },
};

export default meta;
type Story = StoryObj<Rating>;

export const Default: Story = {};

export const Compact: Story = { args: { value: 4.8, count: 98, compact: true } };

export const ValueOnly: Story = { args: { value: 4.94, count: 124, showCount: false } };

export const NoReviews: Story = { args: { value: 0, count: 0 } };
