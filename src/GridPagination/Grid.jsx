import { useState } from 'react';
import users from './users.json';
import './style.css';
import Paginator from './Paginator';

const USERS_PER_PAGE = 5;
const TOTAL_PAGES = Math.ceil(users.length / USERS_PER_PAGE);

export default function Grid() {

    const [page, setPage] = useState(1);

    // Get short users list
    function getSlicedList() {

        const start = (page - 1) * USERS_PER_PAGE;
        const end = start + USERS_PER_PAGE;

        return users.slice(start, end);
    }

    // Next work only with short version
    const usersSlice = getSlicedList();

    return (
        <>
            <h3>Staff list</h3>
            <div className="grid-container">
                <span>Id</span>
                <span>Name</span>
                <span>Age</span>
                <span>Occupation</span>
                {usersSlice.map((user, index) => {
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
                    setPage={setPage}
                    disabled={page === 1 || page === TOTAL_PAGES}
                    totalPages={TOTAL_PAGES}
                />
            </div>
        </>
    )
}