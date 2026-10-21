import type { Meta, StoryObj } from '@storybook/angular-vite';

import { Callout } from './callout';

type CalloutArgs = Callout & { text: string };

const meta: Meta<CalloutArgs> = {
  title: 'UI/Callout',
  component: Callout,
  tags: ['autodocs'],
  argTypes: { variant: { control: 'inline-radio', options: ['info', 'warning'] } },
  render: (args) => ({
    props: args,
    template: `<app-callout [variant]="variant" [icon]="icon" [heading]="heading">{{ text }}</app-callout>`,
  }),
};

export default meta;
type Story = StoryObj<CalloutArgs>;

export const Info: Story = {
  args: {
    variant: 'info',
    icon: 'verified_user',
    heading: '30-Day Workmanship Warranty',
    text: "Payment remains held in Escrow until you inspect and approve Rahul's completed service. Free re-service guarantee.",
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    icon: 'bolt',
    heading: 'High demand today',
    text: 'Only 2 arrival windows remaining for Rahul Sharma',
  },
};
