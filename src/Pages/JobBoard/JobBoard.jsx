import { useEffect, useState } from 'react';
import Card from './Card';
import './JobBoard.css';

export default function JobBoard() {

    const [isLoading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        // Get ids of current vacancies
        fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
            .then(response => response.json())
            .then(jobsIdList => {

                let jobsToShow;

                // Check if Ids exists
                if (jobsIdList && jobsIdList.length) {

                    // Get only first 6 jobs of all existed jobs
                    jobsToShow = jobsIdList.slice(0, 6);
                }

                // Request job data for every job id
                return Promise.all(
                    jobsToShow.map((jobId) => {
                        return fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`)
                            .then(response => response.json());
                    }))
            })
            .then(result => {
                setJobs(result);
            })
    }, []);

    return (
        <>
            {jobs.map(job => <Card job={job} key={job.id} />)}
        </>
    );
}