import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
    return (
        <>
            <nav>
                <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/tabs">Tabs</Link>
                    <span>Tabs task description</span>
                </li>
                <li>
                    <Link to="/pagination">Pagination</Link>
                    <span>Pagination task description</span>
                </li>
                </ul>
            </nav>

            <Outlet />
    </>
    )
}