import { Icon, List } from '@raycast/api'
import type { MetaResponse } from './types'

type TagDropdownProps = {
  tags?: MetaResponse['tags']
  onChange: (newValue: string) => void
}

export const TagDropdown = ({ tags, onChange }: TagDropdownProps) => {
  return (
    <List.Dropdown tooltip="Select Tag" onChange={onChange}>
      <List.Dropdown.Item title="All tags" value="all" key="all-tags" />
      <List.Dropdown.Item
        title="Untagged items"
        value="Untagged"
        key="untagged-items"
      />
      <List.Dropdown.Section>
        {tags?.map(({ tag }, index) => {
          if (!tag || tag === 'Untagged') {
            return null
          }
          return (
            <List.Dropdown.Item
              key={`${tag}-${index}`}
              title={tag}
              value={tag}
              icon={Icon.Hashtag}
            />
          )
        })}
      </List.Dropdown.Section>
    </List.Dropdown>
  )
}
