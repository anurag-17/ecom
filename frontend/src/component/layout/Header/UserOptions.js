import React,{useState} from 'react'
import "./Header.css"
import {SpeedDial,SpeedDialAction} from "@material-ui/lab"
import Backdrop from "@material-ui/core/Backdrop"
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import {useNavigate} from "react-router-dom"
import {useAlert} from "react-alert"
import {logout} from "../../../actions/userAction"
import {useDispatch, useSelector} from "react-redux"

export const UserOptions = ({user}) => {

  const {cartItems} = useSelector((state)=>state.cart)
    const[open,setOpen] = useState()
    const navigate= useNavigate()
    const alert = useAlert()
    const dispatch = useDispatch()

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {icon:<ShoppingCart style = {{color:cartItems.length>0?"greenf":"unset"}}/> ,name:`Cart(${cartItems.length})`,func:cart},
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
      ];

      if(user.role  === "admin"){
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
          });
      }

      function dashboard() {
        navigate("/admin/dashboard");
      }
    
      function orders() {
        navigate("/orders");
      }
      function account() {
        navigate("/account");
      }
      function cart() {
        navigate("/cart");
      }
    
      function logoutUser() {
        dispatch(logout())
        alert.success("Logout Successfully");
      }
    
      const handleClose = () => setOpen(false);  
      const handleOpen = () => setOpen(true);

  return (
<>
<Backdrop open = {open} style = {{zIndex:"10"}}/>
<SpeedDial
className  = "speedDial"
ariaLabel="SpeedDial controlled open example"
onClose={handleClose}
onOpen={handleOpen}
open ={open}
style = {{zIndex:"11"}}
direction = "down"
icon={
  <img
    className="speedDialIcon"
    src={"/Profile.png"}
    alt="Profile"
  />
}
>



{options.map((item,index)=>(
    <SpeedDialAction
 
     icon = {item.icon} 
    tooltipTitle={item.name} 
    onClick = {item.func}
    open = {true}
    tooltipOpen = {window.innerWidth<=600?true:false}
    key = {index}
    />

))}

</SpeedDial>

</>
  )
}
