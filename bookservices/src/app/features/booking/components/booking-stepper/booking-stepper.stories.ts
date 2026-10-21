import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';

import { BOOKING_STEPS } from '../../data/booking.mock';
import { BookingStepper } from './booking-stepper';

const meta: Meta<BookingStepper> = {
  title: 'Booking/BookingStepper',
  component: BookingStepper,
  tags: ['autodocs'],
  args: { steps: BOOKING_STEPS, current: 1 },
};

export default meta;
type Story = StoryObj<BookingStepper>;

export const DateAndTime: Story = {
  play: async ({ canvas }) => {
    const items = canvas.getAllByRole('listitem');
    await expect(items[1]).toHaveAttribute('aria-current', 'step');
  },
};

export const FirstStep: Story = { args: { current: 0 } };

export const LastStep: Story = { args: { current: 3 } };
