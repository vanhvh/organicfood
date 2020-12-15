import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import { useHistory, useParams } from 'react-router-dom';

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit',
    content:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur atque suscipit laudantium quia enim!',
    category: '',
    _id: '',
};

function CreateProduct() {
    const state = useContext(GlobalState);
    const [product, setProduct] = useState(initialState);
    const [categories] = state.categoriesAPI.categories;
    const [images, setImages] = useState(false);
    const [loading, setLoading] = useState(false);

    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;

    const history = useHistory();
    const param = useParams();

    const [products] = state.productsAPI.products;
    const [onEdit, setOnEdit] = useState(false);
    const [callback, setCallback] = state.productsAPI.callback;

    useEffect(() => {
        if (param.id) {
            setOnEdit(true);
            products.forEach((product) => {
                if (product._id === param.id) {
                    setProduct(product);
                    setImages(product.images);
                }
            });
        } else {
            setOnEdit(false);
            setProduct(initialState);
            setImages(false);
        }
    }, [param.id, products]);

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            if (!isAdmin) return alert('Bạn không phải là quản trị viên.');
            const file = e.target.files[0];

            if (!file) return alert('File not exist.');

            if (file.size > 1024 * 1024)
                // 1mb
                return alert('Size too large!');

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                // 1mb
                return alert('Định dạng tệp không đúng.');

            let formData = new FormData();
            formData.append('file', file);

            setLoading(true);
            const res = await axios.post('/api/upload', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    Authorization: token,
                },
            });
            setLoading(false);
            setImages(res.data);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    const handleDestroy = async () => {
        try {
            if (!isAdmin) return alert('Bạn không phải là quản trị viên.');
            setLoading(true);
            await axios.post(
                '/api/destroy',
                { public_id: images.public_id },
                {
                    headers: { Authorization: token },
                },
            );
            setLoading(false);
            setImages(false);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!isAdmin) return alert('Bạn không phải là quản trị viên.');
            if (!images) return alert('Không có hình ảnh được tải lên.');

            if (onEdit) {
                await axios.put(
                    `/api/products/${product._id}`,
                    { ...product, images },
                    {
                        headers: { Authorization: token },
                    },
                );
            } else {
                await axios.post(
                    '/api/products',
                    { ...product, images },
                    {
                        headers: { Authorization: token },
                    },
                );
            }
            setCallback(!callback);
            history.push('/');
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    const styleUpload = {
        display: images ? 'block' : 'none',
    };
    return (
        <div className="container">
            <div className="row">
                <div className="upload col--12 col__md--6 col__lg--6">
                    <input
                        type="file"
                        name="file"
                        id="file_up"
                        onChange={handleUpload}
                    />
                    {loading ? (
                        <div id="file_img">
                            <Loading />
                        </div>
                    ) : (
                        <div id="file_img" style={styleUpload}>
                            <img src={images ? images.url : ''} alt="" />
                            <span onClick={handleDestroy}>X</span>
                        </div>
                    )}
                </div>

                <div className="col--12 col__md--6 col__lg--6">
                    <form onSubmit={handleSubmit} className="panel">
                        <div className="panel__body">
                            <div className="form__field">
                                <label
                                    htmlFor="product_id"
                                    className="form__label"
                                >
                                    ID sản phẩm
                                </label>
                                <input
                                    className="form__input"
                                    name="product_id"
                                    type="text"
                                    id="product_id"
                                    required
                                    value={product.product_id}
                                    onChange={handleChangeInput}
                                    disabled={onEdit}
                                />
                            </div>
                            <div className="form__field">
                                <label htmlFor="title" className="form__label">
                                    Tiêu đề
                                </label>
                                <input
                                    className="form__input"
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    value={product.title}
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <div className="form__field">
                                <label htmlFor="price" className="form__label">
                                    Giá
                                </label>
                                <input
                                    className="form__input"
                                    type="number"
                                    name="price"
                                    id="price"
                                    required
                                    value={product.price}
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <div className="form__field">
                                <label
                                    htmlFor="description"
                                    className="form__label"
                                >
                                    Mô tả
                                </label>
                                <textarea
                                    className="form__input"
                                    type="text"
                                    name="description"
                                    id="description"
                                    required
                                    value={product.description}
                                    rows="5"
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <div className="form__field">
                                <label
                                    htmlFor="content"
                                    className="form__label"
                                >
                                    Nội dung
                                </label>
                                <textarea
                                    className="form__input"
                                    type="text"
                                    name="content"
                                    id="content"
                                    required
                                    value={product.content}
                                    rows="7"
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <div className="form__field">
                                <label
                                    htmlFor="categories"
                                    className="form__label"
                                >
                                    Danh mục:{' '}
                                </label>
                                <select
                                    style={{ width: '170px' }}
                                    className="form__input"
                                    name="category"
                                    value={product.category}
                                    onChange={handleChangeInput}
                                >
                                    <option value="">Chọn danh mục</option>
                                    {categories.map((category) => (
                                        <option
                                            value={category._id}
                                            key={category._id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form__actions">
                                <input
                                    type="submit"
                                    className="btn btn--primary"
                                    value={onEdit ? 'Cập nhật' : 'Thêm'}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;
