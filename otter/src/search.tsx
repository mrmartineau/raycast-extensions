import {
  Action,
  ActionPanel,
  Icon,
  List,
  getPreferenceValues,
} from '@raycast/api'
import { useState } from 'react'
import { Item } from './Item'
import { Bookmark } from './bookmark.model'
import { useFetchSearchItems } from './utils/fetchItems'
import urlJoin from 'proper-url-join'

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const { isLoading, data } = useFetchSearchItems(searchTerm)
  const pref = getPreferenceValues()

  return (
    <List
      isLoading={isLoading}
      searchText={searchTerm}
      searchBarPlaceholder={`Search Otter, like "wordle"…`}
      onSearchTextChange={setSearchTerm}
      throttle
    >
      {searchTerm ? (
        <List.Item
          title={`View search results in Otter`}
          icon={Icon.MagnifyingGlass}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser
                url={urlJoin(pref.otterBasePath, 'search', {
                  query: { q: searchTerm },
                })}
                title="Open search in Otter"
              />
            </ActionPanel>
          }
        />
      ) : (
        <List.Item
          title={`View latest items in Otter`}
          icon={Icon.Bell}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser
                url={`https://otter.zander.wtf`}
                title="Open latest items in Otter"
              />
            </ActionPanel>
          }
        />
      )}
      {data?.data?.length
        ? data?.data.map((item: Bookmark) => {
            return <Item key={item.id} {...item} />
          })
        : null}
    </List>
  )
}
