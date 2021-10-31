import { getPreferenceValues, List, showToast, ToastStyle } from '@raycast/api'
import { useEffect, useState } from 'react'
import fetch from 'node-fetch'
import { Response } from './response.model'
import { PackageListItem } from './PackagListItem'

interface State {
  items?: Response
  error?: Error
}

interface ExtensionPreferences {
  githubUsername: string
  resultsCount: string
}

export default function PackageList() {
  const [state, setState] = useState<State>()
  const [loading, setLoading] = useState<boolean>(true)
  const { githubUsername, resultsCount }: ExtensionPreferences =
    getPreferenceValues()

  useEffect(() => {
    const fetchPackages = async (): Promise<void> => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${githubUsername}/starred?per_page=${resultsCount}`,
        )
        const json = await response.json()
        setState({ items: json as Response })
        setLoading(false)
      } catch (error) {
        console.error(error)
        showToast(ToastStyle.Failure, 'Could not fetch stars')
        // setState({ error: error instanceof Error ? error : new Error("Something went wrong") }))
      }
    }

    fetchPackages()
  }, [])

  if (state?.error) {
    showToast(ToastStyle.Failure, 'Failed loading stories', state.error.message)
  }

  return (
    <List isLoading={loading} searchBarPlaceholder="Filter…">
      {state?.items?.length
        ? state.items.map((item) => {
            return <PackageListItem key={item.id} result={item} />
          })
        : null}
    </List>
  )
}
