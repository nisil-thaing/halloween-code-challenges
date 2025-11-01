import type { ChangeEventHandler, FC, FocusEventHandler, ReactNode } from 'react';

import { StyledFieldContainer } from './TextInput.styled';
import { ErrorMessage } from 'formik';

export type UnitOption = {
  label: string;
  value: string;
};

export type TextInputProps = {
  fieldLabel?: ReactNode;
  name: string;
  value: string | number;
  unit?: {
    options: Array<UnitOption>;
    value: UnitOption['value'];
  };
  isDisabled?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onTextInputBlur?: FocusEventHandler<HTMLInputElement>;
};

export const TextInput: FC<TextInputProps> = ({
  fieldLabel,
  name,
  value,
  unit,
  isDisabled = false,
  onChange,
  onTextInputBlur,
}) => {
  const errorMessage = !isDisabled ? <ErrorMessage name={name} /> : null;

  return (
    <StyledFieldContainer>
      {fieldLabel ? <label htmlFor={name}>{fieldLabel}</label> : null}
      <section className="px-3 py-2 border rounded-lg input-wrapper">
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          className="focus-visible:border-none focus-visible:outline-none"
          onChange={onChange}
          onBlur={onTextInputBlur}
          disabled={isDisabled}
        />
        {unit && <>render dropdown</>}
      </section>
      {errorMessage ? <p className="mt-2 text-red-500">{errorMessage}</p> : null}
    </StyledFieldContainer>
  );
};
