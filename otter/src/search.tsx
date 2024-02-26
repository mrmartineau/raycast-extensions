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
import { useMeta } from './useMeta'
import { TagDropdown } from './TagDropdown'
import { NoItems } from './NoItems'
import { RecentTop } from './RecentTop'

const prefs = getPreferenceValues()

export const DEFAULT_TAG = 'all'

const SearchBookmarks = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTag, setActiveTag] = useState<string>(DEFAULT_TAG)
  const { data: recentBookmarks, isLoading: recentIsLoading } =
    useRecents(activeTag)
  const { data: searchResults, isLoading } = useSearch(searchTerm, activeTag)
  const { data: metadata } = useMeta()
  const bookmarksLoading = recentIsLoading || isLoading

  const handleReset = () => {
    setSearchTerm('')
    setActiveTag(DEFAULT_TAG)
  }

  return (
    <List
      isLoading={bookmarksLoading}
      searchText={searchTerm}
      searchBarPlaceholder={`Search Otter, like "wordle"…`}
      onSearchTextChange={setSearchTerm}
      throttle
      isShowingDetail={prefs.showDetailView}
      searchBarAccessory={
        <TagDropdown tags={metadata?.tags} onChange={setActiveTag} />
      }
    >
      {searchTerm ? (
        <>
          {searchResults?.length ? (
            <>
              <List.Item
                title={`Open search in Otter`}
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
              {searchResults.map((item) => {
                return <LinkItem key={`search-${item.id}`} {...item} />
              })}
            </>
          ) : (
            <NoItems onReset={handleReset} />
          )}
        </>
      ) : (
        <>
          {recentBookmarks?.length ? (
            <>
              <RecentTop activeTag={activeTag} />
              {recentBookmarks.map((item) => {
                return <LinkItem key={`recent-${item.id}`} {...item} />
              })}
            </>
          ) : (
            <NoItems onReset={handleReset} />
          )}
        </>
      )}
    </List>
  )
}

export default function Command() {
  return <Authenticated component={SearchBookmarks} />
}
