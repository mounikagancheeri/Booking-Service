import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';

import { RAHUL, SURESH } from '../fixtures';
import { ProviderCard } from './provider-card';

const meta: Meta<ProviderCard> = {
  title: 'UI/ProviderCard',
  component: ProviderCard,
  tags: ['autodocs'],
  argTypes: { variant: { control: 'inline-radio', options: ['featured', 'compact'] } },
  args: {
    provider: SURESH,
    variant: 'compact',
    selected: false,
    disabled: false,
    loading: false,
    book: fn(),
    viewProfile: fn(),
  },
};

export default meta;
type Story = StoryObj<ProviderCard>;

export const Compact: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Reserve Suresh Kumar' }));
    await expect(args.book).toHaveBeenCalledWith('suresh-kumar');
  },
};

export const Featured: Story = {
  args: { provider: RAHUL, variant: 'featured' },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'View profile' }));
    await expect(args.viewProfile).toHaveBeenCalledWith('rahul-sharma');
  },
};

export const Selected: Story = { args: { provider: RAHUL, variant: 'featured', selected: true } };

export const Unavailable: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Reserve Suresh Kumar' })).toBeDisabled();
  },
};

export const Unverified: Story = {
  args: {
    variant: 'featured',
    provider: { ...RAHUL, verified: false, avatarUrl: undefined, reviewCount: 0 },
  },
};

export const LongName: Story = {
  args: {
    provider: {
      ...SURESH,
      name: 'Venkata Subramanyam Lakshminarayana',
      title: 'Certified Master Electrician & Solar Installer',
    },
  },
};

export const LoadingCompact: Story = { args: { loading: true } };

export const LoadingFeatured: Story = { args: { loading: true, variant: 'featured' } };
