import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from '../components/Title'
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { navigate,products, cartItems, currency,updateQuantity } = useContext(ShopContext);
  const [cartProduct, setCartProduct] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartProduct(tempData);
  }, [cartItems]);

  const delprod = (id) => {
    setCartProduct((prevCartProduct) =>
      prevCartProduct.map((item) =>
        item._id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div className="border-t pt-14" >
      <div className="text-2xl mb-3">
      <Title text1={'Your'} text2={'CART'} />
      </div>
      <div>
      {cartProduct.length > 0 ? (
        cartProduct.map((item, index) => {
          const cartproducts = products.find(
            (product) => product._id === item._id
          );
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={cartproducts.image[0]}
                  alt={cartproducts.name}
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {cartproducts.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {cartproducts.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e)=>e.target.value === '' || e.target.value ==='0'? null : updateQuantity(item._id,item.size,Number(e.target.value))}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                value={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item._id, item.size,0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="Delete"
              />
            </div>
          );
        })
      ) : (
        <p>Your cart is empty.</p>
      )}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal/>
        
        <div className="w-full text-end">
          <button onClick={()=>{navigate('/place-order')}} className="bg-black text-white text-sm my-8 px-8 py-3 ">Proceed to Checkout</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
