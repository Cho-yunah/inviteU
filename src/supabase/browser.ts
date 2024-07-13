import { createBrowserClient } from '@supabase/ssr'
import { Database } from './type'
export function supabaseBrowser() {
  //TODO: add sheme for datapase instead of any
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

export const supabase = supabaseBrowser()
