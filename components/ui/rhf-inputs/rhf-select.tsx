'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectProps } from '@radix-ui/react-select';
import { useFormContext } from 'react-hook-form';

type RHFSelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  options: {
    id: string;
    value: string;
    label: string;
    disabled: boolean;
  }[];
  description?: string;
} & SelectProps;

const RHFSelect = ({ label, options, placeholder, name, description }: RHFSelectProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
              {options?.map(({ id, value, label, disabled = false }) => (
                <SelectItem
                  key={id}
                  value={value}
                  className="cursor-pointer data-[highlighted]:hover:bg-violet-300"
                  disabled={disabled}
                >
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RHFSelect;
