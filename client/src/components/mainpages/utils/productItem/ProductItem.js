import React from 'react';
import BtnRender from './BtnRender';

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {
    return (
        <div class="mt--1 col--12 col__md--4 col__lg--4">
            <div className="product">
                {isAdmin && (
                    <input
                        type="checkbox"
                        checked={product.checked}
                        onChange={() => handleCheck(product._id)}
                    />
                )}
                <div className="d-flex">
                    <div className="product__thumb d-flex align-items-center">
                        <img src={product.images.url} alt="" />
                    </div>
                    <div className="product__content">
                        <h4 className="product__title">
                            <span title={product.title}>{product.title}</span>
                        </h4>
                        <div className="price">
                            <span>Giá: </span> <span>${product.price}</span>
                        </div>
                        <div
                            className="description"
                            style={{ overflow: 'hidden', height: '66px' }}
                        >
                            {product.description}
                        </div>

                        <BtnRender
                            product={product}
                            deleteProduct={deleteProduct}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
