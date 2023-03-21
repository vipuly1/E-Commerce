import React ,{createContext, useState, useEffect, useContext}from 'react'
import { Toast } from 'react-hot-toast'

export const Context = createContext(0)

const StateContext = ({children}) => {
    const [qty, setQty] = useState(1)
    const [cartItems, setCartItems] = useState()
    const [totalQuantities, setTotalQuantities] = useState()
    const [showCart, setShowCart] = useState(false)

    const quantity = (input) =>{
        setQty((prev) => prev + input)
    }

  return (
    <Context.Provider value={{
        quantity,
        qty, 
        cartItems,
        totalQuantities,
        showCart
    }}>
        {children}
    </Context.Provider>
  )
}

export default StateContext
