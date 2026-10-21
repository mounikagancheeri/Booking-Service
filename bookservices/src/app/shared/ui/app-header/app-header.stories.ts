import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';

import { AppHeader } from './app-header';

const meta: Meta<AppHeader> = {
  title: 'UI/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    location: 'Hyderabad • Banjara Hills',
    userName: 'Priya Reddy',
    unreadCount: 0,
    changeLocation: fn(),
    openNotifications: fn(),
  },
};

export default meta;
type Story = StoryObj<AppHeader>;

export const Default: Story = {};

export const WithNotifications: Story = {
  args: { unreadCount: 3 },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Notifications, 3 unread' }));
    await expect(args.openNotifications).toHaveBeenCalledOnce();
  },
};

export const LongLocation: Story = {
  args: { location: 'Secunderabad • Sainikpuri, Defence Colony Extension Phase II' },
};
