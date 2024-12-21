import Modal from "./UI/Modal"
import CartContext from "../store/CartContext"
import { currencyFormatter } from "../util/currency"
import { useContext } from "react"
import Input from "./Input"
import Button from "./UI/Button"
import UserProgressContext from "../store/UserProgressContext"
import useHttp from "./hooks/useHttp"
import ErrorPage from "./ErrorPage"
import { useActionState } from "react"

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}
export default function Checkout() {
    const cartCtx = useContext(CartContext)
    const totPrice = cartCtx.items.reduce((total, item) => total + item.quantity * item.price, 0)
    const userProgressCtx = useContext(UserProgressContext)

    const { data, error, sendRequest,clearData } = useHttp('http://localhost:3000/orders', requestConfig)

    
    function handleClose() {
        userProgressCtx.hideCheckout()
    }
    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart()
        clearData()
    }
    async function checkoutAction(prevState,fd) {
        

        const customerData = Object.fromEntries(fd.entries())

        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData,
                }
            }))
        

    }
    const [formState, formAction,isSending] = useActionState(checkoutAction, null)
    let action = (
        <>
            <Button type='button' textOnly onClick={handleClose}>Close</Button>
            <Button>Submit Order!</Button>
        </>
    )
    if (isSending) {
        action = <span>Sending order data...</span>
    }
    if (data && !error) {
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p>We will contact you with the details soon!</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        )
    }
    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form action={formAction}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(totPrice)}</p>

                <Input label='Full Name' type='text' id='name' />
                <Input label='E-mail Adress' type='email' id='email' />
                <Input label='Street Adress' type='text' id='street' />
                <div className="control-row">
                    <Input label='Postal Code' type='text' id='postal-code' />
                    <Input label='City' type='text' id='city' />
                </div>
                {error && <ErrorPage title='Failed to submit order' message={error} />}
                <p className="modal-actions">{action}</p>
            </form>
        </Modal>
    )
}