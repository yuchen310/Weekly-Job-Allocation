import React, { useState } from 'react';
import { Staff } from '../utils/types';
import { PlusIcon, EditIcon, TrashIcon } from 'lucide-react';
interface UserManagementProps {
  users: Staff[];
  onAddUser: (user: Omit<Staff, 'id'>) => void;
  onUpdateUser: (id: string, user: Partial<Staff>) => void;
  onDeleteUser: (id: string) => void;
}
const UserManagement: React.FC<UserManagementProps> = ({
  users,
  onAddUser,
  onUpdateUser,
  onDeleteUser
}) => {
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    preferences: '',
    maxWorkload: 40
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      name: formData.name,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      preferences: formData.preferences.split(',').map(p => p.trim()).filter(Boolean),
      availability: {},
      workload: 0,
      maxWorkload: formData.maxWorkload
    };
    if (editingUserId) {
      onUpdateUser(editingUserId, userData);
      setEditingUserId(null);
    } else {
      onAddUser(userData);
      setIsAddingUser(false);
    }
    setFormData({
      name: '',
      skills: '',
      preferences: '',
      maxWorkload: 40
    });
  };
  const handleEdit = (user: Staff) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name,
      skills: user.skills.join(', '),
      preferences: user.preferences.join(', '),
      maxWorkload: user.maxWorkload
    });
    setIsAddingUser(true);
  };
  const handleCancel = () => {
    setIsAddingUser(false);
    setEditingUserId(null);
    setFormData({
      name: '',
      skills: '',
      preferences: '',
      maxWorkload: 40
    });
  };
  return <div className="space-y-6">
      {/* Add/Edit User Form */}
      {isAddingUser && <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingUserId ? 'Edit User' : 'Add New User'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input type="text" value={formData.name} onChange={e => setFormData({
            ...formData,
            name: e.target.value
          })} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills (comma-separated)
              </label>
              <input type="text" value={formData.skills} onChange={e => setFormData({
            ...formData,
            skills: e.target.value
          })} placeholder="e.g., Driving, Customer Service, Maintenance" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferences (comma-separated)
              </label>
              <input type="text" value={formData.preferences} onChange={e => setFormData({
            ...formData,
            preferences: e.target.value
          })} placeholder="e.g., Morning Shift, Driving" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Workload (hours)
              </label>
              <input type="number" value={formData.maxWorkload} onChange={e => setFormData({
            ...formData,
            maxWorkload: Number(e.target.value)
          })} min="0" max="168" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex justify-end space-x-3">
              <button type="button" onClick={handleCancel} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                {editingUserId ? 'Update User' : 'Add User'}
              </button>
            </div>
          </form>
        </div>}
      {/* User List */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
          {!isAddingUser && <button onClick={() => setIsAddingUser(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
              <PlusIcon className="h-4 w-4 mr-1" />
              Add User
            </button>}
        </div>
        <div className="space-y-3">
          {users.map(user => <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-md">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Skills:</span>{' '}
                  {user.skills.join(', ')}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Workload:</span> {user.workload}
                  /{user.maxWorkload} hours
                </p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(user)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors" title="Edit user">
                  <EditIcon className="h-4 w-4" />
                </button>
                <button onClick={() => {
              if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
                onDeleteUser(user.id);
              }
            }} className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors" title="Delete user">
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default UserManagement;