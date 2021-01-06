import React from 'react'
import './Login.css'
import { useState } from 'react';
import './Login.css'
import { Link, useHistory } from "react-router-dom";
import { auth } from './firebase';

// import { Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.css';


export default function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e)=>{
        e.preventDefault();
        auth
        .signInWithEmailAndPassword(email, password)
        .then(auth =>{
            console.log(auth);
            if(auth){
                history.push('/');
            }
        })
        .catch(error => alert(error.message));
        //firebase
    }

    const register = (e)=>{
        e.preventDefault();

        //firebase
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) =>{
                // console.log(auth);
                if(auth){
                history.push('/');
                }
            })
            .catch(error => alert(error.message));
    }

  


        

// function NormalLoginForm(){
  // const onFinish = (values) => {
  //   console.log('Received values of form: ', values);
  // };


  return (
  //   <Card style={{width: "40%", margin: "auto",   height:"fit-content",  border: "1px solid #d3d3d3", borderRadius: "10px", paddingTop: "10px", marginTop: "100px"}}>
  //   <Form style={{margin: "auto"}}
  //     name="normal_login" 
  //     className="login-form"
  //     initialValues={{
  //       remember: true,
  //     }}
  //     onFinish={onFinish}
  //   >
  //     <Form.Item
  //       name="username"
  //       rules={[
  //         {
  //           required: true,
  //           message: 'Please input your Username!',
  //         },
  //       ]}
  //     >
  //       <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
  //     </Form.Item>
  //     <Form.Item
  //       name="password"
  //       rules={[
  //         {
  //           required: true,
  //           message: 'Please input your Password!',
  //         },
  //       ]}
  //     >
  //       <Input
  //         prefix={<LockOutlined className="site-form-item-icon" />}
  //         type="password"
  //         placeholder="Password"
  //       />
  //     </Form.Item>
  //     <Form.Item>
  //       <Form.Item name="remember" valuePropName="checked" noStyle>
  //         <Checkbox>Remember me</Checkbox>
  //       </Form.Item>

  //       <a className="login-form-forgot" href="">
  //         Forgot password
  //       </a>
  //     </Form.Item>

  //     <Form.Item>
  //       <Button type="primary" htmlType="submit" className="login-form-button">
  //         Log in
  //       </Button>
  //       Or <a href="">register now!</a>
  //     </Form.Item>
  //   </Form>
  //   </Card>
  // );








        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='eeman.png' 
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>
                <form>
                            <div className="form-group">
                                <input type="text" required="" className="form-control" value={email} onChange={e => setEmail(e.target.value)} name="email" placeholder="Username Or Email" />
                            </div>
                            <div className="form-group">
                                <input className="form-control" required="" type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" placeholder="Password" />
                            </div>
                            <div className="login_footer">
                                <div className="chek-form">
                                    <div className="custome-checkbox">
                                        <input className="form-check-input" type="checkbox" name="checkbox" id="remember" value="" />
                                        <label className="form-check-label" for="remember"><span>Remember me</span></label>
                                    </div>
                                </div>
                                <a href="#">Forgot password?</a>
                            </div>
                            <div>
                                <button type="submit" onClick={signIn} className="login__signInButton" name="login">Log in</button>
                            </div>
                        </form>
                {/* <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' className='login__signInButton'>Sign In</button>
                </form> */}

                {/* <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p> */}

                <button onClick={register} className='login__registerButton'>Create an Account</button>
            </div>
        </div>
    )

            
 
}
