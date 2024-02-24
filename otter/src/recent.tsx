import {
  Action,
  ActionPanel,
  Icon,
  List,
  getPreferenceValues,
} from '@raycast/api'
import { LinkItem } from './LinkItem'
import urlJoin from 'proper-url-join'
import { useRecents } from './useRecents'
import { Authenticated } from './authenticated'

export const RecentBookmarks = () => {
  const { data: bookmarks, isLoading } = useRecents()
  const prefs = getPreferenceValues()

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Filter…"
      isShowingDetail={prefs.showDetailView}
    >
      <List.Item
        title={`View recent items in Otter`}
        icon={Icon.MagnifyingGlass}
        actions={
          <ActionPanel>
            <Action.OpenInBrowser
              url={urlJoin(prefs.otterBasePath, 'feed')}
              title="Open recent items in Otter"
            />
          </ActionPanel>
        }
      />
      {bookmarks?.length
        ? bookmarks.map((item) => {
            return <LinkItem key={item.id} {...item} />
          })
        : null}
    </List>
  )
}

export default function Command() {
  return <Authenticated component={RecentBookmarks} />
}
