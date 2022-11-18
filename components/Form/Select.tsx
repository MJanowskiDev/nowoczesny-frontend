import { FormSelectProps } from "../../utils/FormTypes";

export const Select = <TFormData extends Record<string, unknown>>({
  register,
  id,
  label,
  errors,
  registerOptions,
  attributes,
  wrappingElementStyle,
  children,
}: FormSelectProps<TFormData>) => {
  if (!register) return null;
  return (
    <div
      className={` bg-gray-100/50 dark:bg-gray-900 dark:text-white   ${
        wrappingElementStyle ? wrappingElementStyle : ""
      }`}
    >
      {label && (
        <label className="sr-only" htmlFor={id}>
          {label}
        </label>
      )}

      <select
        className="relative w-full rounded-t-lg  p-2.5 text-sm focus:z-10 border-gray-200/20 bg-white dark:bg-gray-800/70"
        id={id}
        {...register(id, registerOptions)}
        {...attributes}
        autoComplete="country-name"
      >
        {children}
      </select>

      {errors && (
        <p className="text-red-400 text-sm h-5 mt-1 italic">
          {errors[id]?.message}
        </p>
      )}
    </div>
  );
};
