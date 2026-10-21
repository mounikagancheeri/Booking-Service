import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';

import { BookingSummaryBar } from './booking-summary-bar';

const meta: Meta<BookingSummaryBar> = {
  title: 'Booking/BookingSummaryBar',
  component: BookingSummaryBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    summary: 'Friday, 9 Oct at 04:00 PM',
    serviceLabel: 'AC General Service',
    price: 999,
    held: true,
    disabled: false,
    loading: false,
    proceed: fn(),
  },
};

export default meta;
type Story = StoryObj<BookingSummaryBar>;

export const SlotSelected: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /Continue to Booking Details/ }));
    await expect(args.proceed).toHaveBeenCalledOnce();
  },
};

export const NothingSelected: Story = {
  args: { summary: null, held: false, disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button')).toBeDisabled();
  },
};

export const PackageSummary: Story = {
  args: {
    summary: 'AC General Service',
    icon: 'shopping_bag',
    serviceLabel: 'Estimated total',
    held: false,
    actionLabel: 'Continue to Date & Time',
  },
};

export const Loading: Story = { args: { loading: true } };
