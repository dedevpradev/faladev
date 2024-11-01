import { render } from "@testing-library/react";
import React, { FC, ReactElement } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form"

export const renderWithFormProvider = (ui:ReactElement) =>{
    const Wrapper:FC<{ children: React.ReactNode }> = (
        { children }
    )=>{
        const methods = useForm();
        return (<FormProvider {...methods}>
            {children}
        </FormProvider>)
    };

    return render(ui,{wrapper:Wrapper})
}

export const FormStateChecker = ({ name }: {name: string }) =>{
    const { getValues } = useFormContext();
    return <div data-testid="form-state">{getValues(name)}</div>;
};