import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';

import { MANOJ, RAHUL, VIKRAM } from '../../../../shared/ui/fixtures';
import { SpecialistCard } from './specialist-card';

const meta: Meta<SpecialistCard> = {
  title: 'Discovery/SpecialistCard',
  component: SpecialistCard,
  tags: ['autodocs'],
  args: {
    provider: RAHUL,
    selected: true,
    fastest: true,
    pick: fn(),
    viewProfile: fn(),
    book: fn(),
  },
};

export default meta;
type Story = StoryObj<SpecialistCard>;

export const Selected: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /Book Now/ }));
    await expect(args.book).toHaveBeenCalledWith('rahul-sharma');
  },
};

export const Default: Story = {
  args: { provider: VIKRAM, selected: false, fastest: false },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /Select Specialist/ }));
    await expect(args.pick).toHaveBeenCalledWith('vikram-reddy');
  },
};

export const WithoutBio: Story = {
  args: { provider: { ...MANOJ, bio: undefined, nextSlot: undefined }, selected: false },
};

export const InitialsFallback: Story = {
  args: { provider: { ...VIKRAM, avatarUrl: undefined }, selected: true, fastest: false },
};
