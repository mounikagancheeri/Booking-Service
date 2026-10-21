import { provideRouter, withHashLocation } from '@angular/router';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';

import { NAV_ITEMS } from '../fixtures';
import { BottomNav } from './bottom-nav';

const meta: Meta<BottomNav> = {
  title: 'UI/BottomNav',
  component: BottomNav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    applicationConfig({
      // Hash location keeps navigation inside the Storybook iframe.
      providers: [provideRouter([{ path: '**', children: [] }], withHashLocation())],
    }),
  ],
  args: { items: NAV_ITEMS, activeId: 'home', activeIdChange: fn() },
};

export default meta;
type Story = StoryObj<BottomNav>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const bookings = canvas.getByRole('link', { name: /Bookings/ });
    await userEvent.click(bookings);
    await expect(bookings).toHaveAttribute('aria-current', 'page');
    await expect(args.activeIdChange).toHaveBeenCalledWith('bookings');
  },
};

export const BookingsActive: Story = { args: { activeId: 'bookings' } };
