import React, { useState } from 'react';

const JobTable = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [jobs, setJobs] = useState([
        { id: 1, title: 'Frontend Developer', company: 'Company A' },
        { id: 2, title: 'Backend Developer', company: 'Company B' },
        { id: 3, title: 'Full Stack Developer', company: 'Company C' },
    ]);
    const [newJob, setNewJob] = useState({ title: '', company: '' });
    const [editJobId, setEditJobId] = useState(null);
    const [editJob, setEditJob] = useState({ title: '', company: '' });

    const handleLogin = (e) => {
        e.preventDefault();
        const adminUsername = 'admin';
        const adminPassword = 'password';

        if (username === adminUsername && password === adminPassword) {
            setIsAuthenticated(true);
        } else {
            alert('Invalid credentials! Please try again.');
        }
    };

    const handleAddJob = () => {
        if (newJob.title && newJob.company) {
            setJobs([...jobs, { id: jobs.length + 1, title: newJob.title, company: newJob.company }]);
            setNewJob({ title: '', company: '' });
        }
    };

    const handleEditJob = (job) => {
        setEditJobId(job.id);
        setEditJob({ title: job.title, company: job.company });
    };

    const handleSaveEditJob = () => {
        setJobs(jobs.map((job) => (job.id === editJobId ? { ...job, title: editJob.title, company: editJob.company } : job)));
        setEditJobId(null);
        setEditJob({ title: '', company: '' });
    };

    const handleDeleteJob = (id) => {
        setJobs(jobs.filter((job) => job.id !== id));
    };

    if (!isAuthenticated) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                padding: '20px'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <h2>Admin Login</h2>
                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '10px' }}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                style={{ padding: '5px', marginRight: '10px' }}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ padding: '5px', marginRight: '10px' }}
                            />
                            <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );

    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Job Listings</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Job Title"
                        value={newJob.title}
                        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                        style={{ marginRight: '10px', padding: '5px' }}
                    />
                    <input
                        type="text"
                        placeholder="Company"
                        value={newJob.company}
                        onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                        style={{ marginRight: '10px', padding: '5px' }}
                    />
                    <button onClick={handleAddJob} style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        + Add Job
                    </button>
                </div>
            </div>

            {/* Job table */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', borderBottom: '2px solid #ddd', padding: '10px' }}>Job Title</th>
                        <th style={{ textAlign: 'left', borderBottom: '2px solid #ddd', padding: '10px' }}>Company</th>
                        <th style={{ textAlign: 'center', borderBottom: '2px solid #ddd', padding: '10px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job) => (
                        <tr key={job.id}>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                {editJobId === job.id ? (
                                    <input
                                        type="text"
                                        value={editJob.title}
                                        onChange={(e) => setEditJob({ ...editJob, title: e.target.value })}
                                        style={{ padding: '5px' }}
                                    />
                                ) : (
                                    job.title
                                )}
                            </td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                {editJobId === job.id ? (
                                    <input
                                        type="text"
                                        value={editJob.company}
                                        onChange={(e) => setEditJob({ ...editJob, company: e.target.value })}
                                        style={{ padding: '5px' }}
                                    />
                                ) : (
                                    job.company
                                )}
                            </td>
                            <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                                {editJobId === job.id ? (
                                    <button
                                        onClick={handleSaveEditJob}
                                        style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEditJob(job)}
                                            style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteJob(job.id)}
                                            style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobTable;
