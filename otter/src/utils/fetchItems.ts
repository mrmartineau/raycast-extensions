import { getPreferenceValues } from '@raycast/api'
import { ApiResponse } from '../bookmark.model'
import urlJoin from 'proper-url-join'
import { useCachedPromise } from '@raycast/utils'
import { authorize, client } from './oauth'
import { useRef } from 'react'
import fetch from 'node-fetch'

const pref = getPreferenceValues()
const otterBasePath = pref.otterBasePath
export const useOtterFetch = (url: string) => {
  const abortable = useRef<AbortController>(new AbortController())
  const fetchResponse = useCachedPromise(
    async (url: string): Promise<ApiResponse> => {
      console.log(`🚀 ~ url:`, url)
      await authorize()
      const tokens = await client.getTokens()
      console.log(`🚀 ~ useOtterFetch tokens:`, tokens)
      const response = await fetch(url, {
        signal: abortable.current?.signal,
        headers: {
          Authorization: `Bearer ${tokens?.accessToken}`,
        },
      })
      const result = await response.json()
      console.log(`🚀 ~ result:`, result)
      return result
    },
    [url],
    {
      abortable,
      keepPreviousData: true,
    }
  )
  console.log(`🚀 ~ useOtterFetch ~ fetchResponse:`, fetchResponse)

  return fetchResponse
}

export const useFetchSearchItems = (searchTerm: string = '') => {
  console.log(`🚀 ~ useFetchSearchItems ~ searchTerm:`, searchTerm)
  return useOtterFetch(
    urlJoin(otterBasePath, 'api/search', {
      query: {
        q: searchTerm,
        status: 'active',
      },
    })
  )
}
export const useFetchRecentItems = () => {
  return useOtterFetch(
    urlJoin(otterBasePath, 'api/bookmarks', {
      query: { limit: '60', status: 'active' },
    })
  )
}
export const useFetchMetaItems = (searchTerm: string = '') => {
  return useOtterFetch(
    urlJoin(otterBasePath, 'api/meta', {
      query: {
        q: searchTerm,
        status: 'active',
      },
    })
  )
}
