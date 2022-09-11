import { List } from '@raycast/api'
import { useFetchRecentItems } from './utils/fetchItems'
import { Item } from './Item'
import { Bookmark } from './bookmark.model'

export default function Recent() {
  const { isLoading, data } = useFetchRecentItems()

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Filter…">
      {data?.data.length
        ? data?.data.map(({ key, ...rest }: Bookmark) => {
            return <Item key={key} {...rest} id={key} />
          })
        : null}
    </List>
  )
}
