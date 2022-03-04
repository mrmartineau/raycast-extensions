import { LocalStorage, List } from '@raycast/api'
import { useEffect, useState } from 'react'
import { fetchLatestItems } from './utils/fetchItems'
import { Item } from './Item'
import { Bookmark } from './bookmark.model'

export default function Recent() {
  const [results, setResults] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchItems = async (): Promise<void> => {
      const storedItems = await LocalStorage.getItem<string>('recent-items')

      if (storedItems) {
        setResults(JSON.parse(storedItems) as Bookmark[])
      }

      setLoading(true)
      const response = await fetchLatestItems()
      setResults(response)
      setLoading(false)
      await LocalStorage.setItem('recent-items', JSON.stringify(response))
    }
    fetchItems()
  }, [])

  return (
    <List isLoading={loading} searchBarPlaceholder="Filter…">
      {results?.length
        ? results.map(({ key, ...rest }: Bookmark) => {
            return <Item key={key} {...rest} />
          })
        : null}
    </List>
  )
}
