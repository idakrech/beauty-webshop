import CartItem from "../components/product-display/CartItem"
import { useShoppingCart } from "../hooks/useShoppingCart"
import Delivery from "../components/checkout/Delivery"
import PaymentMethods from "../components/checkout/PaymentMethods"
import { useState } from "react"

const CartPage = () => {
  const { cartProducts, handleDelete, handleDecrement, priceSum } = useShoppingCart()
  const [selectedRate, setSelectedRate] = useState<number>(0)
  const totalSum = selectedRate ? priceSum + selectedRate : priceSum

  return (
    <div>
      {cartProducts.length > 0 ? (
        <>
          {cartProducts.map(({ product, quantity }) => (
            <CartItem
              key={product.id}
              product={product}
              quantity={quantity}
              handleDelete={handleDelete}
              handleDecrement={handleDecrement}
            />
          ))}
          <Delivery setSelectedRate={setSelectedRate}/>
          <PaymentMethods totalSum={totalSum}/>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  )
}

export default CartPage
