import { useEffect, useState } from 'react';
import Card from './Card';
import './JobBoard.css';

const ITEMS_ON_PAGE = {
  0: 6,
  1: 12,
  2: 18,
};

export default function JobBoard() {
  const [isLoading, setLoading] = useState(true);
  const [allJobs, setAllJobs] = useState([]);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [jobsIdList, setJobsId] = useState();
  const [page, setPage] = useState(0);

  function moreButtonHandler() {
    if (allJobs.length > jobsIdList.length) {
      setPage(page + 1);
      const newPortion = allJobs.slice(
        ITEMS_ON_PAGE[page - 1],
        ITEMS_ON_PAGE[page]
      );
      getJobsById(newPortion).then((newJobs) => {
        // Add new loaded jobs to already existed
        setCurrentJobs([...newJobs, ...currentJobs]);
      });
    }
  }

  function getJobsList() {
    // Get ids of current vacancies
    return fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  function getJobsById(jobsIdList) {
    // Request job data for every job id
    return Promise.all(
      jobsIdList.map((jobId) => {
        return fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`)
          .then((response) => response.json())
          .catch((error) => {
            console.error(error);
            throw error;
          });
      })
    );
  }

  useEffect(() => {
    getJobsList()
      .then((list) => {
        setAllJobs(list);

        // Check if Ids exists
        if (list && list.length) {
          // Get only first 6 jobs of all existed jobs
          const firstPage = list.slice(0, ITEMS_ON_PAGE[page]);

          setPage(page);

          // Save ids to omit unnecessary request to call getJobsList by clicking load more
          setJobsId(firstPage);

          return getJobsById(firstPage);
        }
      })
      .then((result) => {
        setCurrentJobs(result);
      });
  }, []);

  return (
    <>
      {currentJobs.map((job) => (
        <Card job={job} key={job.id} />
      ))}
      <button onClick={moreButtonHandler}>Load more</button>
    </>
  );
}
