import { useState } from 'react';
import users from './users.json';
import './style.css';

export default function Grid() {
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
            </div>
        </>
    )
}