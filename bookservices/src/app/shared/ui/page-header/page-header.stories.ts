import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';

import { PageHeader } from './page-header';

const meta: Meta<PageHeader> = {
  title: 'UI/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { heading: 'Booking Flow', userName: 'Priya Reddy', back: fn() },
};

export default meta;
type Story = StoryObj<PageHeader>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Go back' }));
    await expect(args.back).toHaveBeenCalledOnce();
  },
};

export const WithoutUser: Story = { args: { userName: undefined } };

export const LongTitle: Story = {
  args: { heading: 'Reschedule appointment with Venkata Subramanyam Lakshminarayana' },
};
