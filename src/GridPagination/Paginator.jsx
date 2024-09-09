import { useState } from 'react';

export default function Paginator(props) {

    const {page, onPrevPageClick, onNextPageClick, disabled, totalPages} = props;

    const nextPageClick = () => { onNextPageClick(); };
    const prevPageClick = () => { onPrevPageClick(); };

    return (
        <div className="paginator-container">
            <button 
                type="button"
                disabled={false}
                onClick={prevPageClick}
            >
                {'<'}
            </button>
            <button type="button">{page}</button>
            <button type="button">{totalPages}</button>
            <button
                type="button"
                disabled={false}
                onClick={nextPageClick}
            >
                {'>'}
            </button>
        </div>
    )
}