import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';

import { FilterChip } from './filter-chip';

type ChipArgs = FilterChip & { text: string; pressed: () => void };

const meta: Meta<ChipArgs> = {
  title: 'UI/FilterChip',
  component: FilterChip,
  tags: ['autodocs'],
  args: { text: 'Verified Only', icon: 'verified', selected: false, toggle: true, pressed: fn() },
  render: (args) => ({
    props: args,
    template: `<button appFilterChip [selected]="selected" [toggle]="toggle" [icon]="icon"
      [trailingIcon]="trailingIcon" (click)="pressed()">{{ text }}</button>`,
  }),
};

export default meta;
type Story = StoryObj<ChipArgs>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const chip = canvas.getByRole('button', { name: /Verified Only/ });
    await expect(chip).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(chip);
    await expect(args.pressed).toHaveBeenCalledOnce();
  },
};

export const Selected: Story = { args: { text: 'Today', icon: 'check', selected: true } };

export const SortTrigger: Story = {
  args: { text: 'Sort: Recommended', icon: undefined, trailingIcon: 'expand_more', toggle: false },
};
