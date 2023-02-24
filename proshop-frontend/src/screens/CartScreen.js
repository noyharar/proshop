import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {addToCart, removeFromCart} from "../actions/cartActions";
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import Message from "../components/Message";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import {Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap'
// import {LinkContainer} from "react-router-bootstrap";


const CartScreen =({match, location, history}) =>{
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart;
    useEffect(()=> {
        if(productId) {
            dispatch(addToCart(productId,qty))
        }
    },[dispatch,productId,qty]);


    const removeFromCartHandler =  (productId) => {
        dispatch(removeFromCart(productId))
    };
    const checkOutHandler = () => {
        history.push('/login?redirect=shipping')
    };
    return(
        <>
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ?
                        <Message>
                            {`Your cart is empty    `}
                            <Link to="/">
                                Go Back
                            </Link>
                        </Message> : <ListGroup variant="flush">{
                            cartItems.map((item) => (
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/product/${item.product}`}><strong>{item.name}</strong></Link>
                                            </Col>
                                            <Col md={2}>
                                                <strong> ${item.price}</strong>
                                            </Col>
                                            <Col md={2}>
                                                <Form.Control
                                                    as='select'
                                                    value={item.qty}
                                                    onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}
                                                >
                                                    {
                                                        [...Array(item.countInStock)].map((_, i) => i + 1)
                                                            .map(i => <option key={i} value={i}>{i}</option>)
                                                    }
                                                </Form.Control>
                                            </Col>
                                            <Col md={2}>
                                                <Button type='button' varient='light' onClick={() => removeFromCartHandler(item.product)}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            )
                        }
                        </ListGroup>
                    }
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>
                                    SUBTOTAL {cartItems.reduce((sum,item) => sum + item.qty,0)} ITEMS
                                </h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>${cartItems.reduce((sum,item) => sum + (item.qty*item.price),0).toFixed(2)}
                                    </Col>

                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Button onClick={checkOutHandler} className='btn-block' varient="dark" disabled={cartItems.length === 0}>PROCEED TO CHECKOUT</Button>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup/>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )}

export default CartScreen;