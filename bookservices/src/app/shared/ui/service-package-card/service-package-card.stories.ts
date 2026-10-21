import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';

import { ServicePackageCard } from './service-package-card';

const meta: Meta<ServicePackageCard> = {
  title: 'UI/ServicePackageCard',
  component: ServicePackageCard,
  tags: ['autodocs'],
  args: {
    name: 'package',
    value: 'ac-general-service',
    heading: 'AC General Service',
    icon: 'mode_fan',
    duration: '60 mins',
    price: 999,
    savings: 250,
    popular: true,
    description:
      'Complete indoor/outdoor unit deep foam jet cleaning, dust removal, drain pipe unclogging, and gas pressure check.',
    perks: ['High-pressure jet wash', '30-day post-service warranty'],
    checked: false,
    disabled: false,
    picked: fn(),
  },
};

export default meta;
type Story = StoryObj<ServicePackageCard>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('radio', { name: /AC General Service/ }));
    await expect(args.picked).toHaveBeenCalledWith('ac-general-service');
  },
};

export const Selected: Story = { args: { checked: true } };

export const FromPrice: Story = {
  args: {
    value: 'ac-repair',
    heading: 'AC Repair',
    icon: 'build',
    duration: 'Custom',
    price: 799,
    priceFrom: true,
    savings: undefined,
    popular: false,
    perks: ['OEM approved spare parts'],
  },
};

export const Disabled: Story = {
  args: { disabled: true, popular: false },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('radio')).toBeDisabled();
  },
};

export const Minimal: Story = {
  args: { description: undefined, perks: [], savings: undefined, popular: false },
};
