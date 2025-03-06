"use client"; 

import { useEffect, useState } from 'react';
import { getQueueStatus } from '../../services/api';
import withAuth from '../../components/hocs/withAuth.js'


const QueuePage = () => {
    const [queueStatus, setQueueStatus] = useState({});

    const fetchQueueStatus = async () => {
        const status = await getQueueStatus();
        setQueueStatus(status);
    };

    useEffect(() => {
        fetchQueueStatus();
    }, []);

    return (
        <div className="queue-page">
            <h1>Queue Status</h1>
            <div className="refresh-container">
                <button onClick={fetchQueueStatus} className="refresh-button">
                    🔄 {/* You can replace this with an icon from a library */}
                </button>
            </div>
            <p>Active Jobs: {queueStatus.activeJobs}</p>
            <p>Waiting Jobs: {queueStatus.waitingJobs}</p>
            <p>Failed Jobs: {queueStatus.failedJobs}</p>
        </div>
    );
};

export default withAuth(QueuePage);