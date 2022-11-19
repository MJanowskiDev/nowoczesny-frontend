import { FormInputProps } from "../../utils/FormTypes";

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
      className={` bg-gray-100/50 dark:bg-gray-900 dark:text-white ${
        wrappingElementStyle ? wrappingElementStyle : ""
      }`}
    >
      {label && (
        <label className="mb-1 block text-sm " htmlFor={id}>
          {label}
        </label>
      )}
      <input
        placeholder={placeholder || ""}
        className="w-full rounded-lg p-2.5 text-sm shadow-sm border-gray-50/20 bg-white dark:bg-gray-800/70 "
        type={type ? type : "text"}
        id={id}
        {...attributes}
        {...register(id, registerOptions)}
      />
      {errors && (
        <p className="text-red-400 text-sm h-5 mt-1 italic font-semibold">
          {errors[id]?.message}
        </p>
      )}
    </div>
  );
};
