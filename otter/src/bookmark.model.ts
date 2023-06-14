export type ApiResponse = {
  offset: number
  limit: number
  count: number
  _links: {
    next: string | null
    prev: string | null
  }
  data: Bookmark[]
}

export interface Bookmark {
  title: string | null
  url: string | null
  description: string | null
  tags: string[] | null
  note: string | null
  star: boolean
  created_at: string
  modified_at: string
  id: string
  click_count: number
  type: BookmarkType
  image: string
  excerpt: string | null
  tweet?: {
    text: string
    username: string
    url: string
  }
  feed: string | null
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
  | 'note'
  | 'event'
  | 'file'
