
import React from 'react'
import "./Header.css"
import {Link} from "react-router-dom"
import ShoppingCart from '@material-ui/icons/ShoppingCart'

export const Header = () => {



  return (
<>

<div id="navbar">
  <Link to="/">Home</Link>
  <Link to="/contact">Contact</Link>
  <Link to="/products">Products</Link>
  <Link to="/login">Login</Link>
  <Link to="/cart"><ShoppingCart style = {{color:'chocolate',fontSize:'40px'}}/></Link>
</div>
</>
  )
}
