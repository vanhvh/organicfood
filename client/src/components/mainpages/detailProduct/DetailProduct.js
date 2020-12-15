import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';

function DetailProduct() {
    const params = useParams();
    const state = useContext(GlobalState);
    const [products] = state.productsAPI.products;
    const addCart = state.userAPI.addCart;
    const [detailProduct, setDetailProduct] = useState([]);

    useEffect(() => {
        if (params.id) {
            products.forEach((product) => {
                if (product._id === params.id) setDetailProduct(product);
            });
        }
    }, [params.id, products]);

    if (detailProduct.length === 0) return null;

    return (
        <>
            <div className="container">
                <div className="row rowgutter">
                    <div className="col--12 col__md--6 col__lg--6 detail">
                        <div className="product__thumb border">
                            <img
                                src={detailProduct.images.url}
                                alt=""
                                className="px--5"
                            />
                        </div>
                    </div>
                    <div className="col--12 col__md--6 col__lg--6">
                        <div className="product__content t--l detail-content">
                            <h4 className="product__title n--mt">
                                <span>{detailProduct.title}</span>
                            </h4>
                            <div className="product-id pt--5px">
                                <span>ID: </span>
                                <span>{detailProduct.product_id}</span>
                            </div>
                            <div className="price pt--5px">
                                <span>Giá: </span>
                                <span>${detailProduct.price}</span>
                            </div>
                            <div className="description pt--5px n--pl n--pr">
                                <span>Mô tả: </span>
                                <span>{detailProduct.description}</span>
                            </div>
                            <div className="content pt--5px">
                                <span>Chi tiết: </span>
                                <span>{detailProduct.content}</span>
                            </div>
                            <p className="sold pt--5px">
                                <span>Đã bán:</span>{' '}
                                <span>{detailProduct.sold}</span>
                            </p>
                            <div className="btn-addCart t--c n--ml">
                                <Link
                                    to="/cart"
                                    onClick={() => addCart(detailProduct)}
                                >
                                    Mua
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="mt--3">Sản phẩm liên quan</h2>
                <div className="row rowgutter">
                    {products.map((product) => {
                        return product.category === detailProduct.category ? (
                            <ProductItem key={product._id} product={product} />
                        ) : null;
                    })}
                </div>
            </div>
        </>
    );
}

export default DetailProduct;
