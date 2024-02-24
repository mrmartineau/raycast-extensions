import {
  Action,
  ActionPanel,
  Icon,
  List,
  getPreferenceValues,
} from '@raycast/api'
import { useState } from 'react'
import urlJoin from 'proper-url-join'
import { useSearch } from './useSearch'
import { useRecents } from './useRecents'
import { LinkItem } from './LinkItem'
import { Authenticated } from './authenticated'

const prefs = getPreferenceValues()

const SearchBookmarks = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: recentBookmarks, isLoading: recentIsLoading } = useRecents()
  const { data: bookmarks, isLoading } = useSearch(searchTerm)
  const bookmarksLoading = recentIsLoading || isLoading

  return (
    <List
      isLoading={bookmarksLoading}
      searchText={searchTerm}
      searchBarPlaceholder={`Search Otter, like "wordle"…`}
      onSearchTextChange={setSearchTerm}
      throttle
      isShowingDetail={prefs.showDetailView}
    >
      {searchTerm ? (
        <>
          <List.Item
            title={`View search results for "${searchTerm}" in Otter`}
            icon={Icon.MagnifyingGlass}
            actions={
              <ActionPanel>
                <Action.OpenInBrowser
                  url={urlJoin(prefs.otterBasePath, 'search', {
                    query: { q: searchTerm },
                  })}
                  title="Open search in Otter"
                />
              </ActionPanel>
            }
          />
          {bookmarks?.length
            ? bookmarks.map((item) => {
                return <LinkItem key={item.id} {...item} />
              })
            : null}
        </>
      ) : (
        <>
          <List.Item
            title={`View latest items in Otter`}
            icon={Icon.Bell}
            actions={
              <ActionPanel>
                <Action.OpenInBrowser
                  url={urlJoin(prefs.otterBasePath, 'feed')}
                  title="Open latest items in Otter"
                />
              </ActionPanel>
            }
          />
          {recentBookmarks?.length
            ? recentBookmarks.map((item) => {
                return <LinkItem key={item.id} {...item} />
              })
            : null}
        </>
      )}
    </List>
  )
}

export default function Command() {
  return <Authenticated component={SearchBookmarks} />
}
