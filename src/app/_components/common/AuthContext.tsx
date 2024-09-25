'use client';

import { supabase } from '@/supabase/browser';
import type { Session } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect } from 'react';

type SupabaseContext = {
  supabase: any;
  session: null | {
    access_token: string;
    refresh_token: string;
  };
  isLoading: boolean;
};

// @ts-ignore
const Context = createContext<SupabaseContext>();

//TODO get stripe subscription data
export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const data = useUser() ;
  // const [supabase] = useState(() => createBrowserClient());
  const [session, setSession] = useState(null);
  const [isLoading, setLoading] = useState(true);
  
  // Hydrate user context and company data for a user
  useEffect(() => {
    supabase.auth.onAuthStateChange((event: any, session: any) => {
      if(event==='SIGNED_OUT') {
        setSession(null)
      } else if(session) {
        setSession(session)
      }
    })
    setLoading(false);
  }, []);

  // 새로고침 / 페이지로 이동되지 않도록 해야함
  // useEffect(() => {
  //   if (!data) {   
  //     console.log("not found user")
  //       router.push('/');
  //   }
  // }, [data]);

  return (
    <Context.Provider value={{ supabase, session, isLoading }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useAuthState = () => useContext(Context);
