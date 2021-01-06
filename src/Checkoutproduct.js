import React from 'react'
import './Checkoutproduct.css'
import {connect} from 'react-redux'

class Checkoutproduct extends React.Component {
    
    // debugger
     removeFromCart = () => {
        //console.log(this.props.carts)
        this.props.dispatch({
            type: "REMOVE_FROM_CART",
            id: this.props.id
            
        })
      
    }
    render(){
        const {image, title, price, id, hideButton} = this.props;
    return (
       
      
          
              

                            <tr className="checkout">
                                <td className="mymargin"> <img src={image} alt="" /></td>
                                <td className="middle"> {title} <span className="product-qty">x 1</span>
                               
                                    {!hideButton && (
                                     <span>
                                    <button onClick={this.removeFromCart}>Remove</button>
                                    </span>)
                                } 
                                    </td>
                                <td className="price__margin">${price}
                                </td>
                            </tr>
                           
                               
                           
                           
                    
                
                

     
    )
}
}

function mapStateToProps(reduxState) {
   
    return {
        carts: reduxState.carts
    }
    debugger
   }
   export default connect(mapStateToProps)(Checkoutproduct);
