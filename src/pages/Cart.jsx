import CartCard from "../components/CartCard"
import { cartAtom } from "../atoms/cartAtom"
import { useRecoilValue } from "recoil";
import { useCookies } from "react-cookie";
import CheckoutCard from "../components/CheckoutCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const cartItems = useRecoilValue(cartAtom);

  const [cookies] = useCookies(["token"]);
  const token = cookies.token || null;

  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/')
    }
  },[token,navigate])

  //console.log(cartItems)
  return (
    <div className="container home-div">
      <h3 className="text-center">Cart</h3>
      <div className="row">
      <div className="col-lg-6">
      {
        cartItems.map((item)=>{
          return(
          <CartCard key={item.id} image={item.images[0]} title={item.title} price={item.price} />        
          )
        })
      }
      </div>
        
        <div className="col-lg-6">
        {
          cartItems.length!=0 && <CheckoutCard />
        }
        </div>
      </div>
      {
        cartItems.length==0 && <h4>Cart is Empty :{'('}</h4>
      }
      
    </div>
  )
}

export default Cart