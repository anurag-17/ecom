import React from 'react'
import "./Home.css"
import "../Product/ProductDetails.css";
import img1 from '../images/carousal1.webp'
import img2 from '../images/carousal2.webp'
import img3 from '../images/carousal3.jpg'
import img4 from '../images/carousal4.webp'
import {CgMouse} from "react-icons/cg"
import {ProductCard} from "./ProductCard.js"
import { MetaData } from '../layout/MetaData'
import { clearErrors, getProduct } from '../../actions/productAction'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Loader } from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'
import {Link} from "react-router-dom"
import Carousel from "react-material-ui-carousel";
import images from './Homecarousal';



export const Home = (props) => {

const alert = useAlert()
const dispatch = useDispatch()
const {loading,error,products,productsCount} = useSelector(state=>state.products)
useEffect(()=>{
  if(error){
alert.error(error)
dispatch(clearErrors())
  }
  dispatch(getProduct())
},[dispatch,error,alert])

console.log(products)



  return (
    <>
{loading ? <Loader/>:

<>
<MetaData title = "E-commerce"/>
 <div className="banner"> 

 <div id="carouselExampleDark" className="carousel carousel-dark slide"  data-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
              </div>
            <div  className="carousel-inner">
                <div className="carousel-item active">
                  <Link to = "/products">
                    <img src={img1} className="d-block w-100" alt="..."/>
                  </Link>
                    <div className="carousel-caption d-none d-md-block">
                        
                    </div>
                </div>
                <div className="carousel-item">
                  <Link to = "/products" >
                    <img src={img2} className="d-block w-100" alt="..."/>
                  </Link>
                    <div className="carousel-caption d-none d-md-block">
                        
                    </div>
                </div>
                <div className="carousel-item">
                  <Link to = "/products">
                    <img src={img3} className="d-block w-100" alt="..."/>
                  </Link>
                    <div className="carousel-caption d-none d-md-block">
                        
                    </div>
                </div>
                <div className="carousel-item">
                  <Link to = "/products">
                    <img src={img4} className="d-block w-100" alt="..."/>
                  </Link>
                    <div className="carousel-caption d-none d-md-block">
                        
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
            data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
        data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
    </button>
  
</div>
  {/* <p>Welcome to Ecommerce</p>
    <h1>FIND AMAZING PRODUCTS BELOW</h1>
<a href="#container"><button>Scroll<CgMouse/></button></a> */}
</div>  



 
<h2 className='homeHeading'>Featured Products</h2>
<div className="container" id="container">

{
 
  products&&products.map((product)=>(
    <ProductCard key = {product._id} product ={product}/>
  ))

}

</div>
</>
}
</>
  )
}
