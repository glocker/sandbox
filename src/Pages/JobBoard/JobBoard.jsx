import { useEffect, useState } from 'react';

const JOBS_IDS_URL = 'https://hacker-news.firebaseio.com/v0/jobstories.json';

export default function JobBoard() {

    const [isLoading, setLoading] = useState(true);
    let [jobs, setJobs] = useState([]);

    function getJobsId(jobsIdsUrl) {
        return fetch(jobsIdsUrl)
            .then(response => response.json());
    }

    function getJobsData(jobsToShow) {

        // Request job data for every job id
        return Promise.all(
            jobsToShow.map((jobId) => {
                return fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`)
                    .then(response => response.json());
            })
        )
    }

    useEffect(() => {
        getJobsId(JOBS_IDS_URL)
            .then((jobsIdList) => {

                // Check if Ids exists
                if (jobsIdList && jobsIdList.length) {

                    // Get only first 6 jobs of all existed jobs
                    return jobsIdList.slice(0, 6);
                }
            })
            .then((jobsToShow) => getJobsData(jobsToShow))
            .then(result => {
                setJobs(result);
                console.log(result);
            });
    }, []);

    return (
        <div>
            {
                jobs.map(job => job.title)
            }
        </div>
    );
}