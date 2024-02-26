import { Meta, StoryObj } from '@storybook/react';
import PrimaryBtn from './PrimaryBtn';

const meta: Meta<typeof PrimaryBtn> = {
    title: 'UI/Buttons/PrimaryBtn',
    component: PrimaryBtn,
    parameters: {
        docs: {
            description: {
                component: 'Another description, overriding the comments',
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof PrimaryBtn>;

export const Primary: Story = {
    args: {
        text: 'default',
        type: 'default',
    },
    argTypes: {
        type: {
            description: 'size and padding of the button',
            options: ['default', 'middle', 'large', 'buying', 'basket'],
            control: { type: 'select' },
        },
        text: {
            control: { type: 'text' },
            description: 'place text here',
        },
    },
};
