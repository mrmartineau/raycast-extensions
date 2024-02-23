import { useFetchRecentItems } from './utils/fetchItems'
import { useCachedPromise } from '@raycast/utils'

export function useRecents() {
  const { data, isLoading, revalidate } = useCachedPromise(async () => {
    return await useFetchRecentItems()
  }, [])

  return { data: data?.data, error: data?.error, isLoading, revalidate }
}
