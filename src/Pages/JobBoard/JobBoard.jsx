import { useEffect, useState } from 'react';

export default function JobBoard() {

    const [isLoading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    let jobsData;

    // function getJobsId() {

    //     return new Promise((resolve, reject) => {
    //         fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((result) => {
    //             resolve(result);
    //         })
    //         .catch((error) => {
    //             reject(error);
    //         })
    //     });
    // }

    function getJobsData() {

        fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
            .then(response => response.json())
            .then((jobsIdList) => {

                // Check if Ids exists
                if (jobsIdList && jobsIdList.length) {

                    // Get only first 6 jobs of all existed jobs
                    return jobsIdList.slice(0, 6);
                }
            })
            .then((jobsToShow) => {

                // Request job data for every job id
                return Promise.all(
                    jobsToShow.map((jobId) => {
                        fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`);
                    })
                )
                .then((response) => {

                    console.log(response);
                    // const jobs = response.json();
                    // setJobs(jobs);
                });
            })
    }

    useEffect(() => {
        getJobsData()
    }, []);

    return (
        <div>
            {
                jobs
            }
        </div>
    );
}