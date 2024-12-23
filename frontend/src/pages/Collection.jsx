import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, showSearch ,search } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory,setsubCategory] = useState([]);

  const toggleCategory = (e) =>{
    if(category.includes(e.target.value)) // checks if selected category is already selected previously or not
    {
      setCategory(prev=>prev.filter(item => item !== e.target.value )) // if yes then uncheck that box and remove all the items belong to that category
    }
    else{
      setCategory(prev=>[...prev,e.target.value]) // if no add this to category array
    }
  }
  const togglesubCategory = (e) =>{
    if(subCategory.includes(e.target.value)) // checks if selected category is already selected previously or not
    {
      setsubCategory(prev=>prev.filter(item => item !== e.target.value )) // if yes then uncheck that box and remove all the items belong to that category
    }
    else{
      setsubCategory(prev=>[...prev,e.target.value]) // if no add this to category array
    }
  }
  const applyFilter = (sortOption = null) => {
    let productsCopy = [...products];

    if(showSearch && search)
    {
      productsCopy = productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    if (sortOption) {
      if (sortOption === "high") {
        productsCopy.sort((a, b) => b.price - a.price);
      } else if (sortOption === "low") {
        productsCopy.sort((a, b) => a.price - b.price);
      }
    }

    setFilterProducts(productsCopy);
  };
  useEffect(()=>{
    setFilterProducts(products)
  },[]);
  useEffect(()=>{
    applyFilter();
    
  },[category,subCategory,search, showSearch]);
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
     
      {/* Filter Options */}
      <div className="min-w-60">
        <p onClick={()=>{setShowFilter(!showFilter)}} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : '' }`} src={assets.dropdown_icon} />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Men"} onChange={toggleCategory} /> Men
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Women"} onChange={toggleCategory}  /> Women
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Kids"} onChange={toggleCategory}  /> kids
            </p>
          </div>
        </div>
        {/* Subcategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Topwear"} onChange={togglesubCategory} /> Topwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Bottomwear"} onChange={togglesubCategory} /> Bottomwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Winterwear"} onChange={togglesubCategory} /> Winterwear
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4 ">
          <Title text1={'All'} text2={'COLLLECTIONS'} />
          <select className="border-2 border-gray-300 text-sm px-2" onChange={(e) => applyFilter(e.target.value)}>
            <option value='relevant'>Sort by: Relevant</option>
            <option value='low'>Sort by: Low to high</option>
            <option value='high'>Sort by: High to low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
         {
          filterProducts.map((item,index)=>(
           <ProductItem key={index}  name={item.name} id = {item._id} price={item.price} image={item.image}
           />
          ))
         }
        </div>
      </div>
    </div>
  );
};

export default Collection;
