import {
  Form,
  ActionPanel,
  Action,
  getPreferenceValues,
  open,
} from '@raycast/api'
import urlJoin from 'proper-url-join'

export default function Add() {
  const pref = getPreferenceValues()
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Add url"
            onSubmit={async (values) => {
              console.log(values)
              const url = urlJoin(pref.zMarksBasePath, 'new/bookmark', {
                query: {
                  bookmarklet: 'true',
                  url: values.url,
                },
              })
              console.log(`🚀 ~ onSubmit={ ~ url`, url)
              await open(url)
            }}
          />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="url"
        title="Bookmark Url"
        placeholder="https://example.com"
      />
    </Form>
  )
}
