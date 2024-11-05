
import type { Meta, StoryObj } from '@storybook/react'

import { Upload } from "./index";
import { MockFormProvider as FormProvider } from './MockFormProvider';

type Story = StoryObj<typeof Upload>;

const meta: Meta<typeof Upload> = {
    component: Upload,
    title: 'Components/Upload',
    argTypes:{
        name:{
            control:{type:'text'},
            description: 'Field identifier in React hook form'
        }
    },
    parameters: {
        layout: 'centered'
    }
};
export default meta

export const Default:Story = {
    render: () => (
        <FormProvider>
            <Upload/>
        </FormProvider>
    )
}