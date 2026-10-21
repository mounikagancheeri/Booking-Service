import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';

import { SlotPeriod } from '../../booking.models';
import { SlotGroup } from './slot-group';

const afternoon: SlotPeriod = {
  id: 'afternoon',
  label: 'Afternoon',
  icon: 'light_mode',
  range: '12 PM - 5 PM',
  slots: [
    { id: 'd1T13:00', time: '01:00 PM', status: 'available' },
    { id: 'd1T14:30', time: '02:30 PM', status: 'available' },
    { id: 'd1T16:00', time: '04:00 PM', status: 'available' },
  ],
};

const evening: SlotPeriod = {
  id: 'evening',
  label: 'Evening',
  icon: 'bedtime',
  range: '5 PM - 8 PM',
  slots: [
    { id: 'd1T17:30', time: '05:30 PM', status: 'available' },
    { id: 'd1T19:00', time: '07:00 PM', status: 'available' },
    { id: 'd1T20:00', time: '08:00 PM', status: 'booked' },
  ],
};

const meta: Meta<SlotGroup> = {
  title: 'Booking/SlotGroup',
  component: SlotGroup,
  tags: ['autodocs'],
  args: { period: afternoon, name: 'slot', selectedId: null, selectedIdChange: fn() },
};

export default meta;
type Story = StoryObj<SlotGroup>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('radio', { name: /02:30 PM/ }));
    await expect(args.selectedIdChange).toHaveBeenCalledWith('d1T14:30');
  },
};

export const Selected: Story = { args: { selectedId: 'd1T16:00' } };

export const WithBookedSlot: Story = {
  args: { period: evening },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('radio', { name: /08:00 PM/ })).toBeDisabled();
  },
};

export const AllUnavailable: Story = {
  args: {
    period: {
      ...afternoon,
      slots: afternoon.slots.map((slot, i) => ({ ...slot, status: i ? 'booked' : 'past' })),
    },
  },
};
