import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearErrors, getProduct } from '../../actions/productAction'
import { ProductCard } from '../Home/ProductCard'
import { Loader } from '../layout/Loader/Loader'
import "./Products.css"
import Pagination from "react-js-pagination"
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
// import Slider from '@mui/material/Slider';






const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];
export const Products = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0)
    const params  = useParams()
    const dispatch = useDispatch()
    
    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)
    }

    const priceHandler = (event,newPrice)=>{

        setPrice(newPrice)

    }
    const {loading,products, productsCount,error,resultPerPage,}  = useSelector(
        (state)=>state.products)
        
        const keyword = params.keyword
        console.log(keyword)
        
        useEffect(()=>{
            console.log(category)
            dispatch(getProduct(params.keyword,price,category,ratings))
        },[dispatch,keyword,price,category,ratings])
        
        // let count = filteredProductsCount
  return (
   <>
   {
    loading?<Loader/>:
    <>
<h2 className="productsHeading">
  Products  
</h2>
    

    <div className="products">

   {
 
   products&&products.map((product)=>(
            <ProductCard key = {product._id} product = {product}/>
  
))

   }
    </div>

<div className="filterBox">
<Typography>Price</Typography>
{/* <Slider value = {price}
        onChange = {priceHandler}
         valueLabelDisplay = "auto"
         aria-label="Small steps"
         marks
         min = {0}
         max = {80000}
/> */}
<Slider
  value={price}
  min={0}
  step={1}
  max={80000}
  onChange={priceHandler}
  valueLabelDisplay="auto"
  aria-labelledby="non-linear-slider"
/>


<Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

         <fieldset>
            <Typography component = "legend">Ratings Above</Typography>

           <Slider 
           aria-labelledby="continuos-slider"
           value={ratings} 
           onChange = {(e,newRating)=>{ setRatings(newRating)}}
           min = {0}
           max = {5}
           valueLabelDisplay = "auto"
           />

             
         </fieldset>

</div>


{
    resultPerPage<productsCount &&
    <div className="paginationBox">
        <Pagination activePage={currentPage}
                     total ={2}
                    itemsCountPerPage = {resultPerPage} 
                    totalItemsCount ={productsCount}
                    onChange = {setCurrentPageNo}
                    nextPageText = "Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
        
        />

    </div>
}
    
    
    </>
   }
   </>
  )
}
