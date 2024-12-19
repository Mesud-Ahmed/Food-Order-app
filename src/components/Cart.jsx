import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/currency";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Cart() {
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)

    const totPrice = cartCtx.items.reduce((total, item) => total + item.quantity * item.price, 0)

    function handleCloseCart(){
        userProgressCtx.hideCart()
    }
    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <li key={item.id}>{item.name} - {item.quantity}</li>
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(totPrice)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                <Button onClick={handleCloseCart}>Checkout</Button>
            </p>
        </Modal>
    )
}