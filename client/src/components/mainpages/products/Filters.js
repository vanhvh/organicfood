import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';

function Filters() {
    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories;

    const [category, setCategory] = state.productsAPI.category;
    const [search, setSearch] = state.productsAPI.search;

    const handleCategory = (e) => {
        setCategory(e.target.value);
        setSearch('');
    };

    return (
        <form className="row quickSearch">
            <div className="col--12 col__md--4 col__lg--4">
                <select
                    name="category"
                    value={category}
                    onChange={handleCategory}
                >
                    <option value="">Tất cả sản phẩm</option>
                    {categories.map((category) => (
                        <option
                            value={'category=' + category._id}
                            key={category._id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="col--12 col__md--8 col__lg--8 mt-md--0 mt-lg--0 mt--1">
                <input
                    type="text"
                    value={search}
                    className="input-search"
                    placeholder="Bạn muốn tìm gì..."
                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
            </div>
        </form>
    );
}

export default Filters;
