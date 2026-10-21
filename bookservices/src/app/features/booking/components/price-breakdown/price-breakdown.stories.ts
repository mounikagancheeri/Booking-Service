import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';

import { PriceBreakdown } from './price-breakdown';

const meta: Meta<PriceBreakdown> = {
  title: 'Booking/PriceBreakdown',
  component: PriceBreakdown,
  tags: ['autodocs'],
  args: {
    lines: [
      { label: 'AC General Service', amount: 999 },
      { label: 'Platform & Booking Fee', amount: 49, waived: true, note: 'Free' },
      { label: 'Taxes & Surcharges', note: 'Included' },
    ],
    total: 999,
    totalNote: 'Upon job satisfaction',
  },
};

export default meta;
type Story = StoryObj<PriceBreakdown>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Total payable')).toBeInTheDocument();
  },
};

export const SingleLine: Story = {
  args: { lines: [{ label: 'AC Inspection', amount: 499 }], total: 499, totalNote: undefined },
};
