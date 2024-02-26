import { useFetchRecentItems } from './utils/fetchItems'
import { useCachedPromise } from '@raycast/utils'

export function useRecents(tag: string) {
  const { data, isLoading, revalidate } = useCachedPromise(
    async (tag) => {
      const theTag = tag === 'all' ? undefined : tag
      return await useFetchRecentItems(theTag)
    },
    [tag]
  )

  return { data: data?.data, error: data?.error, isLoading, revalidate }
}
