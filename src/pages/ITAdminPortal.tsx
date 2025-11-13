import React from 'react';
import UserManagement from '../components/UserManagement';
import { staffMembers } from '../utils/mockData';
import { Staff } from '../utils/types';
const ITAdminPortal: React.FC = () => {
  const handleAddUser = (userData: Omit<Staff, 'id'>) => {
    const newUser: Staff = {
      id: `staff${staffMembers.length + 1}`,
      ...userData
    };
    staffMembers.push(newUser);
  };
  const handleUpdateUser = (id: string, userData: Partial<Staff>) => {
    const userIndex = staffMembers.findIndex(s => s.id === id);
    if (userIndex !== -1) {
      staffMembers[userIndex] = {
        ...staffMembers[userIndex],
        ...userData
      };
    }
  };
  const handleDeleteUser = (id: string) => {
    const userIndex = staffMembers.findIndex(s => s.id === id);
    if (userIndex !== -1) {
      staffMembers.splice(userIndex, 1);
    }
  };
  return <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">IT Admin Portal</h1>
        <p className="text-gray-600">Manage system users and their details</p>
      </header>
      <UserManagement users={staffMembers} onAddUser={handleAddUser} onUpdateUser={handleUpdateUser} onDeleteUser={handleDeleteUser} />
    </div>;
};
export default ITAdminPortal;