import { zodResolver } from '@hookform/resolvers/zod';
import type { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { settingsFormSchema, type SettingsFormValues } from '../lib/settingsSchema';

interface SettingsFormProps {
  onSubmit?: (data: SettingsFormValues, event?: BaseSyntheticEvent) => void;
}

export function SettingsForm({ onSubmit }: SettingsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const submitHandler = (data: SettingsFormValues, event?: BaseSyntheticEvent) => {
    onSubmit?.(data, event);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} noValidate>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" {...register('name')} aria-invalid={Boolean(errors.name)} />
        {errors.name && <p role="alert">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} aria-invalid={Boolean(errors.email)} />
        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password')} aria-invalid={Boolean(errors.password)} />
        {errors.password && <p role="alert">{errors.password.message}</p>}
      </div>

      <button type="submit">Save Settings</button>
    </form>
  );
}
