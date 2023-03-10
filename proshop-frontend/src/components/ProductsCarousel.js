import React,{useEffect} from "react";
import {Link} from 'react-router-dom'
import {Carousel, Image} from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import {topRatdedProducts} from "../actions/productActions";
import {useDispatch, useSelector} from 'react-redux'


const ProductsCarousel = () =>{
    const topProducts = useSelector((state) => state.topProducts);
    const { loading, error, products } = topProducts;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(topRatdedProducts())
    },[dispatch])


    return( loading ? <Loader/> : error ?
        <Message variant='danger'>{error}</Message> : (
            <Carousel pause='hover' className='bg-dark'>
                {Array.isArray(products)
                    ? (products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid/>
                    </Link>
                    <Carousel.Caption className='carousel-caption'>
                        <h2>{product.name}${product.price}</h2>
                    </Carousel.Caption>
                </Carousel.Item>
                ))) : null}
            </Carousel>
        ))
};

export default ProductsCarousel;