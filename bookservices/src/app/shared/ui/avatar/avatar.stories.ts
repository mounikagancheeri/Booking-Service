import type { Meta, StoryObj } from '@storybook/angular-vite';

import { RAHUL } from '../fixtures';
import { Avatar } from './avatar';

const meta: Meta<Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: { shape: { control: 'inline-radio', options: ['circle', 'rounded'] } },
  args: { name: RAHUL.name, src: RAHUL.avatarUrl, size: 64, shape: 'rounded' },
};

export default meta;
type Story = StoryObj<Avatar>;

export const Image: Story = {};

export const InitialsFallback: Story = {
  args: { src: undefined, name: 'Priya Reddy', shape: 'circle' },
};

export const BrokenImage: Story = { args: { src: 'https://invalid.example/missing.jpg' } };

export const Verified: Story = { args: { verified: true } };

export const Loading: Story = { args: { loading: true } };
