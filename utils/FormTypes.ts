import { DefaultTFuncReturn } from "i18next";
import { HTMLInputTypeAttribute, ReactNode, SelectHTMLAttributes } from "react";
import {
  UseFormRegister,
  FieldValues,
  Path,
  DeepMap,
  FieldError,
  RegisterOptions,
} from "react-hook-form";

export type FormInputProps<TFormData extends FieldValues> = {
  register?: UseFormRegister<TFormData>;
  id: Path<TFormData>;
  label?: string | DefaultTFuncReturn;
  errors?: Partial<DeepMap<TFormData, FieldError>>;
  placeholder?: string | DefaultTFuncReturn;
  registerOptions?: RegisterOptions;
  type?: HTMLInputTypeAttribute;
  attributes?: SelectHTMLAttributes<HTMLInputElement>;
  wrappingElementStyle?: string;
};

export type FormSelectProps<TFormData extends FieldValues> = {
  register?: UseFormRegister<TFormData>;
  id: Path<TFormData>;
  label?: string | DefaultTFuncReturn;
  errors?: Partial<DeepMap<TFormData, FieldError>>;
  registerOptions?: RegisterOptions;
  attributes?: SelectHTMLAttributes<HTMLSelectElement>;
  wrappingElementStyle?: string;
  children: ReactNode;
};
