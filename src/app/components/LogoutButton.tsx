"use client";

import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient"

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/signin");
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
      Logout
    </button>
  );
}
