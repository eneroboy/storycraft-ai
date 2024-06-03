import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/admin.css';

const apiUrl = process.env.REACT_APP_API_URL;

const AdminPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`  // Prepare the Authorization header
        };
    
        axios.get(`${apiUrl}/users`, { headers })
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const saveUserRole = (userId, userName) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`  // Prepare the Authorization header
        };
        const roleSelect = document.querySelector(`.user-role-select[data-userid="${userId}"]`);
        const selectedRole = roleSelect.value;

        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('user_role', selectedRole);

        axios.post(`${apiUrl}/users`, formData, { headers })
            .then(response => {
                alert(`Role for ${userName} updated to ${selectedRole}`);
            })
            .catch(error => console.error('Error updating user role:', error));
    };

    return (
        <div className="content-admin">
            <h1>Users</h1>
            <div id="users-list">
                <table id="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Photo</th>
                            <th>Email</th>
                            <th>Account Created</th>
                            <th>Last Login</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => {
                            // Determine the current role
                            const currentRole = user.userRoles[0]?.role?.roleName || 'parent';
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td><img src={user.photoPath} alt="User" className="user-photo" /></td>
                                    <td>{user.email}</td>
                                    <td>{user.createdAt}</td>
                                    <td>{user.lastLogin}</td>
                                    <td>
                                        <select className="user-role-select" data-userid={user.id} defaultValue={currentRole}>
                                            <option value="admin">Admin</option>
                                            <option value="parent">Parent</option>
                                            <option value="child">Child</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button className="save-btn" onClick={() => saveUserRole(user.id, user.email)}>Save</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;
