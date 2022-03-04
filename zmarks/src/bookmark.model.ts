export interface Bookmark {
  title: string
  url: string
  description: string | null
  tags: string[] | null
  collection: {
    title: string
    id: string
  } | null
  note: string | null
  star: boolean
  created_at: string
  modified_at: string
  key: string
  click_count: number
  type: BookmarkType
  image: string
}

export type BookmarkType =
  | 'link'
  | 'article'
  | 'video'
  | 'audio'
  | 'recipe'
  | 'image'
  | 'document'
  | 'product'
  | 'game'
