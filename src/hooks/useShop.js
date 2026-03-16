import { useContext } from "react";
import { ShopContext } from "../context/shopContext";

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
