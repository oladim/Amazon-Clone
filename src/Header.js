import React from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { auth } from './firebase';
import MenuIcon from '@material-ui/icons/Menu';


class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {open: false}
    }


    handleBurger = () =>{
        this.setState({open: !this.state.open});
        // this.refs.header__nav.className = "header__nav";
        // this.refs.header__nav.className = this.refs.header__nav.className += " responsive";
        
        // console.log(setout(), noClick());
        
        this.refs.header__nav.className === "header__nav" ?   this.refs.header__nav.className = this.refs.header__nav.className += " responsive" : this.refs.header__nav.className = "header__nav"
    }

    handleAuthentication = () =>{

        if(this.props.user){
            // console.log(this.props.user)
            auth.signOut()
        }
    }


    render(){
        const user = this.props.user;
        // const [open, setOpen] = useState(false)
        // console.log(user);
    return (
  
        <div className="header">
            <Link to="/">
            <img src='eeman.png' className="header__logo" alt=""/>   
            </Link>
            <div className="header__search">
                <input className="header__input" type="text" />
                <SearchIcon className="header__searchIcon"/>
            </div>
            
    <div className="header__nav" ref="header__nav">
    <Link to="/checkout">
            <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionItemInternal header__basketCount">
              {this.props.carts.length}
            </span>
          </div>
          </Link>
           
            <Link className="hamburgerHidden" to={!user && '/login'}>
            <div onClick={this.handleAuthentication} className="header__option">  
            <div className="header__optionItem">
                <span>Hello, {user ? (user?.email).slice(0, (user?.email).indexOf('@')): 'Guest'}</span>
                <span className="userInternal">{user ? 'Sign Out': 'Sign In'}</span>
                {/* <span className="header__optionItemInternal">Accounts & Lists</span> */}
            </div>
            </div>
            </Link>
            
          
           <Link className="hamburgerHidden" to='/orders'>
            <div className="header__option"> 
            <div className="header__optionItem testing">
                <span>Returns</span>
                <span className="header__optionItemInternal">& Orders</span>
            </div>
            </div>
            </Link>
         

           

          <MenuIcon className="burger" onClick={this.handleBurger} />
          
    </div>
    </div>
    
     
    
    )
}
}

function mapStateToProps(reduxState){
    return {
        carts: reduxState.carts, 
        user: reduxState.user
    }
}

export default connect(mapStateToProps)(Header);
