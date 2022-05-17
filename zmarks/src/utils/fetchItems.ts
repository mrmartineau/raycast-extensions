import { getPreferenceValues, showToast, Toast } from '@raycast/api'
import fetch from 'node-fetch'
import { Bookmark } from '../bookmark.model'
import urlJoin from 'proper-url-join'

export const fetchItems = async (url: string): Promise<Bookmark[]> => {
  const pref = getPreferenceValues()
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${pref.zMarksApiSecret}`,
      },
    })
    const json: any = await response.json()
    return json.data as Bookmark[]
  } catch (error) {
    console.error(error)
    showToast(Toast.Style.Failure, 'Could not fetch items')
    return Promise.resolve([])
  }
}
export const fetchLatestItems = async (): Promise<Bookmark[]> => {
  const pref = getPreferenceValues()
  return await fetchItems(
    urlJoin(pref.zMarksBasePath, 'api', 'bookmark', {
      query: { limit: '60', status: 'active' },
    })
  )
}

export const searchItems = async (searchTerm = ''): Promise<Bookmark[]> => {
  const pref = getPreferenceValues()
  return await fetchItems(
    urlJoin(pref.zMarksBasePath, 'api', 'search', {
      query: {
        searchTerm,
        status: 'active',
      },
    })
  )
}
