import React, { useContext, useEffect, useState } from "react";
import "./InstructorDashboard.css";
import { Link, useNavigate } from "react-router-dom";

import { getPurchaseStatsAPI } from "../services/allAPI";

const InstructorDashboard = () => {
    const [stats, setStats] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchStats = async () => {
            const response = await getPurchaseStatsAPI();
            if (response?.status === 200) {
                setStats(response.data);
            }
        };
        fetchStats();
    }, []);

    

  const handleLogout = () => {
    sessionStorage.clear();  // Clears token and user info
    navigate('/login');
  };
    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar">
                <h2 className="sidebar-title">Instructor</h2>
                <ul className="sidebar-menu">
                    <li className="menu-item active  "><Link to={'/instructorDashboard'} className="text-decoration-none text-light" >Dashboard</Link></li>
                    <li className="menu-item"><Link to={'/instructorcourses'} className="text-decoration-none text-light" >Courses</Link></li>
                    <li className="menu-item"><Link to={'/'} className="text-decoration-none text-light" onClick={handleLogout} >Logout</Link></li>

                </ul>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Top Navbar */}
                <div className="navbar ">
                    <h2 className="">Dashboard</h2>

                </div>

                {/* Dashboard Stats */}
                <div className="stats mt-5">

                    {/* <div className="row">
                        <div className="col-lg-5 shadow rounded ">
                            <div className="stat-card">
                                <h3>Total Students</h3>
                                <p>120</p>
                            </div>

                        </div>
                        <div className="col-lg-2"></div>
                        <div className="col-lg-5 shadow rounded ">
                            <div className="stat-card">
                                <h3>Revenue</h3>
                                <p>$2,500</p>
                            </div>
                        </div>
                    </div> */}

                </div>

                {/* Quick Actions */}
                <div className="quick-actions mt-5">
                    <h2>Students List</h2>
                    <div class="table-container">
                        <table class="responsive-table">
                            <thead>
                                <tr>
                                    <th>Course Name</th>
                                    <th>Students Purchased</th>
                                    <th>Total Revenue (INR)</th>
                                </tr>
                            </thead>
                             <tbody>
                                {
                                    stats.filter(stat => stat.courseTitle).map(stat => (
                                        <tr key={stat._id}>
                                            <td>{stat.courseTitle}</td>
                                            <td>{stat.totalStudents}</td>
                                            <td>{stat.totalRevenue}</td>
                                        </tr>

                                    ))
                                }


                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default InstructorDashboard;
