import { componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';

import { CategoryTile } from './category-tile';

const meta: Meta<CategoryTile> = {
  title: 'UI/CategoryTile',
  component: CategoryTile,
  tags: ['autodocs'],
  decorators: [componentWrapperDecorator((story) => `<div style="width: 120px">${story}</div>`)],
  args: {
    icon: 'offline_bolt',
    label: 'Electrician',
    caption: '24 Pros',
    selected: false,
    disabled: false,
    loading: false,
    picked: fn(),
  },
};

export default meta;
type Story = StoryObj<CategoryTile>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /Electrician/ }));
    await expect(args.picked).toHaveBeenCalledOnce();
  },
};

export const Selected: Story = {
  args: { icon: 'mode_fan', label: 'AC Repair', selected: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  },
};

export const Disabled: Story = {
  args: { icon: 'school', label: 'Tutors', disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button')).toBeDisabled();
  },
};

export const Loading: Story = { args: { loading: true } };
