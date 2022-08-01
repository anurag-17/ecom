import './App.css';
import {useState,useEffect} from "react"
import {Header} from './component/layout/Header/Header.js'
import {BrowserRouter,Route,Routes,Outlet, useLocation} from "react-router-dom"
import webfont from "webfontloader"
import React from 'react';
import { Footer } from './component/layout/footer/Footer';
import {Home} from "./component/Home/Home.js"
import {ProductDetails} from "./component/Product/ProductDetails.js"
import {Products} from "./component/Product/Products.js"
import {Search} from "./component/Product/Search.js"
import { Login } from './component/User/Login';
import store from "./store"
import {UserOptions} from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import { loadUser } from './actions/userAction';
import {Cart} from "./component/Cart/Cart"
import {Shipping} from "./component/Cart/Shipping"
import { ConfirmOrder } from './component/Cart/ConfirmOrder';
import {Profile} from "./component/User/Profile"
import {ProtectedRoute} from "./component/Route/ProtectedRoute"
import {UpdateProfile } from "./component/User/UpdateProfile"
import axios from "axios"
import { Payment } from './component/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
function App() {


const { isAuthenticated,user} = useSelector(state =>state.user)

const [stripeApiKey,setStripeApiKey]  = useState("")

async function getStripeApiKey(){

  const {data} = await axios.get("/api/v1/stripeapikey")
  setStripeApiKey(data.stripeApikey);
}

useEffect(()=>{
    webfont.load({
      google:{
        families:["Roboto","Droid Sans",""]
      }
    });
    store.dispatch(loadUser());
    console.log(user)

  },[])
  
  return (
    <>
  <BrowserRouter>
    <Header/>

    {isAuthenticated&&<UserOptions user ={user}/>}
    <Routes>
    <Route exact path  = "/" element={<Home/>} />
    <Route exact path  = "/product/:id" element={<ProductDetails/>} />
    <Route exact path  = "/products" element={<Products/>} />
    <Route  path  = "/products/:keyword" element={<Products/>} />
    <Route exact path  = "/search" element={<Search/>} />
    <Route exact path  = "/login" element={<Login/>} />    
    <Route exact path  = "/cart" element={<Cart/>} />   
    <Route exact path = "/login/shipping" element = {<Shipping/>}/> 
    <Route exact path="/order/confirm" element  = {<ConfirmOrder/>} />
    {/* <Route path="/account" element  = {<ProtectedRoute><Route><Profile /></Route></ProtectedRoute>} / */}
    <Route path="/account" element  = {<Profile />} />
    {/* <Route path="/me/update" element  = {<UpdateProfile />} /> */}
<Route exact path="/process/payment" element  = { <Payment/>} />
    </Routes>

   <Routes>

   </Routes>
  </BrowserRouter>
<Footer/>

    </>
  );
}





export default App;
