import { useState } from 'react';

export default function Paginator({page, onClick, disabled, totalPages}) {


    return (
        <div className="paginator-container">
            <button type="button">{'<'}</button>
            <button type="button">{page}</button>
            <button type="button">{totalPages}</button>
            <button type="button">{'>'}</button>
        </div>
    )
}