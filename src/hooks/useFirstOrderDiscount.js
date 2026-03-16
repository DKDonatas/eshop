import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useFirstOrderDiscount(user) {
  const [eligible, setEligible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    async function check() {
      if (!user) {
        setEligible(false);
        return;
      }
      setLoading(true);
      try {
        const { count, error } = await supabase
          .from("orders")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("discount_applied", true);

        if (error) throw error;
        if (!active) return;
        setEligible(!count || count === 0);
      } catch {
        if (!active) return;
        setEligible(false);
      } finally {
        if (active) setLoading(false);
      }
    }

    check();

    return () => {
      active = false;
    };
  }, [user]);

  return { eligible, loading };
}

