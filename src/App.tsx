import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import JobAllocationPage from './pages/JobAllocationPage';
import StaffPortal from './pages/StaffPortal';
import ITAdminPortal from './pages/ITAdminPortal';
type UserRole = 'manager' | 'staff' | 'itadmin';
import UserManagement from './components/UserManagement';
import { getStaffMembers, addStaff, updateStaff, deleteStaff } from './utils/mockData';

<UserManagement
  users={getStaffMembers()}
  onAddUser={addStaff}
  onUpdateUser={updateStaff}
  onDeleteUser={deleteStaff}
/>
export function App() {
  const [userRole, setUserRole] = useState<UserRole>('manager');
  return <BrowserRouter>
      <div className="w-full min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <h1 className="text-xl font-bold text-blue-600">
                  Train Company
                </h1>
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">
                    Role:
                  </label>
                  <select value={userRole} onChange={e => setUserRole(e.target.value as UserRole)} className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="manager">Manager</option>
                    <option value="staff">Staff</option>
                    <option value="itadmin">IT Admin</option>
                  </select>
                </div>
                <div className="flex space-x-4">
                  {userRole === 'manager' && <>
                      <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                        Dashboard
                      </Link>
                      <Link to="/allocate" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                        Job Allocation
                      </Link>
                    </>}
                  {userRole === 'staff' && <Link to="/staff" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                      My Portal
                    </Link>}
                  {userRole === 'itadmin' && <Link to="/admin" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                      User Management
                    </Link>}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={userRole === 'manager' ? <Dashboard /> : <div className="container mx-auto px-4 py-8">
                  <p className="text-gray-600">
                    Please select Manager role to access Dashboard
                  </p>
                </div>} />
          <Route path="/allocate" element={userRole === 'manager' ? <JobAllocationPage /> : <div className="container mx-auto px-4 py-8">
                  <p className="text-gray-600">
                    Please select Manager role to access Job Allocation
                  </p>
                </div>} />
          <Route path="/staff" element={userRole === 'staff' ? <StaffPortal /> : <div className="container mx-auto px-4 py-8">
                  <p className="text-gray-600">
                    Please select Staff role to access Staff Portal
                  </p>
                </div>} />
          <Route path="/admin" element={userRole === 'itadmin' ? <ITAdminPortal /> : <div className="container mx-auto px-4 py-8">
                  <p className="text-gray-600">
                    Please select IT Admin role to access User Management
                  </p>
                </div>} />
        </Routes>
      </div>
    </BrowserRouter>;
}