import type { Meta, StoryObj } from '@storybook/angular-vite';
import { fn } from 'storybook/test';

import { ANANYA, SURESH } from '../fixtures';
import { ProviderList } from './provider-list';

const meta: Meta<ProviderList> = {
  title: 'UI/ProviderList',
  component: ProviderList,
  tags: ['autodocs'],
  args: {
    providers: [SURESH, ANANYA],
    selectedId: null,
    loading: false,
    book: fn(),
    viewProfile: fn(),
  },
};

export default meta;
type Story = StoryObj<ProviderList>;

export const Default: Story = {};

export const Selected: Story = { args: { selectedId: 'ananya-rao' } };

export const Loading: Story = { args: { loading: true } };

export const Empty: Story = { args: { providers: [] } };
