import { useCachedPromise } from '@raycast/utils'
import { useFetchSearchItems } from './utils/fetchItems'

export function useSearch(searchTerm: string) {
  const { data, isLoading, revalidate } = useCachedPromise(
    async (searchTerm) => {
      return await useFetchSearchItems(searchTerm)
    },
    [searchTerm]
  )

  return { data: data?.data, error: data?.error, isLoading, revalidate }
}
