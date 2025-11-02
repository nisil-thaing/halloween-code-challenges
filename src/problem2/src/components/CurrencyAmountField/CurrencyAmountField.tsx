import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';

import type { CurrencyAmountData } from '@/types';
import { GENERAL_PATTERN } from '@/constants';
import { Field, FieldError, FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type CurrencyUnitOption = {
  label: string;
  value: string;
};

const DEFAULT_CURRENCY_UNIT_OPTIONS: Array<CurrencyUnitOption> = [
  { label: 'USD ($)', value: 'USD' },
  { label: 'EUR (€)', value: 'EUR' },
  { label: 'GBP (£)', value: 'GBP' },
  { label: 'JPY (¥)', value: 'JPY' },
  { label: 'VND (₫)', value: 'VND' },
  { label: 'AUD ($)', value: 'AUD' },
];

export const CurrencyAmountFieldSchema = Yup.object().shape({
  value: Yup.string()
    .required('Please fill your currency value')
    .matches(GENERAL_PATTERN.CURRENCY_VALUE, 'Please fill valid currency value'),
});

export type CurrencyAmountFieldProps = {
  fieldLabel?: ReactNode;
  name: string;
  unitOptions?: Array<CurrencyUnitOption>;
  isAutoFocus?: boolean;
  isDisabled?:
    | {
        value?: boolean;
        unit?: boolean;
      }
    | boolean;
};

export function CurrencyAmountField<T = unknown>({
  fieldLabel,
  name,
  unitOptions = DEFAULT_CURRENCY_UNIT_OPTIONS,
  isAutoFocus = false,
  isDisabled = false,
}: CurrencyAmountFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isDisabledTextInputRef = useRef(false);
  const formContextData = useFormikContext<T>();

  if (!formContextData) {
    throw new Error('<CurrencyAmountField /> must be used inside a <Formik /> wrapper component.');
  }

  const { initialValues, values, handleChange, handleBlur, setFieldValue } = formContextData;
  const isDisabledEverything = typeof isDisabled === 'boolean' && isDisabled;
  const isDisabledTextInput = isDisabledEverything || (isDisabled as { value: boolean }).value;

  isDisabledTextInputRef.current = isDisabledTextInput;

  const isDisabledUnitSelect = isDisabledEverything || (isDisabled as { unit: boolean }).unit;

  const initialFieldValues = (initialValues as { [name: string]: CurrencyAmountData })[name];
  const fieldValues = (values as { [name: string]: CurrencyAmountData })[name];

  useLayoutEffect(() => {
    const el = inputRef.current;
    if (el && isAutoFocus && !isDisabledTextInputRef.current) {
      el.focus();
      if (el.value) {
        el.select();
      }
    }
  }, [isAutoFocus]);

  return (
    <FieldGroup>
      <FieldSet className="gap-0">
        {fieldLabel ? <FieldLegend className="text-[#6b7280]">{fieldLabel}</FieldLegend> : null}
        <FieldGroup className="flex flex-row border rounded-lg py-1">
          <Field>
            <Input
              type="text"
              id={`${name}.value`}
              name={`${name}.value`}
              ref={inputRef}
              defaultValue={initialFieldValues.value}
              value={fieldValues.value}
              className="pl-4 border-none shadow-none focus-visible:border-none focus-visible:outline-none focus-visible:ring-0"
              placeholder="0"
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isDisabledTextInput}
            />
          </Field>
          <Field className="max-w-[120px] border-l">
            <Select
              name={`${name}.unit`}
              defaultValue={initialFieldValues.unit}
              onValueChange={(unitValue: string) => setFieldValue(`${name}.unit`, unitValue)}
              disabled={isDisabledUnitSelect}
            >
              <SelectTrigger
                id={`${name}.unit`}
                className="flex flex-row justify-center border-none shadow-none focus-visible:ring-0"
              >
                <SelectValue placeholder="USD" />
              </SelectTrigger>
              <SelectContent>
                {unitOptions.map((unitOption) => (
                  <SelectItem
                    key={unitOption.value}
                    value={unitOption.value}
                    disabled={unitOption.value === fieldValues.unit}
                  >
                    {unitOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
        <ErrorMessage component={FieldError} name={`${name}.value`} className="mt-2 pl-1" />
      </FieldSet>
    </FieldGroup>
  );
}
