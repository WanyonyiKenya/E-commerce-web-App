import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom"
import Home from "./scenes/home/Home"
import ItemDetail from "./scenes/itemdetail/ItemDetail"
import Checkout from "./scenes/checkout/Checkout"
import Confirmation from "./scenes/checkout/Confirmation"
import Nav from "./scenes/global/Nav";
import CartMenu from "./scenes/global/CartMenu";
import Footer from "./scenes/home/Footer";


const TopScroll = () => {
  const {pathname} = useLocation()

  useEffect(()=>{
    window.scroll(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <div className="app">
     <BrowserRouter>
     <Nav />
      <TopScroll/>
      <Routes>
        <Route path="/" element= {<Home/>}/>
        <Route path="/item/:itemId" element= {<ItemDetail/>}/>
        <Route path="checkout" element= {<Checkout/>}/>
        <Route path="checkout/success" element= {<Confirmation/>}/>
      </Routes>
      <CartMenu />
      <Footer />
     </BrowserRouter>
    </div>
  );
}

export default App;
