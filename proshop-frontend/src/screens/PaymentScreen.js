import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Form, Button, Col} from 'react-bootstrap';
import {savePaymentMethod} from "../actions/cartActions.js"
import FormContainer from "../components/FormContainer"
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = ({history}) =>{
    const cart = useSelector(state => state.cart)
    const {shippingAddress} =  cart

    if(!shippingAddress){
        history.redirect('/shipping')
    }

    const [paymentMethod,setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    };
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>PAYMENT METHOD</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or credit card'
                            id="PayPal"
                            name='paymentMathod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    );
};



export default PaymentScreen;