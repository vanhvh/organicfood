import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import Filters from '../mainpages/products/Filters';
import Logo from './icon/logo.png';
import LogoAdmin from './icon/logoAdmin.png';
import Cart from './icon/shopping-basket.svg';
import Facebook from './icon/facebook.svg';
import Instagram from './icon/instagram.svg';
import Phone from './icon/phone.svg';
import Envelope from './icon/envelope.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Header() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    const [cart] = state.userAPI.cart;

    const logoutUser = async () => {
        await axios.get('/user/logout');
        localStorage.removeItem('firstLogin');
        window.location.href = '/';
    };

    const adminRouter = () => {
        return (
            <>
                <li className="navUser__item">
                    <Link to="/category" className="navUser__link">
                        Danh mục
                    </Link>
                </li>
                <li className="navUser__item">
                    <Link to="/create_product" className="navUser__link">
                        Thêm sản phẩm
                    </Link>
                </li>
            </>
        );
    };

    const loggedRouter = () => {
        return (
            <>
                <ul className="d-flex list--unstyled">
                    <li className="navUser__item">
                        <Link to="/" className="navUser__link">
                            {isAdmin ? 'Sản phẩm' : 'Shop'}
                        </Link>
                    </li>
                    {isAdmin && adminRouter()}
                    <li className="navUser__item">
                        <Link to="/history" className="navUser__link">
                            Lịch sử
                        </Link>
                    </li>
                    <li className="navUser__item">
                        <Link
                            to="/"
                            onClick={logoutUser}
                            className="navUser__link"
                        >
                            Đăng xuất
                        </Link>
                    </li>
                </ul>
            </>
        );
    };

    return (
        <header className="hdr">
            <div className="hdr__top">
                <div className="container">
                    <div className="row">
                        <div className="col--12 col__md--6 col__lg--6">
                            <ul className="social-list d-flex align-items-center list--unstyled">
                                <li>
                                    <a href="mailto:Nguyencongvietanh0123@gmail.com">
                                        <img
                                            src={Envelope}
                                            alt="email"
                                            width="30px"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/ngocnam.pham.879/">
                                        <img
                                            src={Facebook}
                                            alt="facebook"
                                            width="30px"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/_ngoccnam_/">
                                        <img
                                            src={Instagram}
                                            alt="instagram"
                                            width="30px"
                                        />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col--12 col__md--6 col__lg--6">
                            <div className="navUser right d-flex align-items-center">
                                {isLogged ? (
                                    loggedRouter()
                                ) : (
                                    <ul className="d-flex list--unstyled">
                                        <li className="navUser__item">
                                            <Link
                                                to="/login"
                                                className="navUser__link"
                                            >
                                                Đăng nhập
                                            </Link>
                                        </li>
                                        <li className="navUser__item">
                                            <Link
                                                to="/register"
                                                className="navUser__link"
                                            >
                                                Đăng ký
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hdr__bottom">
                <div className="hdr--center">
                    <div className="container">
                        <div className="row">
                            <div className="col--6 col__md--2 col__lg--2">
                                <Link to="/" className="hdr__logo">
                                    {isAdmin ? (
                                        <div>
                                            <img
                                                src={LogoAdmin}
                                                alt="admin"
                                                style={{ width: '48px' }}
                                            />
                                            Admin
                                        </div>
                                    ) : (
                                        <img
                                            src={Logo}
                                            style={{ height: '48px' }}
                                            alt="organicfood"
                                        />
                                    )}
                                </Link>
                            </div>
                            <div className="col--6 col__md--2 col__lg--2">
                                <div className="hdr__phone d-flex align-items-center">
                                    <img src={Phone} alt="phone" width="30px" />
                                    <span>
                                        <a href="tel:0915483343">
                                            &nbsp;091-548-3343
                                        </a>
                                    </span>
                                </div>
                            </div>
                            <div className="col--12 col__md--7 col__lg--7">
                                <div className="quickSearch">
                                    <Filters />
                                </div>
                            </div>
                            <div className="col--12 col__md--1 col__lg--1">
                                <div className="tools d-flex align-items-center right">
                                    {isAdmin ? (
                                        ''
                                    ) : (
                                        <div className="cart right d-flex align-items-center mt-md--0 mt-lg--0 mt--1">
                                            <Link to="/cart">
                                                <img
                                                    src={Cart}
                                                    alt="shopping-cart"
                                                    className="cart__icon"
                                                />
                                            </Link>
                                            <span className="cart__count">
                                                &nbsp;&nbsp;{cart.length}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
