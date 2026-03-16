import { Link } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import "./OrdersPage.css";

function OrdersPage() {
  const [orders, , clearOrders] = useLocalStorage("eshop_orders", []);

  if (!orders.length) {
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
        <button
          type="button"
          className="btn btn--secondary orders-page__clear"
          onClick={() => {
            if (window.confirm("Clear all order history?")) clearOrders();
          }}
        >
          Clear history
        </button>
      </div>

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

            <p className="order-card__address">{order.address}</p>

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
