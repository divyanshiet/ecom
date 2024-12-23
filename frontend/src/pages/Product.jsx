import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Reviews from '../components/Reviews';
import RelatedProducts from '../components/RelatedProducts';
import Title from '../components/Title';

const Product = () => {
  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const[productdata, setProductdata] = useState(false);
  const [image,setImage] = useState('');
  const [size,setSize] = useState('');
  const [activedesc,setActivedesc] = useState(true);

  const fetchdata = async()=>{
    products.map((item)=>{
         if(item._id==productId)
         {
          setProductdata(item);
          setImage(item.image[0]);
         }
    })
  }
  useEffect(()=>{
    fetchdata();
  },[productId])
  return productdata ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
        <div className="flex sm:flex-col overflow-x-auto sm: overflow-y-auto justify-between sm:justify-normal">
          {
            productdata.image.map((item,index)=>(
              <img onClick={()=>{setImage(item)}} src={item} key={index} className='w-[24% sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'/>
            ))
          }
        </div>
        <div className="w-full sm:w-[80%]">
          <img className='w-full h-96' src={image} alt=""/>
        </div>
        </div>
        {/* Product info */}
        <div className="flex-1">
          <h1 className='font-medium text-2xl mt-2'>{productdata.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className='w-3 5'/>
            <img src={assets.star_icon} className='w-3 5'/>
            <img src={assets.star_icon} className='w-3 5'/>
            <img src={assets.star_icon} className='w-3 5'/>
            <img src={assets.star_dull_icon} className='w-3 5'/>
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productdata.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productdata.description}</p>
          <div className="flex flex-col gap-4 my-8">
             <p>Select size</p>
             <div className="flex gap-2">
              {
                productdata.sizes.map((item,index)=>(
                  <button onClick={()=>{setSize(item)}} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : '' } `} key={index} >{item}</button>
                ))
              }
             </div>
          </div>
          <button onClick={()=>addToCart(productdata._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 '>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'></hr>
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product</p>
            <p>Cash on delivery available</p>
            <p>Easy return and exchange policy</p>
          </div>
        </div>
      </div>
        <div className="mt-20">
        <div className="flex">
          <b onClick={()=>setActivedesc(true)} className={`border px-5 py-3 text-sm ${activedesc ? "bg-black text-white" :" " }`}>Description</b>
          <p onClick={()=>setActivedesc(false)} className={`border px-5 py-3 text-sm ${activedesc ? "" :"bg-black text-white" }`}>Reviews (69)</p>
        </div>
        {activedesc ? 
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 ">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas odit nisi ratione ipsa pariatur laudantium est modi quos blanditiis doloremque tempore omnis, aspernatur maiores atque asperiores necessitatibus repellendus, incidunt itaque.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum suscipit numquam libero commodi, ipsam nesciunt odio, impedit quasi et explicabo veniam? Modi</p>
        </div>
      : <Reviews/>
      }
      </div> 
      
      <div className="text-center text-3xl py-2 mt-14 mb-5">
      <Title text1={"RELATED"} text2={"PRODUCTS"} ></Title>
      </div>
      <RelatedProducts category={productdata.category} subCategory={productdata.subCategory} />
    </div>
    
  ): <div className="opacity-0"></div>
}

export default Product
