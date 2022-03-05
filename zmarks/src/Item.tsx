import { List, ActionPanel, Action } from '@raycast/api'
import { Bookmark } from './bookmark.model'
import { simpleUrl } from './utils/simpleUrl'

interface ItemProps extends Bookmark {}

export const Item = ({
  title,
  description,
  url,
  tags,
}: ItemProps): JSX.Element => {
  return (
    <List.Item
      title={title}
      subtitle={description || ''}
      icon={`https://icons.duckduckgo.com/ip3/${simpleUrl(url)}.ico`}
      accessoryTitle={simpleUrl(url)}
      keywords={tags ?? []}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser url={url} title="Open url" />
        </ActionPanel>
      }
    />
  )
}
