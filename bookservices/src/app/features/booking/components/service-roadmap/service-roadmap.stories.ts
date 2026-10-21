import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';

import { RoadmapStep, ServiceRoadmap } from './service-roadmap';

const steps: RoadmapStep[] = [
  { title: 'Booking Confirmed', detail: 'Technician locked and assigned to task.', status: 'done' },
  {
    title: 'Technician Arrives',
    meta: 'Fri, 9 Oct at 04:00 PM',
    detail: 'Standard ID & temperature verification check.',
    status: 'current',
  },
  {
    title: 'Foam Jet Cleaning & Inspection',
    detail: 'Indoor unit wash, filter flush & airflow testing.',
    status: 'upcoming',
  },
  {
    title: 'Sign-off & Payment',
    detail: 'Test run verification, digital receipt & ₹999 payment.',
    status: 'upcoming',
  },
];

const meta: Meta<ServiceRoadmap> = {
  title: 'Booking/ServiceRoadmap',
  component: ServiceRoadmap,
  tags: ['autodocs'],
  args: { steps },
};

export default meta;
type Story = StoryObj<ServiceRoadmap>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const items = canvas.getAllByRole('listitem');
    await expect(items[1]).toHaveAttribute('aria-current', 'step');
  },
};

export const AllDone: Story = {
  args: { steps: steps.map((s) => ({ ...s, status: 'done' as const })) },
};
