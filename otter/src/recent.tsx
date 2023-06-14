import { List } from '@raycast/api'
import { useFetchRecentItems } from './utils/fetchItems'
import { Item } from './Item'
import { Bookmark } from './bookmark.model'

export default function Recent() {
  const { isLoading, data } = useFetchRecentItems()

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Filter…">
      {data?.data.length
        ? data?.data.map((item: Bookmark) => {
            return <Item key={item.id} {...item} />
          })
        : null}
    </List>
  )
}
