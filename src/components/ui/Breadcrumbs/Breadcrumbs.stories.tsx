import { Meta, StoryObj } from '@storybook/react';
import Breadcrumbs from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
    title: 'UI/Breadcrumbs',
    component: Breadcrumbs,
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Primary: Story = {
    args: {
        breadcrumbsArr: [
            {
                href: '1',
                label: 'link to 1',
                active: false,
            },
            {
                href: '2',
                label: 'link to 1',
                active: true,
            },
        ],
    },
};
