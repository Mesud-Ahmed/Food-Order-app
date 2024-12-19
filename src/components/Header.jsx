import { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'

export default function Header(){
    const cartCtx = useContext(CartContext)
    const totalCartItems = cartCtx.items.reduce((total,currItem)=>{
        return total + currItem.quantity
    },0)
    return(
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="logo image" />
                <h1>React food</h1>
            </div>
            <nav>
                <Button textOnly>Cart({totalCartItems})</Button>
            </nav>
        </header>
    )
}
