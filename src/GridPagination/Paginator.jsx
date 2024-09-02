import { useState } from 'react';

export default function Paginator({page, handleClick, setPage, disabled, totalPages}) {


    return (
        <div className="paginator-container">
            <button 
                type="button"
                disabled={disabled}
                onClick={() => setPage(page - 1)}
            >
                {'<'}
            </button>
            <button type="button">{page}</button>
            <button type="button">{totalPages}</button>
            <button 
                type="button"
                disabled={disabled}
                onClick={() => setPage(page + 1)}
            >
                {'>'}
            </button>
        </div>
    )
}