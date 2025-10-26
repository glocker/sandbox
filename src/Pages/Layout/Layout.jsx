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
              Build a tabs component that displays one panel of content at a
              time depending on the active tab element
            </p>
          </summary>
          <article className="article-container">
            <h3>Requirements</h3>
            <p>
              Clicking on a tab makes it the active tab. Add a visual indication
              (e.g. using blue text color) for the active tab to differentiate
              it from the non-active tabs. At all times, only one panel's
              contents should be displayed — the one corresponding to the active
              tab's.
            </p>
            <Link to="/tabs">See</Link>
          </article>
        </details>
        <details className="sketchy-border">
          <summary>
            <span>Pagination</span>
            <p>
              Given a list of users, build a users data table that displays
              users in a paginated format
            </p>
          </summary>
          <article className="article-container">
            <h3>Requirements</h3>
            <p>
              <ul>
                <h4>Table requirements</h4>
                <li>
                  The users data table should display the following columns: Id,
                  Name, Age, Occupation
                </li>
                <li>Each row in the table represents a single user</li>
              </ul>
              <ul>
                <h4>Pagination requirements</h4>
                <li>
                  The pagination controls should allow the user to navigate to
                  previous and next pages
                </li>
                <li>
                  The pagination controls should display the current page number
                  and the total number of pages
                </li>
                <li>
                  The table should update dynamically when the user navigates to
                  a different page
                </li>
                <li>
                  Provide an option to select the number of users displayed per
                  page (e.g., 5, 10, 20)
                </li>
              </ul>
            </p>
            <Link to="/pagination">See</Link>
          </article>
        </details>
        <details className="sketchy-border">
          <summary>
            <span>Job Board</span>
            <p>
              Build a job board that displays the latest job postings fetched
              from the Hacker News API, with each posting displaying the job
              title, poster, and date posted
            </p>
          </summary>
          <article className="article-container">
            <h3>Requirements</h3>
            <ul>
              <li>
                The page should show 6 jobs on initial load with a button to
                load more postings.
              </li>
              <li>
                Clicking on the "Load more" button will load the next page of 6
                postings. The button does not appear if there aren't any more
                postings to load.
              </li>
              <li>
                If there's a url field returned for the job details, make the
                job title a link that opens the job details page in a new window
                when clicked.
              </li>
              <li>The timestamp can be formatted in any way you like.</li>
            </ul>
            <h3>API</h3>
            <p>
              Hacker News has a public API to fetch jobs by Y Combinator
              companies. There's no single API that fetches a list of jobs
              together with the data, so you will have to make separate requests
              to fetch the necessary data and combine them to be displayed.
            </p>
            <h3>Job Details</h3>
            <ul>
              Fetches job posting details given its ID.
              <li>
                URL:{' '}
                <code>
                  `https://hacker-news.firebaseio.com/v0/item/{'id'}.json`
                </code>
              </li>
              <li>HTTP Method: GET</li>
              <li>Content Type: json</li>
            </ul>
            <Link to="/jobboard">See</Link>
          </article>
        </details>
        <details className="sketchy-border">
          <summary>
            <span>Custom functions</span>
            <p>
              Write own implementation of basic methods of arrays, Promises,
              objects and etc
            </p>
          </summary>
          <article className="article-container">
            <h3>List of functions</h3>
            <ul>
              <li>Array.prototype.map</li>
            </ul>
            <Link to="/customFunctions">See</Link>
          </article>
        </details>
        <details className="useArray">
          <summary>
            <span>Custom hook useArray</span>
            <p>
              Implement a useArray hook that manages an array of items with additional utility methods.
            </p>
            <p>
              It is more convenient to use <code>useArray</code> over plain <code>useState</code> because in the latter case, you would always have to create a new array, mutate it, then set state to use the new array, which can be quite cumbersome.
            </p>
            <p>
              The hook should work generically with arrays of any types.
            </p>
          </summary>
          <article className="article-container">
            <h3>useArray</h3>
            <ul>
              <li>Array.prototype.map</li>
            </ul>
            <Link to="/customFunctions">See</Link>
          </article>
        </details>
      </div>

      <Outlet />
    </>
  );
}
