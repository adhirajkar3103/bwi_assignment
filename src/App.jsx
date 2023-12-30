import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

import { useRecoilValue } from "recoil";
import { cartAtom } from "./atoms/cartAtom";

import "./App.css";

const App = () => {
  const [, setCookie] = useCookies();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token || null;

  const userData = JSON.parse(localStorage.getItem("userData"));

  const cartItems = useRecoilValue(cartAtom);

  const logout = () => {
    setCookie("token", null, { path: "/" });
    localStorage.removeItem("userData");
  };
  return (
    <div>
      <Router>
        <nav
          style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
          className="navbar navbar-expand-lg bg-body-tertiary fixed-top"
        >
          <div className="container-fluid">
            <Link className="navbar-brand" to="#">
              Hey {userData?.firstName}!
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
                {!token && (
                  <Link className="nav-link" to="/">
                    Login
                  </Link>
                )}
                {token && (
                  <div className="cart-container">
                    <Link className="nav-link cart-link" to="/cart">
                      <span>Cart</span>
                      <span className="cart-count">{cartItems.length}</span>
                    </Link>
                  </div>
                )}

                {token && (
                  <button className="btn btn-danger mx-3" onClick={logout}>
                    Log Out
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
