import { List } from '@raycast/api'
import { useState } from 'react'
import { searchItems } from './utils/fetchItems'
import { Item } from './Item'
import { Bookmark } from './bookmark.model'

export default function Search() {
  const [results, setResults] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const onSearchTextChange = async (text: string) => {
    setLoading(true)
    const response = await searchItems(text.replace(/\s/g, '+'))
    setResults(response)
    setLoading(false)
  }

  return (
    <List
      isLoading={loading}
      searchBarPlaceholder={`Search Otter, like "wordle"…`}
      onSearchTextChange={onSearchTextChange}
      throttle
    >
      {results?.length
        ? results.map(({ key, ...rest }: Bookmark) => {
            return <Item key={key} {...rest} />
          })
        : null}
    </List>
  )
}
