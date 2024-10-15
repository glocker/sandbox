import { useEffect, useState } from 'react';

export default function JobBoard() {

    const [isLoading, setLoading] = useState(true);
    let jobsData;

    useEffect(() => {

        async function getJobsId() {

            await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                return result;
            });
        }

        async function getJobsData() {

            const jobsIdList = await getJobsId();

            // Check if Ids exists
            if (jobsIdList && jobsIdList.length) {

                // Get only first 6 jobs of all existed jobs
                jobsIdList.slice(0, 6);

                // Request job data for every job id
                const data = await Promise.all(
                    jobsIdList.map((jobId) => {
                        fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`)
                        .then((response) => {
                            response.json();
                        });
                    })
                );
            }

        }

        jobsData = getJobsData();

        setLoading(false);
        console.log(jobsData);

    }, []);

    return (
        <div>123</div>
    );
}