import React, { useState } from 'react';

const Tab = ({ name, onClick, isActive }) => (
    <div
        className={`tab ${isActive ? "active" : ""}`}
        onClick={onClick}
    >
        {name}
    </div>
);

export default Tab;