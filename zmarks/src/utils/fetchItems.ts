import { getPreferenceValues, showToast, Toast } from '@raycast/api'
import fetch from 'node-fetch'
import { Bookmark } from '../bookmark.model'
import urlJoin from 'proper-url-join'

export const fetchLatestItems = async (): Promise<Bookmark[]> => {
  const pref = getPreferenceValues()
  try {
    const response = await fetch(
      urlJoin(pref.zMarksBasePath, 'api', 'bookmark'),
      {
        headers: {
          Authorization: `Bearer ${pref.zMarksApiSecret}`,
        },
      },
    )
    const json: any = await response.json()
    return json.data as Bookmark[]
  } catch (error) {
    console.error(error)
    showToast(Toast.Style.Failure, 'Could not fetch items')
    return Promise.resolve([])
  }
}

export const searchItems = async (searchTerm = ''): Promise<Bookmark[]> => {
  const pref = getPreferenceValues()
  try {
    const response = await fetch(
      urlJoin(pref.zMarksBasePath, 'api', 'search', {
        query: {
          searchTerm,
        },
      }),
      {
        headers: {
          Authorization: `Bearer ${pref.zMarksApiSecret}`,
        },
      },
    )
    const json: any = await response.json()
    return json.data as Bookmark[]
  } catch (error) {
    console.error(error)
    showToast(Toast.Style.Failure, 'Could not fetch items')
    return Promise.resolve([])
  }
}
