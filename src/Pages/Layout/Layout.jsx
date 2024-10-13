import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
    return (
        <>
            <div>
                <Link to="/">Home</Link>
                <details>
                    <summary>Tabs</summary>
                    Tabs task description
                    <Link to="/tabs">See realization</Link>
                </details>
                <details>
                    <summary>Pagination</summary>
                    Pagination task description
                    <Link to="/pagination">Pagination</Link>
                </details>
            </div>

            <Outlet />
    </>
    )
}