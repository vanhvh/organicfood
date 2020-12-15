import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';

function LoadMore() {
    const state = useContext(GlobalState);
    const [page, setPage] = state.productsAPI.page;
    const [result] = state.productsAPI.result;

    return (
        <div className="t--c">
            {result < page * 9 ? (
                ''
            ) : (
                <button className="load_more" onClick={() => setPage(page + 1)}>
                    Xem thêm
                </button>
            )}
        </div>
    );
}

export default LoadMore;
