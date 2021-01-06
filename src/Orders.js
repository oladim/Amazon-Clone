import React, {useState, useEffect} from 'react';

import { db } from './firebase';
import './Orders.css';
import { connect } from 'react-redux';
import Order from './Order';


function Orders(props) {
    const {user} = props;
    const [orders, setOrders] = useState();

    useEffect(()=>{
        if(user){
            db.collection('users').doc(user?.uid).collection('orders').orderBy('created', 'desc').onSnapshot(snapshot =>{
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )})
   }else {
       setOrders([])
   }
   
        }, [user])
       
    return (
        <div className='orders'>
            <h1>Your Orders</h1>
            <div className="orders__order">
                <table>
                    <tbody>
                        <div>
                {orders?.map((orderItem)=>{
                    // console.log(orderItem);
                    return <Order order={orderItem} />
                })}
                </div>
                </tbody>
                </table>
            </div>
        </div>
    )
}


function mapStateToProps(reduxState){
    return{
        carts: reduxState.carts,
        user: reduxState.user
    }
}
export default connect(mapStateToProps)(Orders)
