import { List, ActionPanel, Action, Icon, Detail } from '@raycast/api'
import tinyRelativeDate from 'tiny-relative-date'
import { Bookmark } from './bookmark.model'
import { simpleUrl } from './utils/simpleUrl'

interface ItemProps extends Bookmark {}

export const Item = ({
  title,
  description,
  url,
  tags,
  created_at,
  note,
}: ItemProps): JSX.Element | null => {
  if (!url || !title) {
    return null
  }

  const accessories = [
    {
      text: simpleUrl(url),
      tooltip: url,
    },
    {
      icon: Icon.Calendar,
      tooltip: `Added: ${tinyRelativeDate(new Date(created_at))}`,
    },
  ]
  if (tags?.length) {
    accessories.push({
      icon: Icon.Pin,
      tooltip: `Tags: ${tags?.join(', ')}`,
    })
  }

  return (
    <List.Item
      title={title}
      subtitle={description || ''}
      icon={`https://icons.duckduckgo.com/ip3/${simpleUrl(url)}.ico`}
      accessories={accessories}
      keywords={tags ?? []}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser url={url} title="Open url" />
          {description ? (
            <Action.Push
              title="View Description"
              target={<Detail markdown={description} />}
              icon={Icon.TextDocument}
            />
          ) : null}
          {note ? (
            <Action.Push
              title="View Note"
              target={<Detail markdown={note} />}
              icon={Icon.TextDocument}
            />
          ) : null}
        </ActionPanel>
      }
    />
  )
}
