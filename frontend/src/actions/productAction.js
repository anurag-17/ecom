import axios from "axios"
import {All_PRODUCT_SUCCESS,
    All_PRODUCT_FAIL,
    All_PRODUCT_REQUEST, 
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS,  
} from "../constants/productConstants"



export const getProduct  =(keyword="",price= [0,25000],category,ratings = 0)=>async(dispatch)=>{

    try{
        
      await dispatch({  type:All_PRODUCT_REQUEST})

let link = `/api/v1/products?keyword = ${keyword}&page=${2}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte] = ${ratings}`

if(category){
    link = `/api/v1/products?keyword =${keyword}&price[gte]=${price[0]}&page=${2}&price[lte]=${price[1]}&category=${category}&ratings[gte] = ${ratings}`
}

        console.log(keyword)
        const {data} = await axios.get(link)
        console.log(data)
        dispatch({
            type:All_PRODUCT_SUCCESS,
            payload:data,
        })
    }catch(error){
        dispatch( {
            type:All_PRODUCT_FAIL,
            payload:error.response.data.message,
            
        })
    }
}
export const getProductDetails  =(id)=>async(dispatch)=>{


    try{

        dispatch({  type:PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/v1/products/${id}`)
      
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.products,
        })
    }catch(error){
        dispatch( {
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message,
            
        })
    }
}

export const clearErrors=()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}
