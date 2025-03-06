"use client"

import React, { useEffect, useState } from 'react'; 
import { getStatsByJobId } from '../../../services/api';
import { useRouter } from 'next/navigation';
import withAuth from '../../../components/hocs/withAuth.js'


const JobStatsPage = ({ params }) => {
    const { jobId } = React.use(params); 
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getStatsByJobId(jobId);
            setStats(data);
        };
        fetchData();
    }, [jobId]);

    if (!stats) return <p>Loading...</p>;

    return (
        <div className="job-stats-page">
            <h1>Stats for Job ID: {stats.job_id}</h1>
            <p><strong>Created At:</strong> {new Date(stats.created_at).toLocaleString()}</p>
            <p><strong>Errors:</strong> {stats.errors}</p>
            <p><strong>Unique IPs:</strong> {stats.unique_ips ? stats.unique_ips.join(', ') : 'No unique IPs'}</p>
        </div>
    );
};

export default withAuth(JobStatsPage);