import type { Meta, StoryObj } from '@storybook/angular-vite';

import { RAHUL } from '../../../../shared/ui/fixtures';
import { TrustBadges } from './trust-badges';

const meta: Meta<TrustBadges> = {
  title: 'Provider/TrustBadges',
  component: TrustBadges,
  tags: ['autodocs'],
  args: { badges: RAHUL.trustBadges! },
};

export default meta;
type Story = StoryObj<TrustBadges>;

export const Default: Story = {};

export const Single: Story = { args: { badges: RAHUL.trustBadges!.slice(0, 1) } };
