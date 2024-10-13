import { Outlet, Link } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
    return (
        <>
            <div className="layout-container">
                <Link to="/">Home</Link>
                <details className="sketchy-border">
                    <summary>
                        <span>Tabs</span>
                        <p>
                            Build a tabs component that displays one panel of content at a time
                             depending on the active tab element
                        </p>
                    </summary>
                    <article className="article-container">
                        <h3>Requirements</h3>
                        <p>
                            Clicking on a tab makes it the active tab. Add a visual indication
                             (e.g. using blue text color) for the active tab to differentiate
                              it from the non-active tabs. At all times, only one panel's contents
                               should be displayed — the one corresponding to the active tab's.
                        </p>
                        <Link to="/tabs">See</Link>
                    </article>
                </details>
                <details className="sketchy-border">
                    <summary>
                        <span>Pagination</span>
                        <p>
                        Given a list of users, build a users data table that displays users in a paginated format
                        </p>
                    </summary>
                    <article className="article-container">
                        <h3>Requirements</h3>
                        <p>
                            <ul>
                                <h4>Table requirements</h4>
                                <li>
                                    The users data table should display the following columns:
                                     Id, Name, Age, Occupation
                                </li>
                                <li>
                                    Each row in the table represents a single user
                                </li>
                            </ul>
                            <ul>
                                <h4>Pagination requirements</h4>
                                <li>
                                    The pagination controls should allow the user
                                     to navigate to previous and next pages
                                </li>
                                <li>
                                    The pagination controls should display the current page number and
                                     the total number of pages
                                </li>
                                <li>
                                    The table should update dynamically
                                     when the user navigates to a different page
                                </li>
                                <li>
                                    Provide an option to select the number of users
                                     displayed per page (e.g., 5, 10, 20)
                                </li>
                            </ul>
                        </p>
                        <Link to="/pagination">See</Link>
                    </article>
                </details>
            </div>

            <Outlet />
    </>
    )
}