import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import PaypalButton from './PaypalButton';

function Cart() {
    const state = useContext(GlobalState);
    const [cart, setCart] = state.userAPI.cart;
    const [token] = state.token;
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + item.price * item.quantity;
            }, 0);

            setTotal(total);
        };

        getTotal();
    }, [cart]);

    const addToCart = async (cart) => {
        await axios.patch(
            '/user/addcart',
            { cart },
            {
                headers: { Authorization: token },
            },
        );
    };

    const increment = (id) => {
        cart.forEach((item) => {
            if (item._id === id) {
                item.quantity += 1;
            }
        });

        setCart([...cart]);
        addToCart(cart);
    };

    const decrement = (id) => {
        cart.forEach((item) => {
            if (item._id === id) {
                item.quantity === 1
                    ? (item.quantity = 1)
                    : (item.quantity -= 1);
            }
        });

        setCart([...cart]);
        addToCart(cart);
    };

    const removeProduct = (id) => {
        if (window.confirm('Bạn có muốn xóa sản phẩm này không?')) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1);
                }
            });

            setCart([...cart]);
            addToCart(cart);
        }
    };

    const tranSuccess = async (payment) => {
        const { paymentID, address } = payment;

        await axios.post(
            '/api/payment',
            { cart, paymentID, address },
            {
                headers: { Authorization: token },
            },
        );

        setCart([]);
        addToCart([]);
        alert('Bạn đã đặt hàng thành công.');
    };

    if (cart.length === 0)
        return (
            <h2 style={{ textAlign: 'center', fontSize: '3.5rem' }}>
                Giỏ hàng trống
            </h2>
        );

    return (
        <div>
            <div className="container">
                {cart.map((product) => (
                    <div className="row rowgutter" key={product._id}>
                        <div className="col--12 col__md--6 col__lg--6 detail">
                            <div className="border">
                                <img
                                    src={product.images.url}
                                    alt=""
                                    className="px--5"
                                />
                            </div>
                        </div>
                        <div className="col--12 col__md--6 col__lg--6">
                            <div className="product__body t--l detail-content">
                                <div>
                                    <h2>{product.title}</h2>
                                </div>
                                <div className="pt--5px">
                                    <h6 className="inline-block">#ID:</h6>{' '}
                                    {product.product_id}
                                </div>
                                <div className="price pt--5px">
                                    <h6
                                        className="inline-block"
                                        style={{ color: '#333' }}
                                    >
                                        Giá:{' '}
                                    </h6>{' '}
                                    ${product.price * product.quantity}
                                </div>
                                <div className="description pt--5px n--pl n--pr">
                                    <h6>Mô tả: </h6>
                                    {product.description}
                                </div>
                                <div className="pt--5px">
                                    <h6>Chi tiết: </h6>
                                    {product.content}
                                </div>
                                <div className="amount">
                                    <button
                                        className="n--ml"
                                        onClick={() => decrement(product._id)}
                                    >
                                        {' '}
                                        -{' '}
                                    </button>
                                    <span>{product.quantity}</span>
                                    <button
                                        className="n--mr"
                                        onClick={() => increment(product._id)}
                                    >
                                        {' '}
                                        +{' '}
                                    </button>
                                </div>
                                <div
                                    className="delete"
                                    onClick={() => removeProduct(product._id)}
                                >
                                    X
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="row">
                    <div className="col--12 total">
                        <div>
                            Tổng tiền: <span className="price">${total}</span>
                        </div>
                        <PaypalButton total={total} tranSuccess={tranSuccess} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
