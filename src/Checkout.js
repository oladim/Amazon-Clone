import React from 'react';
import './Checkout.css';
import {connect} from 'react-redux';
import Billing from './Billing';
import Checkoutproduct from './Checkoutproduct';
import Login from './Login';
import Subtotal from './Subtotal';
// import FlipMove from 'react-flip-move';
// import QueueAnim from 'rc-queue-anim';

class Checkout extends React.Component {
    // constructor(){
    //     super();
    // }
//    placeOrder = (e) =>{
//         e.preventDefault();
//     }
  
  
// placeOrder = (e) => {
//     e.preventDefault();
// }

    render(){

        const {carts} = this.props;
     
        
      
       // console.log(allItems);

      
 
    

    const styles = {textAlign: 'center', paddingTop: '30px', marginBottom: '-40px'};

  
     
    
    return (
          
<div>
<div> <h1 style={styles}>Checkout</h1></div> 
      
    


<div className="main_content">


                {/* <div>
            		<h4>Billing Details</h4>
                    <Billing />
                </div> */}
            
            <div>
                  <div className="ordersItem">
                      
                        <h4 className="your__orders">Your Orders</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="product__margin">Total </th>
                                    <th> </th>
                                    <th ></th>
                                    
                                    {/* <th>Total</th> */}
                                </tr>
                            </thead>
                            <tbody>
                        {carts.map(itemArray=>{
                            return <Checkoutproduct 
                            image={itemArray.image} 
                            title={itemArray.title} 
                            price={itemArray.price} 
                            id={itemArray.id} />
                        })}
                            </tbody>
                            
                           
                           
                        </table>
                        <Subtotal />

                </div>
                      

                     
        </div>
    </div>

    {/* <div className="section bg_default small_pt small_pb">
                        <div className="container">	
                            <div className="row align-items-center">	
                                <div className="col-md-6">
                                    <div className="heading_s1 mb-md-0 heading_light">
                                        <h3>Subscribe Our Newsletter</h3>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="newsletter_form">
                                        <form>
                                            <input type="text" required="" className="form-control rounded-0" placeholder="Enter Email Address" />
                                            <button type="submit" className="btn btn-dark rounded-0" name="submit" value="Submit">Subscribe</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
</div>
                       
                       
                        


            










    )
    }
}

function mapStateToProps(reduxState) {
    return {
        carts: reduxState.carts,
        user: reduxState.user
    }
   }

export default connect(mapStateToProps)(Checkout);
