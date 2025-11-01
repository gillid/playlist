import { useActionState, useCallback } from 'react';

export const useResettableFormState = <
  ActionState extends Record<string, unknown>,
>(
  originAction: (state: ActionState, payload: FormData) => Promise<ActionState>,
  initialState: Awaited<ActionState>
): [ActionState, (payload: FormData | null) => void, boolean, () => void] => {
  const wrappedAction = (state: ActionState, payload: FormData | null) => {
    if (!payload) {
      return initialState;
    }

    return originAction(state, payload);
  };

  const [state, action, isPending] = useActionState<
    ActionState,
    FormData | null
  >(wrappedAction, initialState);

  const reset = useCallback(() => {
    action(null);
  }, [action]);

  return [state, action, isPending, reset];
};
