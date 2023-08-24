import { Action, ActionPanel, Icon, List } from '@raycast/api'
import { useState } from 'react'
import { Item } from './Item'
import { Bookmark } from './bookmark.model'
import { useFetchSearchItems } from './utils/fetchItems'

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const { isLoading, data } = useFetchSearchItems(searchTerm)

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
                url={`https://otter.zander.wtf/search?searchTerm=${searchTerm}`}
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
      {data?.data.length
        ? data?.data.map((item: Bookmark) => {
            return <Item key={item.id} {...item} />
          })
        : null}
    </List>
  )
}
