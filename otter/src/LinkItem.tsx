import {
  List,
  ActionPanel,
  Action,
  Icon,
  Detail,
  getPreferenceValues,
  Image,
} from '@raycast/api'
import urlJoin from 'proper-url-join'
import tinyRelativeDate from 'tiny-relative-date'
import { simpleUrl } from './utils/simpleUrl'
import formatTitle from 'title'
import { BaseBookmark, type BookmarkType } from './types'

const typeToIcon = (type: BookmarkType | null) => {
  switch (type) {
    case 'article':
      return Icon.Document
    case 'video':
      return Icon.Video
    case 'audio':
      return Icon.Music
    case 'image':
      return Icon.Image
    case 'recipe':
      return Icon.Leaf
    case 'document':
      return Icon.Document
    case 'product':
      return Icon.Car
    case 'game':
      return Icon.GameController
    case 'link':
      return Icon.Link
    case 'note':
      return Icon.Snippets
    case 'event':
      return Icon.Clock
    case 'place':
      return Icon.Pin
    case 'book':
      return Icon.Book
    default:
      return null
  }
}

type LinkItemProps = BaseBookmark

const prefs = getPreferenceValues()
const showDetail = prefs.showDetailView
export const LinkItem = ({
  title,
  description,
  url,
  tags,
  created_at,
  note,
  id,
  type,
  star,
  public: isPublic,
  image,
  modified_at,
}: LinkItemProps) => {
  if (!url || !title) {
    return null
  }

  const accessories = [
    {
      icon: Icon.Calendar,
      tooltip: `Added: ${tinyRelativeDate(new Date(created_at))}`,
    },
    {
      icon: typeToIcon(type),
      tooltip: formatTitle(type),
    },
  ]
  if (tags?.length) {
    accessories.push({
      icon: Icon.Hashtag,
      tooltip: `Tags: ${tags?.join(', ')}`,
    })
  }
  if (note) {
    accessories.push({
      icon: Icon.Snippets,
      tooltip: note,
    })
  }
  if (star) {
    accessories.push({
      icon: Icon.StarCircle,
      tooltip: 'Starred',
    })
  }
  if (isPublic) {
    accessories.push({
      icon: Icon.Eye,
      tooltip: 'Public',
    })
  }

  const descriptionDetail = `![](${image})\n\n${description}`

  return (
    <List.Item
      title={title}
      subtitle={!showDetail ? description || '' : ''}
      icon={{
        source: `https://logo.clearbit.com/${simpleUrl(url)}`,
        mask: Image.Mask.Circle,
        fallback: Icon.Bookmark,
      }}
      accessories={showDetail ? null : accessories}
      keywords={tags ?? []}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser url={url} title="Open url" />
          <Action.OpenInBrowser
            url={urlJoin(prefs.otterBasePath, 'bookmark', id)}
            title="Open item in Otter"
          />
          <Action.CopyToClipboard title="Copy url" content={url} />
          {description ? (
            <Action.Push
              title="View Description"
              target={<Detail markdown={descriptionDetail} />}
              icon={Icon.Document}
            />
          ) : null}
          {note ? (
            <Action.Push
              title="View Note"
              target={<Detail markdown={note} />}
              icon={Icon.Snippets}
            />
          ) : null}
        </ActionPanel>
      }
      detail={
        <List.Item.Detail
          markdown={description}
          metadata={
            <List.Item.Detail.Metadata>
              {/* <List.Item.Detail.Metadata.Label title="Title" text={title} /> */}
              {tags?.length ? (
                <List.Item.Detail.Metadata.TagList title="Tags">
                  {tags?.map((tag) => (
                    <List.Item.Detail.Metadata.TagList.Item
                      text={tag}
                      icon={Icon.Hashtag}
                    />
                  ))}
                </List.Item.Detail.Metadata.TagList>
              ) : null}
              <List.Item.Detail.Metadata.Label
                title="Type"
                text={formatTitle(type)}
                icon={typeToIcon(type)}
              />
              <List.Item.Detail.Metadata.Label
                title="Date added"
                text={tinyRelativeDate(new Date(created_at))}
                icon={Icon.Calendar}
              />
              {modified_at !== created_at ? (
                <List.Item.Detail.Metadata.Label
                  title="Date modified"
                  text={tinyRelativeDate(new Date(modified_at))}
                  icon={Icon.Calendar}
                />
              ) : null}
              {star ? (
                <List.Item.Detail.Metadata.Label
                  title="Starred"
                  icon={Icon.Star}
                />
              ) : null}
              {isPublic ? (
                <List.Item.Detail.Metadata.Label
                  title="Public"
                  icon={Icon.Eye}
                />
              ) : null}
            </List.Item.Detail.Metadata>
          }
        />
      }
    />
  )
}
