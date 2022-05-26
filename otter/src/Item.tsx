import {
  List,
  ActionPanel,
  Action,
  Icon,
  Detail,
  getPreferenceValues,
} from '@raycast/api'
import urlJoin from 'proper-url-join'
import tinyRelativeDate from 'tiny-relative-date'
import { Bookmark } from './bookmark.model'
import { simpleUrl } from './utils/simpleUrl'

interface ItemProps extends Bookmark {
  id: string
}

export const Item = ({
  title,
  description,
  url,
  tags,
  created_at,
  note,
  id,
}: ItemProps): JSX.Element | null => {
  const pref = getPreferenceValues()

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
  if (note) {
    accessories.push({
      icon: Icon.TextDocument,
      tooltip: note,
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
          <Action.CopyToClipboard title="Copy url" content={url} />
          <Action.OpenInBrowser
            url={urlJoin(pref.otterBasePath, 'bookmark', id)}
            title="Open item in Otter"
          />
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
