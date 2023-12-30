import { useRecoilValue } from "recoil"
import { cartAtom } from "../atoms/cartAtom"

const CheckoutCard = () => {
  const cartItems = useRecoilValue(cartAtom);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="card text-center mb-3 mx-auto" style={{width: '20rem',paddingLeft:'auto',paddingRight:'auto'}}>
  <div className="card-body">
    <h5 className="card-title">Total amount and Checkout</h5>
    <p className="card-text">Total {cartItems.length} items</p>
    <p className="card-text">Total Amount : $ {totalPrice}</p>
    <p className="card-text">Delivery charges : $ 20</p>
    <p className="card-text">Final Amount : $ {totalPrice+20}</p>
    <a href="#" className="btn btn-primary">Checkout</a>
  </div>
</div>
  )
}

export default CheckoutCard