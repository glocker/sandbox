import { useState } from 'react';
import users from './users.json';
import './style.css';
import Paginator from './Paginator';

const ROWS_PER_PAGE = 10;
const TOTAL_PAGES = Math.ceil(users.length / ROWS_PER_PAGE);

export default function Grid() {

    const [page, setPage] = useState(1);

    function handleClick() {
        return;
    }

    return (
        <>
            <h3>Staff list</h3>
            <div className="grid-container">
            {users.map((user, index) => {
                return (
                    <>
                        <div key={user.id}>{user.id}</div>
                        <div key={user.id}>{user.name}</div>
                        <div key={user.id}>{user.age}</div>
                        <div key={user.id}>{user.occupation}</div>
                    </>
                )
            })}
            <Paginator
                page={page} 
                onClick={handleClick} 
                disabled={page === 1 || page === TOTAL_PAGES}
                totalPages={TOTAL_PAGES}
            />
            </div>
        </>
    )
}