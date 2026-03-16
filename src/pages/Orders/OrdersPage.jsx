import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabaseClient";
import "./OrdersPage.css";

function OrdersPage() {
  const { isAuthenticated, user } = useAuth();
  const [localOrders, , clearLocalOrders] = useLocalStorage("eshop_orders", []);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!isAuthenticated || !user) {
        setOrders(localOrders);
        return;
      }
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("id, created_at, total, items, discount_applied")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (!active) return;

        const mapped = (data ?? []).map((row) => {
          const snapshot = row.items || {};
          return {
            orderId: snapshot.orderId ?? row.id,
            date: snapshot.date ?? row.created_at,
            fullName: snapshot.fullName,
            email: snapshot.email,
            address: snapshot.address,
            items: snapshot.items ?? [],
            total: snapshot.total ?? row.total ?? 0,
          };
        });

        setOrders(mapped);
      } catch {
        if (!active) return;
        setOrders([]);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [isAuthenticated, user, localOrders]);

  if (!orders.length && !loading) {
    return (
      <div className="page orders-page">
        <h1>My Orders</h1>
        <p className="orders-page__empty">You haven't placed any orders yet.</p>
        <Link to="/" className="orders-page__link">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="page orders-page">
      <div className="orders-page__header">
        <h1>My Orders</h1>
        {!isAuthenticated && orders.length > 0 && (
          <button
            type="button"
            className="btn btn--secondary orders-page__clear"
            onClick={() => {
              if (window.confirm("Clear all local order history?")) clearLocalOrders();
            }}
          >
            Clear local history
          </button>
        )}
      </div>

      {loading && <p className="orders-page__loading">Loading your orders…</p>}

      <ul className="orders-list">
        {orders.map((order) => (
          <li key={order.orderId} className="order-card">
            <div className="order-card__header">
              <div>
                <span className="order-card__id">{order.orderId}</span>
                <span className="order-card__date">
                  {new Date(order.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <span className="order-card__total">
                €{order.total.toFixed(2)}
              </span>
            </div>

            {order.address && <p className="order-card__address">{order.address}</p>}

            <ul className="order-card__items">
              {order.items.map((item) => (
                <li key={item.id} className="order-card__item">
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="order-card__item-img"
                    />
                  )}
                  <span className="order-card__item-name">{item.name}</span>
                  <span className="order-card__item-qty">×{item.quantity}</span>
                  <span className="order-card__item-price">
                    €{item.lineTotal.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersPage;
