//    "use client";

//    import { useState } from 'react';
//    import { uploadFile } from '../../services/api';
//    import { useRouter } from 'next/navigation';
//    import withAuth from '../../components/hocs/withAuth.js'


//    const UploadPage = () => {
//        const [file, setFile] = useState(null);
//        const [progress, setProgress] = useState(0);
//        const router = useRouter();

//        const handleFileChange = (e) => {
//            setFile(e.target.files[0]);
//        };

//        const handleUpload = async () => {
//            if (!file) return;

//            const formData = new FormData();
//            formData.append('file', file);

//            const response = await uploadFile(formData, (progressEvent) => {
//                const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                setProgress(percent);
//            });

//            if (response) {
//                setTimeout(() => {
//                    router.push(`/stats/${response.jobId}`); // Redirect to stats page
//                }, 2000);
//            }
//        };

//        return (
//            <div className="upload-page">
//                <h1>Upload Log File</h1>
//                <input type="file" onChange={handleFileChange} />
//                <button onClick={handleUpload}>Upload</button>
//                {progress > 0 && <div className="progress-bar" style={{ width: `${progress}%` }} />}
//            </div>
//        );
//    };

//    export default withAuth(UploadPage);


"use client";

import { useState, useEffect } from 'react';
import { uploadFile } from '../../services/api';
import { useRouter } from 'next/navigation';
import withAuth from '../../components/hocs/withAuth.js';

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [jobUpdates, setJobUpdates] = useState([]); // State to hold job updates
    const router = useRouter();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        const response = await uploadFile(formData, (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percent);
        });

        if (response) {
            // Optionally, you can store the jobId for later use
            console.log('File uploaded, jobId:', response.jobId);
        }
    };

    // WebSocket connection for live updates
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:5001'); 

        socket.onmessage = (event) => {
            const newUpdate = JSON.parse(event.data);
            console.log('Received update:', newUpdate);
            setJobUpdates((prevUpdates) => [...prevUpdates, newUpdate]);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            socket.close(); 
        };
    }, []);

    return (
        <div className="upload-page">
            <h1>Upload Log File</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {progress > 0 && <div className="progress-bar" style={{ width: `${progress}%` }} />}
            
            <h2>Live Job Updates</h2>
            <ul>
                {jobUpdates.map((update, index) => (
                    <li key={index}>
                        Job ID: {update.jobId}, Status: {update.status}
                        {update.status === 'failed' && <span> - Error: {update.error}</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default withAuth(UploadPage);