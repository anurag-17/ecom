import {combineReducers,applyMiddleware, createStore} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { productDetailsReducer, productReducer } from "./reducers/productReducer"
import { profileReducer, userReducer } from "./reducers/userReducer"
import { cartReducer } from "./reducers/cartReducer"


const reducer = combineReducers({

    products:productReducer,
    productDetails:productDetailsReducer,
      user:userReducer,
      cart:cartReducer,
      profile:profileReducer,
  
})

let initialState = {

  cart:{
    cartItems:localStorage.getItem("cartItems")
    ?JSON.parse(localStorage.getItem("cartItems"))
    :[],
    shippingInfo:localStorage.getItem("shippingInfo")
    ?JSON.parse(localStorage.getItem("shippingInfo"))
    :{},
  },
  user:{
    userdetails:localStorage.getItem("comuser")?JSON.parse(localStorage.getItem("comuser")):{}
  }

  
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  export default store
