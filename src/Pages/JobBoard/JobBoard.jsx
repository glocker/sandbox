import { useEffect, useState } from 'react';
import Card from './Card';
import './JobBoard.css';

const ITEMS_ON_PAGE = {
    0: 6,
    1: 12,
    2: 18
};

export default function JobBoard() {

    const [isLoading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [jobsToShow, setJobsToShow] = useState([]);
    const [jobsIdList, setJobsId] = useState();
    const [page, setPage] = useState(0);

    function moreButtonHandler() {

        if (jobsIdList.length > ITEMS_ON_PAGE.page) {
            getJobsById()
        }
    }

    function getJobsList() {

        // Get ids of current vacancies
        return fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
                .then(response => response.json());
    }

    function getJobsById(jobsIdList) {

        // Request job data for every job id
        return Promise.all(
            jobsToShow.map((jobId) => {
                return fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`)
                    .then(response => response.json());
            }))
    }

    useEffect(() => {

        getJobsList()
            .then(list => {

                // Check if Ids exists
                if (list && list.length) {

                    // Get only first 6 jobs of all existed jobs
                    setJobsToShow(list.slice(0, ITEMS_ON_PAGE.page));
                    setPage(page + 1);

                    // Save ids to omit unnecassary request to call getJobsList by clicking load more
                    setJobsId(list);

                    return getJobsById(list)
                }
            })
            .then(result => {
                setJobs(result);
            })
    }, [jobsIdList]);

    return (
        <>
            {jobs.map(job => <Card job={job} key={job.id} />)}
            <button onClick={moreButtonHandler}>Load more</button>
        </>
    );
}