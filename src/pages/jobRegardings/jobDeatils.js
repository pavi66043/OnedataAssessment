import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Modal from 'react-modal';
import AsyncSelect from 'react-select/async';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const JobDetailsTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [appliedJobIndex, setAppliedJobIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);

    const jobData = [
        {
            logo: 'https://via.placeholder.com/100',
            title: 'Software Engineer',
            companyName: 'Tech Solutions Inc.',
            experience: 3,
            skills: ['JavaScript', 'React', 'Node.js', 'CSS'],
            description: 'We are looking for a Software Engineer with experience in React and Node.js.',
        },
        {
            logo: 'https://via.placeholder.com/100',
            title: 'Frontend Developer',
            companyName: 'Web Innovations',
            experience: 2,
            skills: ['HTML', 'CSS', 'JavaScript'],
            description: 'Seeking a creative Frontend Developer to join our team.',
        },
        {
            logo: 'https://via.placeholder.com/100',
            title: 'Backend Developer',
            companyName: 'API Solutions',
            experience: 4,
            skills: ['Node.js', 'MongoDB', 'Express'],
            description: 'Looking for a skilled Backend Developer to work on our APIs.',
        },
    ];

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter jobs based on the search term
    const filteredJobs = jobData.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        skills: Yup.array().min(1, 'Select at least one skill').required(),
        aboutMe: Yup.string().required('About Me is required'),
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const openModal = (index) => {
        setSelectedJob(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    const onSubmit = (data) => {
        console.log(data);
        setAppliedJobIndex(selectedJob);
        closeModal();
        reset();
    };

    // Sample skills data for multi-select
    const skillsOptions = [
        { value: 'JavaScript', label: 'JavaScript' },
        { value: 'React', label: 'React' },
        { value: 'Node.js', label: 'Node.js' },
        { value: 'CSS', label: 'CSS' },
        { value: 'HTML', label: 'HTML' },
        { value: 'MongoDB', label: 'MongoDB' },
        { value: 'SQL', label: 'SQL' },
    ];

    // Async options for skills
    const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            const filtered = skillsOptions.filter(skill =>
                skill.label.toLowerCase().includes(inputValue.toLowerCase())
            );
            callback(filtered);
        }, 1000);
    };

    return (
        <div className="job-details-table">

            <div className='container'>
                <header className="header d-flex justify-content-between align-items-center w-100">
                    <h1 className="portal-heading">Job Portal</h1>
                    <div className="user-icon-container">
                        <Link to="/admin" className="user-icon" style={{ textDecoration: 'none', color: '#333', textAlign: 'center' }}>
                            <FaUser size={40} />
                            <span className="admin-label">Admin</span>
                        </Link>
                    </div>

                </header>
            </div>


            {/* Search Input */}
            <div className="search-input-container">
                <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            {/* Job Details */}
            {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                    <div key={index} className="job-card">
                        <table className="job-details-table">
                            <tbody>
                                <tr>
                                    <td className="table-header"><strong>Company Logo</strong></td>
                                    <td className="table-content">
                                        <img src={job.logo} alt={`${job.companyName} Logo`} className="company-logo" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header"><strong>Job Title</strong></td>
                                    <td className="table-content">{job.title}</td>
                                </tr>
                                <tr>
                                    <td className="table-header"><strong>Company Name</strong></td>
                                    <td className="table-content">{job.companyName}</td>
                                </tr>
                                <tr>
                                    <td className="table-header"><strong>Experience Required</strong></td>
                                    <td className="table-content">{job.experience} years</td>
                                </tr>
                                <tr>
                                    <td className="table-header"><strong>Skills Required</strong></td>
                                    <td className="table-content">
                                        {job.skills.map((skill, idx) => (
                                            <span key={idx} className="skill-tag">{skill}</span>
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header"><strong>Job Description</strong></td>
                                    <td className="table-content">{job.description}</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Apply Button */}
                        <div className="apply-section">
                            {appliedJobIndex === index ? (
                                <span className="applied-tag">Applied</span>
                            ) : (
                                <button onClick={() => openModal(index)} className="apply-btn">Apply for Job</button>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p>No jobs found.</p>
            )}

            {/* Modal for Apply Form */}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Apply for Job">
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Apply for Job</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
                            <div className="col-6">
                                <label>First Name</label>
                                <input {...register('firstName')} />
                                {errors.firstName && <p className="error">{errors.firstName.message}</p>}
                            </div>
                            <div className="col-6">
                                <label>Last Name</label>
                                <input {...register('lastName')} />
                                {errors.lastName && <p className="error">{errors.lastName.message}</p>}
                            </div>
                            <div className="col-6">
                                <label>Email</label>
                                <input type="email" {...register('email')} />
                                {errors.email && <p className="error">{errors.email.message}</p>}
                            </div>
                            <div className="col-6">
                                <label>Skills</label>
                                <Controller
                                    name="skills"
                                    control={control}
                                    render={({ field }) => (
                                        <AsyncSelect
                                            isMulti
                                            cacheOptions
                                            defaultOptions={skillsOptions}
                                            loadOptions={loadOptions}
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.skills && <p className="error">{errors.skills.message}</p>}
                            </div>
                            <div className="col-12">
                                <label>About Me</label>
                                <Controller
                                    name="aboutMe"
                                    control={control}
                                    render={({ field }) => <ReactQuill {...field} />}
                                />
                                {errors.aboutMe && <p className="error">{errors.aboutMe.message}</p>}
                            </div>
                            <div className="col-12 button-group">
                                <button type="submit" className="submit-btn">Submit</button>
                                <button type="button" onClick={closeModal} className="cancel-btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default JobDetailsTable;
