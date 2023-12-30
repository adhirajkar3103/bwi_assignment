import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {useSetRecoilState} from 'recoil'
import { cartAtom } from "../atoms/cartAtom";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [product_list, setProduct_list] = useState([]);
  const [sliderValue, setSliderValue] = useState(2000);

  const [cookies] = useCookies(["token"]);
  const token = cookies.token || null;

  const navigate = useNavigate();

  const setCartState = useSetRecoilState(cartAtom)

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    fetchProducts();
  }, [navigate, token]);


  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      //console.log(data);
      setProducts(data.products);
      setProduct_list(data.products);
      console.log(data.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const searchProductHandler = (productName) => {
    setSearchProduct(productName);
    const filteredProducts = product_list.filter((product) =>
      product.title.toLowerCase().includes(productName.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
    const filteredProducts = product_list.filter((product)=>{
      return product.price < sliderValue;
    })
    setProducts(filteredProducts);
  };

  const addToCart = (prod_id) =>{
    const prodObj = product_list.filter((prod)=>prod.id===prod_id)
    setCartState((oldObj)=>[...prodObj,...oldObj])
  }

  
  return (
    <div className="container home-div">
      <h2 className="text-center">Home Page</h2>

      <div className="my-2">
        <input
          value={searchProduct}
          onChange={(e) => searchProductHandler(e.target.value)}
          className="form-control me-2"
          type="search"
          placeholder="Search items here..."
          aria-label="Search"
        />
      </div>

      <div className="w-50" style={{borderColor:'grey',borderWidth:'1px',borderStyle:'solid',padding:'1rem',borderRadius:'1rem'}}>
      <h6>Select price range</h6>
      <input
      className="form-range"
        type="range"
        min="0"
        max="5000"
        value={sliderValue}
        onChange={handleSliderChange}
      />
      <p>Showing products under ${sliderValue}</p>
      </div>

      <div className="row">
        {products.map((product) => {
          return (
            <div key={product.id} className="col-lg-4 my-4">
              <div
                className="card"
                style={{ width: "18rem", minHeight: "30rem" }}
              >
                <img
                  src={product.images[0]}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: "15rem", width: "18rem" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p>${product.price}</p>
                  <button onClick={()=>addToCart(product.id)} className="btn btn-primary">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
