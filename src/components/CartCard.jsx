
// eslint-disable-next-line react/prop-types
const CartCard = ({image,title,price}) => {
  return (
    <div className="card mb-3" style={{maxWidth: '540px'}}>
  <div className="row g-0">
    <div className="col-md-4">
      <img src={image} className="img-fluid rounded-start" alt="..." />
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h5 className="card-title">$ {price}</h5>
      </div>
    </div>
  </div>
</div>
  )
}

export default CartCard