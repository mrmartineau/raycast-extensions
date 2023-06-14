import { getPreferenceValues } from '@raycast/api'

export const getPrefs = () => {
  const pref = getPreferenceValues()
  const otterApiBasePath = (pref.otterApiBasePath as string) || ''
}
