import { getPreferenceValues } from '@raycast/api'
import { ApiResponse } from '../bookmark.model'
import urlJoin from 'proper-url-join'
import { useFetch } from '@raycast/utils'

export const useOtterFetch = <T = unknown, U = undefined>(url: string) => {
  const pref = getPreferenceValues()
  const fetchResponse = useFetch<ApiResponse>(url, {
    headers: {
      Authorization: `Bearer ${pref.otterApiSecret}`,
    },
    keepPreviousData: true,
  })

  return fetchResponse
}

export const useFetchSearchItems = (searchTerm: string = '') => {
  const pref = getPreferenceValues()
  return useOtterFetch<ApiResponse>(
    urlJoin(pref.otterBasePath, 'api', 'search', {
      query: {
        q: searchTerm,
        status: 'active',
      },
    })
  )
}
export const useFetchRecentItems = () => {
  const pref = getPreferenceValues()
  return useOtterFetch<ApiResponse>(
    urlJoin(pref.otterBasePath, 'api', 'bookmarks', {
      query: { limit: '60', status: 'active' },
    })
  )
}
