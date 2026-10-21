import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';

import { CATEGORIES } from '../fixtures';
import { CategoryGrid } from './category-grid';

const meta: Meta<CategoryGrid> = {
  title: 'UI/CategoryGrid',
  component: CategoryGrid,
  tags: ['autodocs'],
  args: {
    categories: CATEGORIES,
    selectedId: null,
    loading: false,
    selectedIdChange: fn(),
  },
};

export default meta;
type Story = StoryObj<CategoryGrid>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const tile = canvas.getByRole('button', { name: /Electrician/ });
    await userEvent.click(tile);
    await expect(tile).toHaveAttribute('aria-pressed', 'true');
    await expect(args.selectedIdChange).toHaveBeenCalledWith('electrician');
  },
};

export const Selected: Story = { args: { selectedId: 'ac-repair' } };

export const WithDisabledCategory: Story = {
  args: {
    categories: CATEGORIES.map((c) => (c.id === 'tutors' ? { ...c, disabled: true } : c)),
  },
};

export const Loading: Story = {
  args: { loading: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('status', { name: 'Loading categories' })).toBeInTheDocument();
  },
};

export const Empty: Story = { args: { categories: [] } };
