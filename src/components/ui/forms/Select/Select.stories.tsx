// import * as React from 'react';
// import { Meta, StoryFn, StoryObj } from '@storybook/react';
// import Select from './Select';

// const meta: Meta<typeof Select> = {
//     title: 'UI/Form/Select',
//     component: Select,
//     parameters: {
//         docs: {},
//     },
// };

// export default meta;

// type Story = StoryObj<typeof Select>;

// const SelectContainerWithHooks = (): JSX.Element => {
//     const [state, setState] = React.useState<string>('');

//     return (
//         <Select
//             defValue='defaul value'
//             setValue={setState}
//             value={state}
//             arr={['var1', 'var2', 'var3']}
//         />
//     );
// };

// export const Primary: StoryFn = () => <SelectContainerWithHooks />;

// Primary.argTypes = {
//     value: {
//         description: 'value can be empty,this thing needs to change state',
//     },
//     defValue: {
//         description: 'def value',
//     },
//     arr: {
//         description: 'array of elements that will be rendered inside select',
//         control: { type: 'text' },
//     },
// };
