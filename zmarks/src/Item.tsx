import { List, Icon, ActionPanel, Action } from '@raycast/api'
import { Bookmark } from './bookmark.model'
import { simpleUrl } from './utils/simpleUrl'

interface ItemProps extends Bookmark {}

export const Item = ({ title, description, url }: ItemProps): JSX.Element => {
  return (
    <List.Item
      title={title}
      subtitle={description || ''}
      icon={Icon.ArrowRight}
      accessoryTitle={simpleUrl(url)}
      // keywords={pkg.keywords}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser url={url} title="Open url" />
        </ActionPanel>
      }
    />
  )
}
