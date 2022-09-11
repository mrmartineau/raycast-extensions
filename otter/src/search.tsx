import { List } from '@raycast/api'
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
      {data?.data.length
        ? data?.data.map(({ key, ...rest }: Bookmark) => {
            return <Item key={key} {...rest} id={key} />
          })
        : null}
    </List>
  )
}
