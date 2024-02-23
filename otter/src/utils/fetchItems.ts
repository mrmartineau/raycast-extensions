import { supabase } from '../supabase'
import type { BaseBookmark } from '../types'

export const useFetchSearchItems = (searchTerm: string = '') => {
  return supabase
    .from('bookmarks')
    .select('*', { count: 'exact' })
    .or(
      `title.ilike.*${searchTerm}*,url.ilike.*${searchTerm}*,description.ilike.*${searchTerm}*,note.ilike.*${searchTerm}*,tags.cs.{${searchTerm}}`
    )
    .match({ status: 'active' })
    .order('created_at', { ascending: false })
    .returns<BaseBookmark[]>()
}

export const useFetchRecentItems = () => {
  return supabase
    .from('bookmarks')
    .select('*', { count: 'exact' })
    .limit(60)
    .match({ status: 'active' })
    .order('created_at', { ascending: false })
    .returns<BaseBookmark[]>()
}
