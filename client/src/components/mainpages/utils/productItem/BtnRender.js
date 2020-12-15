import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';

function BtnRender({ product, deleteProduct }) {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;
    const addCart = state.userAPI.addCart;

    return (
        <div>
            {isAdmin ? (
                <>
                    <div>
                        <Link
                            className="btn-edit"
                            to={`/edit_product/${product._id}`}
                        >
                            Sửa
                        </Link>
                    </div>

                    <div>
                        <Link
                            className="btn-delete"
                            to="#"
                            onClick={() =>
                                deleteProduct(
                                    product._id,
                                    product.images.public_id,
                                )
                            }
                        >
                            Xóa
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <Link
                            className="btn-addCart"
                            to="#"
                            onClick={() => addCart(product)}
                        >
                            Mua
                        </Link>
                    </div>

                    <div>
                        <Link
                            className="btn-detail"
                            to={`/detail/${product._id}`}
                        >
                            Chi tiết
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default BtnRender;
