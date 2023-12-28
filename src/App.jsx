import { createContext, useEffect, useState } from "react";
import LoginComponent from "./LoginComponent";
import Home from "./Home";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

export const AuthContext = createContext();

const App = () => {
  const [token, setToken] = useState(null);
  const PrivateRoute = () => {
    return token ? <Home/> : <Navigate to="/login" />;
  };

  const CheckAuth = () => {
    return !token ? <LoginComponent/> : <Navigate to="/" />;
  };

  useEffect(()=>{
    const storedToken = localStorage.getItem('token')
    if(storedToken){
      setToken(storedToken)
      // window.location.href = "/"
    }
  }, [])

  

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      ),
    },
    {
      path: "login",
      element: (
        <CheckAuth>
          <LoginComponent />
        </CheckAuth>
      ),
    },
  ]);


  return (
    <AuthContext.Provider value={ {token:token, setToken:setToken}}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
