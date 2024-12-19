import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import { userProgressContextProvider } from "./store/UserProgressContext";
import Cart from "./components/Cart";
function App() {
  return (
    <userProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart/>
      </CartContextProvider>
    </userProgressContextProvider>
  );
}

export default App;
