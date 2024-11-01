import React from 'react';
import { useForm, FormProvider, UseFormReturn } from 'react-hook-form';

interface MockFormProviderProps {
  children: React.ReactNode;
  defaultValues?: Record<string, any>;
  methods?: Partial<UseFormReturn>;
}

export const MockFormProvider: React.FC<MockFormProviderProps> = ({ children, defaultValues = {}, methods = {} }) => {
  const formMethods = useForm({ defaultValues });
  const combinedMethods = { ...formMethods, ...methods };

  return <FormProvider {...combinedMethods}>{children}</FormProvider>;
};