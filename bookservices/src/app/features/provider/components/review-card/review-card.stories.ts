import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';

import { RAHUL } from '../../../../shared/ui/fixtures';
import { ReviewCard } from './review-card';

const review = RAHUL.reviews![0];

const meta: Meta<ReviewCard> = {
  title: 'Provider/ReviewCard',
  component: ReviewCard,
  tags: ['autodocs'],
  args: { review },
};

export default meta;
type Story = StoryObj<ReviewCard>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: 'Rated 5 out of 5' })).toBeInTheDocument();
  },
};

export const ThreeStars: Story = {
  args: { review: { ...review, rating: 3, text: 'Good work, arrived a little late.' } },
};

export const LongText: Story = {
  args: { review: { ...review, text: review.text.repeat(3) } },
};
