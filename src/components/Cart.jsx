import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/currency";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";
export default function Cart() {
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)

    const totPrice = cartCtx.items.reduce((total, item) => total + item.quantity * item.price, 0)

    function handleCloseCart() {
        userProgressCtx.hideCart()
    }
    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onIncrease={() => cartCtx.addItem(item)}
                        onDecrease={() => cartCtx.removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(totPrice)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && (<Button onClick={handleCloseCart} disabled={cartCtx.items.length == 0}>Checkout</Button>) }
            </p>
        </Modal>
    )
}