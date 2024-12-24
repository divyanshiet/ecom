import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const navigate =useNavigate();
  const addToCart = async (itemId, size) => {
   if(!size)
   {
      toast.error('Select Product Size');
      return;
   }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    }
    else
    {
      cartData[itemId]={};
      cartData[itemId][size]=1;
    }
    setCartItems(cartData);
  };
 useEffect(()=>{
 },[cartItems]);

 const updateQuantity = async (itemId,size,quantity)=>{
  let cartData = structuredClone(cartItems);
  cartData[itemId][size]= quantity;
  setCartItems(cartData);
 }
 const getCartAmount = () =>{
  let totalAmount =0;
  for(let item in cartItems)
  {
    let itemInfo = products.find((product)=> product._id === item);
    for(const items in cartItems[item])
    {
      try{
        if(cartItems[item][items]>0)
        {
          totalAmount += itemInfo.price * cartItems[item][items];
        }
      }
      catch(error){}
    }
  }
  return totalAmount;
 }
 const cartCount = () =>{
   let totalcount =0;
   for(const items in cartItems)
   {
      for(const item in cartItems[items])
      {
         try{
            if(cartItems[items][item]>0)
            {
               totalcount += cartItems[items][item];
            }
         }catch(error){};
      }
   }
   return totalcount;
 }
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    showSearch,
    setSearch,
    setShowSearch,
    cartItems,addToCart,cartCount,updateQuantity,getCartAmount, navigate
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
