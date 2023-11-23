import {
  Action,
  ActionPanel,
  getPreferenceValues,
  Icon,
  List,
  showToast,
  Toast,
} from '@raycast/api'
import { useEffect, useMemo, useState } from 'react'
import algoliasearch from 'algoliasearch/lite'
import { Note } from './note'

export interface SearchResult {
  title: string
  emoji: string
  date: string
  url: string
  content: string
  tags: string[]
}

export default function main() {
  const preferences = getPreferenceValues()

  const algoliaClient = useMemo(() => {
    return algoliasearch(preferences.appId, preferences.apiKey)
  }, [preferences.appId, preferences.apiKey])

  const algoliaIndex = useMemo(() => {
    return algoliaClient.initIndex(preferences.indexName)
  }, [algoliaClient, preferences.indexName])

  const [searchResults, setSearchResults] = useState<
    SearchResult[] | undefined
  >()
  const [isLoading, setIsLoading] = useState(false)

  const search = async (query = ''): Promise<SearchResult[]> => {
    setIsLoading(true)

    return await algoliaIndex
      .search<SearchResult>(query, {
        attributesToRetrieve: [
          'title',
          'url',
          'date',
          'tags',
          'emoji',
          'content',
        ],
        attributesToHighlight: [],
      })
      .then((res) => {
        setIsLoading(false)
        return res.hits
      })
      .catch((err) => {
        setIsLoading(false)
        showToast(Toast.Style.Failure, 'Algolia Error', err.message)
        return []
      })
  }

  useEffect(() => {
    ;(async () => {
      const initialSearchResults = await search()
      const sortedSearchResultsByDate = initialSearchResults.sort(
        // @ts-ignore
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      setSearchResults(sortedSearchResultsByDate)
    })()
  }, [])

  return (
    <List
      throttle={true}
      isLoading={isLoading || searchResults === undefined}
      onSearchTextChange={async (query) =>
        setSearchResults(await search(query))
      }
    >
      {searchResults?.map((result) => (
        <List.Item
          key={result.url}
          icon={result.emoji}
          title={result.title}
          accessories={[
            result.tags?.length
              ? {
                  icon: Icon.Hashtag,
                  text: result.tags?.join(', '),
                }
              : {},
            {
              icon: Icon.Calendar,
              text: new Intl.DateTimeFormat('en-GB', {
                dateStyle: 'medium',
              }).format(new Date(result.date)),
            },
          ]}
          actions={
            <ActionPanel>
              {result.content ? (
                <Action.Push
                  title="View Note"
                  target={<Note {...result} />}
                  icon={Icon.Paragraph}
                />
              ) : null}
              <Action.OpenInBrowser
                url={`${preferences.baseUrl}${result.url}`}
                title="Open in Browser"
              />
              <Action.CopyToClipboard title="Copy URL" content={result.url} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  )
}
