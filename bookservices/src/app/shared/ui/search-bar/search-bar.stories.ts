import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';

import { SearchBar } from './search-bar';

const meta: Meta<SearchBar> = {
  title: 'UI/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  args: {
    value: '',
    loading: false,
    disabled: false,
    filterCount: 0,
    search: fn(),
    openFilters: fn(),
  },
};

export default meta;
type Story = StoryObj<SearchBar>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'AC Repair' },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole('searchbox'), '{Enter}');
    await expect(args.search).toHaveBeenCalledWith('AC Repair');
  },
};

export const Typing: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('Search verified services'), 'Electrician{Enter}');
    await expect(args.search).toHaveBeenCalledWith('Electrician');
  },
};

export const ActiveFilters: Story = {
  args: { filterCount: 2 },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /Filters\s*\(2 active\)/ }));
    await expect(args.openFilters).toHaveBeenCalledOnce();
  },
};

export const Loading: Story = { args: { value: 'AC Repair', loading: true } };

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('searchbox')).toBeDisabled();
  },
};
