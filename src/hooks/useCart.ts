import {useState, useEffect,useMemo } from "react";
import { db } from "../data/db"
import type {Guitar,cartItem}   from '../Types/types'
 
 
 
 export const useCart = () =>  {   

const initialCart = ()  :  cartItem [] => {
    const localsTorageCart = localStorage.getItem("cart")
    return localsTorageCart ? JSON.parse(localsTorageCart) : []
  }
  
  
  const [data] = useState(db)
  const [cart, setCart] = useState (initialCart)
  
  const MAX_ITEM=10
  
  const MIN_ITEM= 1
    
  useEffect ( () =>{
  localStorage.setItem("cart", JSON.stringify(cart))
  
  }, [cart] )
  
  function addtoCart(item : Guitar){
    const itemExists=cart.findIndex(guitar => guitar.id === item.id)
    if(itemExists >=0){//existe en el carrito 
      if (cart[itemExists].quantity >= MAX_ITEM ) return
    const updateCart=[...cart]
    updateCart[itemExists].quantity++
    setCart(updateCart)
    } else{
      const newItem :cartItem ={...item,quantity: 1}
      setCart([...cart, newItem])
    }
   
  }
  
  function removeFromCart(id : Guitar ["id"]) {
    setCart (prevCart => prevCart.filter(guitar => guitar.id !== id ))
  }
  
  function increasequantity (id  : Guitar ["id"]){
  const updateCart = cart.map( item =>  {
  if(item.id === id &&item.quantity < MAX_ITEM   ) {
  
         return{
          ...item,
          quantity: item.quantity +1
         }
        
        }
       return item
        } )
        setCart(updateCart)
     }
  
     function descremenquantity (id  : Guitar ["id"]){
      const updateCart = cart.map( item =>  {
      if(item.id === id &&item.quantity > MIN_ITEM )    {
      
             return{
              ...item,
              quantity: item.quantity -1
             }
            
            }
           return item
            } )
            setCart(updateCart)
         }
      
  
  function clearCart (){
    setCart ([])
  }

   //state derivado 
   const isEmpty = useMemo( () => cart.length=== 0, [cart] ) 
   const carTotal = useMemo( () => cart.reduce( (total,item) => total + (item.quantity * item.price),0),[cart] )

  return {
       data,
       cart,
        addtoCart,
        removeFromCart,
        descremenquantity,
        increasequantity,
        clearCart,
        isEmpty,
        carTotal
  }
}