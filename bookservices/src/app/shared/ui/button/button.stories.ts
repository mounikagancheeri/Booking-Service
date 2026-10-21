import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';

import { Button } from './button';

type ButtonArgs = Button & { text: string; pressed: () => void };

const meta: Meta<ButtonArgs> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'accent', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    iconPosition: { control: 'inline-radio', options: ['start', 'end'] },
  },
  args: {
    text: 'Book Service',
    variant: 'primary',
    size: 'md',
    iconPosition: 'start',
    loading: false,
    disabled: false,
    fullWidth: false,
    pressed: fn(),
  },
  render: (args) => ({
    props: args,
    template: `<button appButton type="button" [variant]="variant" [size]="size" [icon]="icon"
      [iconPosition]="iconPosition" [loading]="loading" [disabled]="disabled"
      [fullWidth]="fullWidth" (click)="pressed()">{{ text }}</button>`,
  }),
};

export default meta;
type Story = StoryObj<ButtonArgs>;

export const Primary: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Book Service' }));
    await expect(args.pressed).toHaveBeenCalledOnce();
  },
};

export const Secondary: Story = { args: { variant: 'secondary', text: 'View profile' } };

export const Accent: Story = { args: { variant: 'accent', text: 'Confirm Booking' } };

export const Ghost: Story = { args: { variant: 'ghost', text: 'Browse All (14)' } };

export const WithTrailingIcon: Story = {
  args: { icon: 'arrow_forward', iconPosition: 'end' },
};

export const Small: Story = { args: { variant: 'secondary', size: 'sm', text: 'Reserve' } };

export const Loading: Story = {
  args: { loading: true, text: 'Booking…' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button');
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-busy', 'true');
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button')).toBeDisabled();
  },
};

export const FullWidth: Story = { args: { fullWidth: true, variant: 'accent' } };
