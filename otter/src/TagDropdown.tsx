import { Icon, List } from '@raycast/api'
import type { MetaResponse } from './types'

type TagDropdownProps = {
  tags?: MetaResponse['tags']
  onChange: (newValue: string) => void
}

export const TagDropdown = ({ tags, onChange }: TagDropdownProps) => {
  const untaggedItem = tags?.find((tag) => tag.tag === 'Untagged')
  return (
    <List.Dropdown tooltip="Select Tag" onChange={onChange}>
      <List.Dropdown.Item title="All items" value="all" key="all-tags" />
      <List.Dropdown.Item
        title={`Untagged items${
          untaggedItem?.count ? ` (${untaggedItem.count})` : ''
        })`}
        value="Untagged"
        key="untagged-items"
      />
      <List.Dropdown.Section key="tag-items">
        {tags?.map(({ tag, count }, index) => {
          if (!tag || tag === 'Untagged') {
            return null
          }
          return (
            <List.Dropdown.Item
              key={`${tag}-${index}`}
              title={`${tag} (${count})`}
              value={tag}
              icon={Icon.Hashtag}
            />
          )
        })}
      </List.Dropdown.Section>
    </List.Dropdown>
  )
}
