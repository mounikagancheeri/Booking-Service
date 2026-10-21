import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';

import { buildBookingDays } from '../../data/booking.mock';
import { DateStrip } from './date-strip';

const days = buildBookingDays(new Date(), 7);

const meta: Meta<DateStrip> = {
  title: 'Booking/DateStrip',
  component: DateStrip,
  tags: ['autodocs'],
  args: { days, selected: days[0].iso, expanded: false, selectedChange: fn() },
};

export default meta;
type Story = StoryObj<DateStrip>;

export const TodaySelected: Story = {};

export const OtherDaySelected: Story = {
  args: { selected: days[2].iso },
  play: async ({ args, canvas, userEvent }) => {
    const radios = canvas.getAllByRole('radio');
    await userEvent.click(radios[3]);
    await expect(radios[3]).toBeChecked();
    await expect(args.selectedChange).toHaveBeenCalledWith(days[3].iso);
  },
};

export const NothingSelected: Story = { args: { selected: null } };

export const Expanded: Story = { args: { days: buildBookingDays(new Date(), 14), expanded: true } };

export const Empty: Story = { args: { days: [], selected: null } };
