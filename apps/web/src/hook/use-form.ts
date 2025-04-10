import { FormEvent, useState, useTransition } from 'react';
import { requestFormReset } from 'react-dom';

interface FormState {
  success: boolean;
  message: string | null;
  errors: Record<string, string[]> | null;
}

export function useForm(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => Promise<void> | void,
  initialState?: FormState,
  shouldResetForm = false
) {
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState<FormState>(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    }
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      const response = await action(data);

      if (response.success && onSuccess) {
        await onSuccess();
      }

      setFormState(response);
    });

    startTransition(() => {
      if (shouldResetForm) {
        requestFormReset(form);
      }
    });
  }

  return [formState, handleSubmit, isPending] as const;
}
