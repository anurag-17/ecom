import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Search.css"
export const Search = () => {
  const navigate = useNavigate()
  const[keyword,setKeyword] = useState("")

  const searchSubmitHandler = (e)=>{
    e.preventDefault();

    navigate(`/products/${keyword}`)
    // if(keyword.trim()){
    //   navigate(`/products/${keyword}`)
    // }else{
    //   navigate("/products")
    // }
  }
  return (
   <form onSubmit={searchSubmitHandler} action="" className="searchBox">
<input type="text" placeholder='Search' id="" onChange={(e)=>setKeyword(e.target.value)} />
<input type="submit" value="Search" />
   </form>
  )
}

