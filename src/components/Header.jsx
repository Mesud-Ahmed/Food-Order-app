import { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'

import UserProgressContext from '../store/UserProgressContext'
export default function Header() {
    const cartCtx = useContext(CartContext)

    const userProgressCtx = useContext(UserProgressContext)
    const totalCartItems = cartCtx.items.reduce((total, currItem) => {
        return total + currItem.quantity
    }, 0)

    function handleShowCart(){
        userProgressCtx.showCart()
    }
    return (
        <>
       
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="logo image" />
                <h1>React food</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart({totalCartItems})</Button>
            </nav>
            
        </header>
        <main>
            <p>
                Delicious meals, quick service, and an experience to remember. 
                Browse our menu, customize your order, and enjoy fresh food delivered straight to your door!
            </p>
        </main>
         
        </>
    )
}
