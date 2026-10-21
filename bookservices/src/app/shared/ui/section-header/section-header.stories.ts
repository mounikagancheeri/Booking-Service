import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { fn } from 'storybook/test';

import { Badge } from '../badge/badge';
import { SectionHeader } from './section-header';

const meta: Meta<SectionHeader> = {
  title: 'UI/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Badge] })],
  args: { heading: 'Service Sectors', action: fn() },
};

export default meta;
type Story = StoryObj<SectionHeader>;

export const Default: Story = {};

export const WithAction: Story = { args: { actionLabel: 'Browse All (14)' } };

export const WithSubtitle: Story = {
  args: {
    heading: 'Spotlight Specialist',
    subtitle: 'Rigorous 6-step background verification cleared',
  },
};

export const WithEyebrowAndIconAction: Story = {
  args: {
    eyebrow: 'Select date',
    heading: 'October 2026',
    actionLabel: 'Full calendar',
    actionIcon: 'calendar_month',
  },
};

export const WithBadge: Story = {
  args: {
    heading: 'Spotlight Specialist',
    subtitle: 'Rigorous 6-step background verification cleared',
  },
  render: (args) => ({
    props: args,
    template: `<app-section-header [heading]="heading" [subtitle]="subtitle">
      <app-badge variant="primary">Top Rated</app-badge>
    </app-section-header>`,
  }),
};
