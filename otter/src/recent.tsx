import {
  Action,
  ActionPanel,
  Icon,
  List,
  getPreferenceValues,
} from '@raycast/api'
import { useFetchRecentItems } from './utils/fetchItems'
import { Item } from './Item'
import { Bookmark } from './bookmark.model'
import urlJoin from 'proper-url-join'

export default function Recent() {
  const { isLoading, data } = useFetchRecentItems()
  const pref = getPreferenceValues()

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Filter…">
      <List.Item
        title={`View recent items in Otter`}
        icon={Icon.MagnifyingGlass}
        actions={
          <ActionPanel>
            <Action.OpenInBrowser
              url={urlJoin(pref.otterBasePath, 'feed')}
              title="Open recent items in Otter"
            />
          </ActionPanel>
        }
      />
      {data?.data?.length
        ? data?.data.map((item: Bookmark) => {
            return <Item key={item.id} {...item} />
          })
        : null}
    </List>
  )
}
