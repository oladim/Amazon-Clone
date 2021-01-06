import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
// import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./rootReducer";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

function Subtotal(props) {
  const history = useHistory();
  // const [{ basket }, dispatch] = useStateValue();
  
  const carts = props.carts;
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>

                                    <tr>
                                    <th>Subtotal ({carts?.length} items) </th>
                                    <td className="product-subtotal"><strong>{value}</strong></td>
                                </tr>
                                <tr>
                                    <th>Shipping</th>
                                    <td className="freeshipping">Free Shipping</td>
                                </tr>
                                <tr>
                                    <th>Subtotal ({carts?.length} items)</th>
                                    <td className="product-subtotal"><strong>{value}</strong></td>
                                </tr>


            {/* <p> */}
              {/* Part of the homework */}
              {/* Subtotal ({carts?.length} items): <strong>{value}</strong> */}
            {/* </p> */}
            {/* <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small> */}
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(carts)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      {/* <div> */}
                        {/* <h4>Payment</h4> */}

                         {/* <div className="payment_option">
                            <div className="custome-radio">
                                <input className="form-check-input" required="" type="radio" name="payment_option" id="exampleRadios3" value="option3" checked="" />
                                <label className="form-check-label" for="exampleRadios3">Direct Bank Transfer</label>
                                <p data-method="option3" className="payment-text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration. </p>
                            </div>
                            <div className="custome-radio">
                                <input className="form-check-input" type="radio" name="payment_option" id="exampleRadios4" value="option4" />
                                <label className="form-check-label" for="exampleRadios4">Check Payment</label>
                                <p data-method="option4" className="payment-text">Please send your cheque to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                            </div>
                            <div className="custome-radio">
                                <input className="form-check-input" type="radio" name="payment_option" id="exampleRadios5" value="option5" />
                                <label className="form-check-label" for="exampleRadios5">Paypal</label>
                                <p data-method="option5" className="payment-text">Pay via PayPal; you can pay with your credit card if you don't have a PayPal account.</p>
                            </div>
                        </div> */}
                  
             {/* </div> */}
      <button onClick={e => history.push('/payment')}>Proceed to Checkout</button>
    </div>
  );
}

function mapStateToProps(reduxState){
  return {
    carts: reduxState.carts,
    user: reduxState.user
  }
}

export default connect(mapStateToProps)(Subtotal);