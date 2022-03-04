import { getPreferenceValues } from '@raycast/api'

export const getPrefs = () => {
  const pref = getPreferenceValues()
  const zMarksApiBasePath = (pref.zMarksApiBasePath as string) || ''
}
