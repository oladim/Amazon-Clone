import React, {useEffect} from 'react'
import './Payment.css';
import { connect } from 'react-redux';
import Checkoutproduct from './Checkoutproduct';
import {Link, useHistory} from 'react-router-dom';
import {useState} from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from "react-currency-format";
import axios from './axios';
import { getBasketTotal } from "./rootReducer";
import { db } from './firebase';



function Payment(props) {
    
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing]= useState("");
    const history = useHistory();
    const {user, carts} = props;
    // console.log('carts are', carts);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState(true);
  
    useEffect(() =>{
        //generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () =>{
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(carts) * 100}` //?total is a params
            });
            setClientSecret(response.data.clientSecret)

        }
        getClientSecret();
    }, [carts])

    console.log('Secret is', clientSecret)
    // console.log('@', user)
   const handleSubmit = async (event) =>{
       //do all stripe stuff
    event.preventDefault();
if(!user){
    history.push('/login')
}
else
{

    setProcessing(true);

     const payload = await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
             card: elements.getElement(CardElement)
         }
     }).then(({ paymentIntent })=>{
        const buckets = carts.map((obj) => {return Object.assign({}, {
            id: obj.id, 
            title: obj.title,
             image: obj.image,
             price: obj.price,
             rating: obj.rating
        })});

        // const buckets = carts.map((obj) => {return Object.assign({}, {
        //   obj.item
        // })});
      
        // console.log('from carts', carts)
        // console.log('from buckets', buckets)
        
    const content = {
        carts: buckets,
        amount: paymentIntent.amount,
        created: paymentIntent.created
    };
        db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set(Object.assign({}, content))

         setSucceeded(true);
         setError(null);
         setProcessing(false);

         props.dispatch({
             type: 'EMPTY_CART'
         })

         history.replace('/orders'); //dont want users to come back to payment page
     }) //payment intent is payment confirmed destructured from response object
    }
   }
   
   const handleChange = event =>{
    //listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? error.error.message : "");
}
   
    return (
        <div className='payment'>
          <div className='payment__container'>
              <h1>
                    Checkout {<Link to="/checkout">({carts?.length} items)</Link>}
              </h1>
              <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>No 21 Afolabi Close</p>
                    <p>Oluwo Nla Basorun</p>
                </div>
              </div>
              <div className='payment__section'>
                <div className='payment__title'>
                <h3>Review items and delivery</h3>
                </div>
                <table>
                    <tbody>
                <div className='payment__items'>
                {carts.map(cartItem =>{
              return <Checkoutproduct 
            id={cartItem?.id}
            title={cartItem?.title}
            image={cartItem?.image}
            price={cartItem?.price}
            rating={cartItem?.rating}
            />
        })}
                </div>
                </tbody>
                </table>
            </div>
            <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        {/* stripe implementation */}
                        <form onSubmit={handleSubmit}>
                         <CardElement onChange={handleChange}/>
                         <div className="payment__priceContainer">
                         <CurrencyFormat
                            renderText={(value) => (
                            <>
                            <h3>Order Total: {value}</h3>
                            </>
                            )}
                            decimalScale={2}
                            value={getBasketTotal(carts)} // Part of the homework
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                            />
                            <button disabled={ disabled || processing || succeeded}>
                            <span>{processing? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                         </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
          </div>
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
        carts: reduxState.carts,
        user: reduxState.user
    }
}
export default connect(mapStateToProps)(Payment)
