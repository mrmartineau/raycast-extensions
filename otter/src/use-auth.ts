import { useCachedPromise } from '@raycast/utils'
import { authorize } from './supabase'

export function useAuth() {
  const { isLoading, error } = useCachedPromise(async () => {
    await authorize()
  })

  return { isLoading, error }
}
