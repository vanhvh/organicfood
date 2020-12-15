import React, { useState, useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';

function Categories() {
    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories;
    const [category, setCategory] = useState('');
    const [token] = state.token;
    const [callback, setCallback] = state.categoriesAPI.callback;
    const [onEdit, setOnEdit] = useState(false);
    const [id, setID] = useState('');

    const createCategory = async (e) => {
        e.preventDefault();
        try {
            if (onEdit) {
                const res = await axios.put(
                    `/api/category/${id}`,
                    { name: category },
                    {
                        headers: { Authorization: token },
                    },
                );
                alert(res.data.msg);
            } else {
                const res = await axios.post(
                    '/api/category',
                    { name: category },
                    {
                        headers: { Authorization: token },
                    },
                );
                alert(res.data.msg);
            }
            setOnEdit(false);
            setCategory('');
            setCallback(!callback);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    const editCategory = async (id, name) => {
        setID(id);
        setCategory(name);
        setOnEdit(true);
    };

    const deleteCategory = async (id) => {
        try {
            const res = await axios.delete(`/api/category/${id}`, {
                headers: { Authorization: token },
            });
            alert(res.data.msg);
            setCallback(!callback);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col--6">
                    <form onSubmit={createCategory}>
                        <div className="panel__body">
                            <div className="form__field">
                                <label
                                    htmlFor="category"
                                    className="form__label"
                                >
                                    Danh mục:
                                </label>
                                <input
                                    className="form__input"
                                    type="text"
                                    name="category"
                                    value={category}
                                    required
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                />
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
            <div className="row">
                <div className="col--6">
                    <div className="category">
                        {categories.map((category) => (
                            <div className="row gutter" key={category._id}>
                                <p className="col--4 category__title">
                                    <span>{category.name}</span>
                                </p>
                                <div className="col--6 d-flex">
                                    <button
                                        className="btn btn-edit mr--5px"
                                        onClick={() =>
                                            editCategory(
                                                category._id,
                                                category.name,
                                            )
                                        }
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        className="btn btn-delete"
                                        onClick={() =>
                                            deleteCategory(category._id)
                                        }
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Categories;
