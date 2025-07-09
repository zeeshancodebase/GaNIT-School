import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './LearningJourney.css'; 

const LearningJourney = () => {
    return (
        <section className="learning-section">
            <div className="learning-container">
                {/* Title */}
                <div className="learning-header">
                    <h2>
                        Your <span className="highlight">Learning Journey</span>
                    </h2>
                    <p>
                        Track your progress, earn certificates, and build your career portfolio
                    </p>
                </div>

                {/* Dashboard */}
                <div className="dashboard-wrapper">
                    <div className="dashboard">
                        {/* Left: Student Dashboard */}
                        <div className="dashboard-left">
                            <div className="student-dashboard">
                                <h3>Student Dashboard</h3>

                                <div className="progress-section">
                                    {/* Progress Bars */}
                                    {[
                                        {
                                            title: 'Python Programming Masterclass',
                                            percent: 68
                                        },
                                        {
                                            title: 'Resume Completion',
                                            percent: 85
                                        }
                                    ].map(({ title, percent }) => (
                                        <div key={title} className="progress-item">
                                            <div className="progress-label">
                                                <h4>{title}</h4>
                                                <span>{percent}% Complete</span>
                                            </div>
                                            <div className="progress-bar-bg">
                                                <div
                                                    className="progress-bar-fill"
                                                    style={{ width: `${percent}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    {/* Upcoming Sessions */}
                                    <div className="sessions">
                                        <h4>Upcoming Sessions</h4>
                                        <div className="sessions-list">
                                            {[
                                                {
                                                    date: 'JUN 15',
                                                    title: 'Advanced Python Concepts',
                                                    time: '10:00 AM - 12:00 PM'
                                                },
                                                {
                                                    date: 'JUN 18',
                                                    title: 'Mock Interview Session',
                                                    time: '2:00 PM - 3:30 PM'
                                                }
                                            ].map(({ date, title, time }) => (
                                                <div key={title} className="session-item">
                                                    <div className="session-date">
                                                        <span>{date.split(' ')[0]}</span>
                                                        <span>{date.split(' ')[1]}</span>
                                                    </div>
                                                    <div className="session-info">
                                                        <h5>{title}</h5>
                                                        <p>{time}</p>
                                                    </div>
                                                    <button className="join-button">Join</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Achievements */}
                        <div className="dashboard-right">
                            <div className="achievements">
                                <h3>Your Achievements</h3>
                                <div className="badges">
                                    {[
                                        { name: 'Python', icon: <FaCheckCircle className="icon green" /> },
                                        { name: 'HTML/CSS', icon: <FaCheckCircle className="icon green" /> },
                                        { name: 'JavaScript', icon: <FaCheckCircle className="icon gray" /> }
                                    ].map(({ name, icon }) => (
                                        <div key={name} className="badge">
                                            <div>{icon}</div>
                                            <span>{name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LearningJourney;
