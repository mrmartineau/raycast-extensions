import { Action, ActionPanel, Detail, getPreferenceValues } from '@raycast/api'
import { SearchResult } from '.'

const joinTags = (tags: string[]): string => {
  const preferences = getPreferenceValues()
  return tags?.length
    ? tags
        ?.map((item) => `[#${item}](${preferences.baseUrl}/tags/${item})`)
        .join(' ')
    : ''
}

export const Note = ({
  content,
  title,
  emoji,
  url,
  tags,
  date,
}: SearchResult): JSX.Element => {
  const preferences = getPreferenceValues()
  const titleWithEmoji = emoji ? `${emoji} ${title}` : title
  const fullContent = `# ${titleWithEmoji}\n${new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
  }).format(new Date(date))} • ${joinTags(tags)}\n\n---\n${content}`
  return (
    <Detail
      markdown={fullContent}
      navigationTitle={titleWithEmoji}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser
            url={`${preferences.baseUrl}${url}`}
            title="Open in Browser"
          />
          <Action.CopyToClipboard title="Copy URL" content={url} />
        </ActionPanel>
      }
    />
  )
}
