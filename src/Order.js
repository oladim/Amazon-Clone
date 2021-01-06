import React from 'react';
import './Order.css';
import moment from 'moment';
import Checkoutproduct from './Checkoutproduct';
import CurrencyFormat from "react-currency-format";

function Order({order}) {
    // console.log(order);
    return (
        <div>
            <div className="order">
            <h2>Order</h2>
    <p>{moment.unix(order?.data.created).format("MMMM Do YYYY, h:mma")}</p>
        <p className="order__id">
    <small>{order?.id}</small>
        </p>
        
    {order.data.carts?.map(item=>{
    //    console.log('item is', item)
       
           return <Checkoutproduct 
        id={item?.id}
        title={item?.title}
        image={item?.image}
        price={item?.price}
        rating={item?.rating}
        hideButton
        />
       
        
    })}

                        <CurrencyFormat
                            renderText={(value) => (
                            <>
                            <h3 className="order__total">Order Total: {value}</h3>
                            </>
                            )}
                            decimalScale={2}
                            value={order?.data.amount / 100} // Part of the homework
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                            />
   </div>
        </div>
    )
}

export default Order
