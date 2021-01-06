import React from 'react'
import './Product.css'
import {connect} from 'react-redux';
//import { ADD_TO_CART } from './actionCreators';
//import ProductItems from './ProductItems';
//import { addToCart } from './actionCreators';

class Product extends React.Component {
  // constructor(props){
  //   super(props);
    //this.handleAdd = this.handleAdd.bind(this);
   
  // }

  
   handleClick = () => {
    //debugger
    console.log(this.props)
    //console.log(this.props)

    this.props.dispatch({
      type: "ADD_TO_CART", item: this.props
   
    })
    //const {id, title, price, rating, image} = this.props;
    
    
  }
  render(){
    //console.log(this.props)
    const {id, title, price, rating, image} = this.props;
    //debugger
    return (

        <div className="product">
        <div className="product__info">
                <p>{title}</p>
            <p className="product__price">
                <small>$</small>
                <strong>{price}</strong>
            </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_,index) => (
              <p key={index}>*</p>
            ))}
        </div>
      </div>

              
     
      <img src={image} alt="" />
      <h6>In Stock - 0       MOQ - 10</h6> 
      <button onClick={this.handleClick}>Add to Basket</button>
     
        </div>
    )
}
}

function mapStateToProps(reduxState) {
  
 return {
     carts: reduxState.carts
 }
}
export default connect(mapStateToProps)(Product);
