import Modal from "./UI/Modal"
import CartContext from "../store/CartContext"
import { currencyFormatter } from "../util/currency"
import { useContext } from "react"
import Input from "./Input"
import Button from "./UI/Button"
import UserProgressContext from "../store/UserProgressContext"
export default function Checkout() {
    const cartCtx = useContext(CartContext)
    const totPrice = cartCtx.items.reduce((total, item) => total + item.quantity * item.price, 0)
    const userProgressCtx = useContext(UserProgressContext)

    function handleClose() {
        userProgressCtx.hideCheckout()
    }
    function handleSubmit(e) {
        e.preventDefault()

        const fd = new FormData(e.target)
        const customerData = Object.fromEntries(fd.entries())

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }

            })
        })

    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(totPrice)}</p>

                <Input label='Full Name' type='text' id='name' />
                <Input label='E-mail Adress' type='email' id='email' />
                <Input label='Street Adress' type='text' id='street' />
                <div className="control-row">
                    <Input label='Postal Code' type='text' id='postal-code' />
                    <Input label='City' type='text' id='city' />
                </div>
                <p className="modal-actions">
                    <Button type='button' textOnly onClick={handleClose}>Close</Button>
                    <Button>Submit Order!</Button>
                </p>
            </form>
        </Modal>
    )
}