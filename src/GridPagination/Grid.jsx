import { useState } from 'react';
import users from './users.json';
import './style.css';
import Paginator from './Paginator';

export default function Grid() {

    const [page, setPage] = useState(1);

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
            <Paginator page={page} onClick={handleClick}/>
            </div>
        </>
    )
}