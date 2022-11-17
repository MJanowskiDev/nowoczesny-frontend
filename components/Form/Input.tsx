import { HTMLInputTypeAttribute, SelectHTMLAttributes } from "react";
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
  label?: string;
  errors?: Partial<DeepMap<TFormData, FieldError>>;
  placeholder?: string;
  registerOptions?: RegisterOptions;
  type?: HTMLInputTypeAttribute;
  attributes?: SelectHTMLAttributes<HTMLInputElement>;
  wrappingElementStyle?: string;
};

export const Input = <TFormData extends Record<string, unknown>>({
  register,
  id,
  label,
  errors,
  placeholder,
  registerOptions,
  attributes,
  wrappingElementStyle,
  type,
}: FormInputProps<TFormData>) => {
  if (!register) return null;

  return (
    <div
      className={`dark:text-gray-600  ${
        wrappingElementStyle ? wrappingElementStyle : ""
      }`}
    >
      {label && (
        <label className="mb-1 block text-sm text-gray-600" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        placeholder={placeholder}
        className="w-full rounded-lg p-2.5 text-sm shadow-sm border-gray-200"
        type={type ? type : "text"}
        id={id}
        {...attributes}
        {...register(id, registerOptions)}
      />
      {errors && (
        <p className="text-red-400 text-sm h-5 mt-1">{errors[id]?.message}</p>
      )}
    </div>
  );
};
