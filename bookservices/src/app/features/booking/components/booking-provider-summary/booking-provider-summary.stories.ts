import type { Meta, StoryObj } from '@storybook/angular-vite';

import { RAHUL } from '../../../../shared/ui/fixtures';
import { APPOINTMENT_TYPES } from '../../data/booking.mock';
import { BookingProviderSummary } from './booking-provider-summary';

const meta: Meta<BookingProviderSummary> = {
  title: 'Booking/BookingProviderSummary',
  component: BookingProviderSummary,
  tags: ['autodocs'],
  args: { provider: RAHUL, type: APPOINTMENT_TYPES[1] },
};

export default meta;
type Story = StoryObj<BookingProviderSummary>;

export const Default: Story = {};

export const Inspection: Story = { args: { type: APPOINTMENT_TYPES[0] } };

export const NoTypeSelected: Story = { args: { type: undefined } };

export const Unverified: Story = {
  args: { provider: { ...RAHUL, verified: false, avatarUrl: undefined } },
};
