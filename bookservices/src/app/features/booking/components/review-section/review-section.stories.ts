import { provideRouter, withHashLocation } from '@angular/router';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';

import { ReviewSection } from './review-section';

type SectionArgs = ReviewSection & { body: string };

const meta: Meta<SectionArgs> = {
  title: 'Booking/ReviewSection',
  component: ReviewSection,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([{ path: '**', children: [] }], withHashLocation())],
    }),
  ],
  args: {
    heading: 'Service & Schedule',
    editLink: '/book/rahul-sharma',
    body: 'AC General Service • Friday, 9 October at 04:00 PM',
  },
  render: (args) => ({
    props: args,
    template: `<app-review-section [heading]="heading" [editLink]="editLink"><p>{{ body }}</p></app-review-section>`,
  }),
};

export default meta;
type Story = StoryObj<SectionArgs>;

export const WithEdit: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'Edit Service & Schedule' })).toBeInTheDocument();
  },
};

export const ReadOnly: Story = {
  args: { heading: 'Professional', editLink: undefined, body: 'Rahul Sharma • Verified Pro' },
};
