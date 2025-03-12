// contexts/AuthContext.tsx
"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../../../lib/supabaseClient"
import { Session } from "@supabase/supabase-js";

interface AuthContextProps {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  session: null,
  setSession: () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // 初回ロード時のセッション取得
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // セッションの変更をリッスン
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
}