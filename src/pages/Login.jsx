import { useState } from "react";
import { useCookies } from "react-cookie";
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const dummyUsername = "kminchelle";
  const dummyPassword = "0lelplR";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message,setMessage] = useState('')

  const navigate = useNavigate();


  const [,setCookie] = useCookies()

  const fillDummyData = () => {
    setUsername(dummyUsername);
    setPassword(dummyPassword);
  };

  const loginUser = async () => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      //console.log(data);
      if(data.token){
        const user={
            id:data.id,
            username:data.username,
            email:data.email,
            firstName:data.firstName,
            lastName:data.lastName,
            gender:data.gender,
            image:data.image
          }
          localStorage.setItem('userData',JSON.stringify(user))
          setCookie('token', data.token , { path: '/' });
          navigate('/home')
      }else{
        setMessage(data.message)
      }
      
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="home-div">
    {
        message && (
            <div className="alert alert-danger" role="alert">{message}</div>
        )
      }
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Login</h3>
            </div>
            <div className="card-body">
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
          onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
          onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button onClick={fillDummyData} type="submit" className="btn btn-success btn-block my-2 mx-2">
                  User dummy data
                </button>
                <button onClick={loginUser} type="submit" className="btn btn-primary btn-block my-2 mx-2">
                  Login
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>

        
      </div>
  );
};

export default Login;
