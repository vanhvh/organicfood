import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../headers/icon/logo.png';

function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/user/login', { ...user });

            localStorage.setItem('firstLogin', true);

            window.location.href = '/';
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col--6 form">
                    <form onSubmit={loginSubmit} className="panel">
                        <div className="panel__logo">
                            <img src={Logo} alt="Logo" />
                        </div>
                        <div className="panel__header">
                            <h2 className="panel__title">Đăng nhập</h2>
                        </div>
                        <div className="panel__body">
                            <div className="form__field">
                                <label className="form__label">Email:</label>
                                <input
                                    className="form__input"
                                    name="email"
                                    type="text"
                                    required
                                    value={user.email}
                                    onChange={onChangeInput}
                                />
                            </div>
                            <div className="form__field">
                                <label className="form__label">Mật khẩu:</label>
                                <input
                                    className="form__input"
                                    name="password"
                                    type="password"
                                    required
                                    value={user.password}
                                    onChange={onChangeInput}
                                />
                            </div>
                            <div className="form__actions">
                                <input
                                    type="submit"
                                    className="btn btn--primary"
                                    value="Đăng nhập"
                                />
                                <Link to="/register">Đăng ký</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
