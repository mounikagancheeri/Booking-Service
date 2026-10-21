import type { Meta, StoryObj } from '@storybook/angular-vite';

import { Badge } from './badge';

type BadgeArgs = Badge & { text: string };

const meta: Meta<BadgeArgs> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['neutral', 'primary', 'verified', 'accent'] },
  },
  args: { text: 'Instant Confirmation', variant: 'neutral' },
  render: (args) => ({
    props: args,
    template: `<app-badge [variant]="variant" [icon]="icon">{{ text }}</app-badge>`,
  }),
};

export default meta;
type Story = StoryObj<BadgeArgs>;

export const Neutral: Story = {};

export const Primary: Story = { args: { variant: 'primary', text: 'Pro' } };

export const Verified: Story = {
  args: { variant: 'verified', icon: 'verified_user', text: 'SkillConnect Shield Verified' },
};

export const Accent: Story = { args: { variant: 'accent', icon: 'bolt', text: 'Top Rated' } };
