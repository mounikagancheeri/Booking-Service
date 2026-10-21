import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';

import { APPOINTMENT_TYPES } from '../../data/booking.mock';
import { AppointmentTypePicker } from './appointment-type-picker';

const meta: Meta<AppointmentTypePicker> = {
  title: 'Booking/AppointmentTypePicker',
  component: AppointmentTypePicker,
  tags: ['autodocs'],
  args: { types: APPOINTMENT_TYPES, selectedId: null, selectedIdChange: fn() },
};

export default meta;
type Story = StoryObj<AppointmentTypePicker>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('radio', { name: /AC Inspection/ }));
    await expect(canvas.getByRole('radio', { name: /AC Inspection/ })).toBeChecked();
    await expect(args.selectedIdChange).toHaveBeenCalledWith('ac-inspection');
  },
};

export const Selected: Story = { args: { selectedId: 'ac-general-service' } };

export const KeyboardNavigation: Story = {
  args: { selectedId: 'ac-inspection' },
  play: async ({ args, canvas, userEvent }) => {
    canvas.getByRole('radio', { name: /AC Inspection/ }).focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(args.selectedIdChange).toHaveBeenCalledWith('ac-general-service');
  },
};

export const Empty: Story = { args: { types: [] } };
