"use client";

import { useEffect, useState } from 'react';
import { fetchStats, getStatsByJobId } from '../../services/api';
import { useRouter } from 'next/navigation';
import withAuth from '../../components/hocs/withAuth.js';

const StatsPage = () => {
    const [stats, setStats] = useState([]);
    const [searchJobId, setSearchJobId] = useState('');
    const [searchedStat, setSearchedStat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchStats();
                console.log('Fetched stats:', data); // Log the fetched data
                setStats(data);
            } catch (err) {
                console.error('Error fetching stats:', err);
                setError('Failed to fetch stats. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSearch = async () => {
        if (searchJobId) {
            try {
                const result = await getStatsByJobId(searchJobId);
                setSearchedStat(result);
                setError(null); // Clear any previous errors
            } catch (err) {
                console.error('Error fetching stat by Job ID:', err);
                setError('Failed to fetch stat. Please check the Job ID and try again.');
                setSearchedStat(null); // Clear previous search results
            }
        }
    };

    const handleRowClick = (jobId) => {
        router.push(`/stats/${jobId}`);
    };

    return (
        <div className="stats-page">
            <h1>All Stats</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter Job ID to search"
                    value={searchJobId}
                    onChange={(e) => setSearchJobId(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {loading ? (
                <p>Loading stats...</p>
            ) : error ? (
                <p className="error-message">{error}</p> // Display error message
            ) : searchedStat ? (
                <div onClick={() => handleRowClick(searchedStat.job_id)} className="searched-stat">
                    <h2>Stats for Job ID: {searchedStat.job_id}</h2>
                    <p><strong>Created At:</strong> {new Date(searchedStat.created_at).toLocaleString()}</p>
                    <p><strong>Errors:</strong> {searchedStat.errors}</p>
                    <p><strong>Unique IPs:</strong> {searchedStat.unique_ips ? searchedStat.unique_ips.join(', ') : 'No unique IPs'}</p>
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Job ID</th>
                            <th>Created At</th>
                            <th>Errors</th>
                            <th>Unique IPs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(stats) && stats.length > 0 ? (
                            stats.map((stat) => (
                                <tr key={stat.job_id} onClick={() => handleRowClick(stat.job_id)}>
                                    <td>{stat.job_id}</td>
                                    <td>{new Date(stat.created_at).toLocaleString()}</td>
                                    <td>{stat.errors}</td>
                                    <td>{stat.unique_ips.length}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No stats available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default withAuth(StatsPage);