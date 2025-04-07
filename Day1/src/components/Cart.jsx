import { useState } from 'react'
import CartItem from './CartItem'


function Cart(props) {

  const { items, HandleClicksub, HandleClickplus, HandleClickdel, HandleReset } = props

  return (
    <>
      <div className=' flex flex-col items-center justify-center min-h-screen bg-white text-center'>
        <div className="w-full max-w-100 p-4">
          {items.map(
            item =>
              <CartItem
                key={item.id}
                name={item.name}
                id={item.id}
                count={item.count}
                HandleClickplus={HandleClickplus}
                HandleClicksub={HandleClicksub}
                HandleClickdel={HandleClickdel} />
          )}
          <button className='bg-blue-500 text-2xl rounded-md p-1.5 text-white btn' onClick={HandleReset}>Reset</button>

        </div>
      </div>
    </>

  )

}

export default Cart
