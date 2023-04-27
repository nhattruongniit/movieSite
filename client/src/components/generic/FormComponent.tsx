import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnyZodObject } from 'zod';
import ButtonComponent from './ButtonComponent';

interface FormComponentProps {
  schema: AnyZodObject;
  // submitFn: (...args: any[]) => any;
  submitFn: Function;
  options: Array<{ extras?: { [key: string]: string }; name: string; default?: string }>;
  submitBn?: string;
  styles?: Record<string, string>;
}

const FormComponent: React.FC<FormComponentProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(props.schema),
    defaultValues: {
      ...props.options.reduce(
        (acc, curr) => ({ ...acc, [`${curr.name}`]: curr.default ?? null }),
        {},
      ),
    },
  });
  return (
    <form
      className={props.styles?.form}
      onSubmit={handleSubmit((formInputs) => props.submitFn(formInputs))}
    >
      <>
        {props.options.map((option, index) => {
          return (
            <React.Fragment key={index}>
              <input className={props.styles?.input} {...option.extras} {...register(`${option.name}` as never)} />
              {(errors as any)[`${option.name}`]?.message && (
                <>{(errors as any)[`${option.name}`]?.message}</>
              )}
            </React.Fragment>
          );
        })}
        <ButtonComponent className={props.styles?.button} type='submit'>{props.submitBn ?? 'Submit'}</ButtonComponent>
      </>
    </form>
  );
};

export default FormComponent;
