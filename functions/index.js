const functions = require('firebase-functions');

const express = require('express');

const cors = require('cors');
//require stripe with private key
const stripe = require('stripe')('Stripe API Key');


//API


//App config
const app = express();
//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());
//API routes
app.get('/', (req, res)=>{
    res.status(200).send('hello world')
})

app.post('/payments/create', async (req, res)=>{
    const total = req.query.total;
    // console.log('payment request received', total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of the currency
        currency: 'usd'
    });
    //ok payment intented created
    res.status(201).send({
        clientSecret: paymentIntent.client_secret

    })
})
//Listen command

exports.api = functions.https.onRequest(app)

//Local Endpoint
// http://localhost:5001/eemanstores-16cab/us-central1/api