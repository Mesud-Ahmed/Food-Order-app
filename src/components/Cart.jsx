import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/currency";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";

export default function Cart() {
    const cartCtx = useContext(CartContext)
    const totPrice = cartCtx.items.reduce((total, item) => total + item.quantity * item.price, 0)
    return (
        <Modal className="cart">
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <li key={item.id}>{item.name} - {item.quantity}</li>
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(totPrice)}</p>
            <p className="modal-actions">
                <Button textOnly>Close</Button>
                <Button >Checkout</Button>
            </p>
        </Modal>
    )
}