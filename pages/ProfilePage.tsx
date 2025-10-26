import React from 'react';
import { User } from '../types';
import { UserIcon } from '../components/icons/UserIcon';
import { BuildingOfficeIcon } from '../components/icons/BuildingOfficeIcon';
import { AtSymbolIcon } from '../components/icons/AtSymbolIcon';
import { PhoneIcon } from '../components/icons/PhoneIcon';
import { MapPinIcon } from '../components/icons/MapPinIcon';
import { RecycleIcon } from '../components/icons/RecycleIcon';

interface ProfilePageProps {
  user: User;
}

const ProfileDetail: React.FC<{ icon: React.ReactNode; label: string; value?: string }> = ({ icon, label, value }) => (
  value ? (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 text-brand-green-700 mt-1">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-brand-brown-700">{label}</p>
        <p className="text-lg text-brand-green-900">{value}</p>
      </div>
    </div>
  ) : null
);

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg animate-fade-in">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <div className="flex-shrink-0 w-32 h-32 bg-brand-green-100 rounded-full flex items-center justify-center border-4 border-brand-green-200">
          <UserIcon className="w-20 h-20 text-brand-green-600" />
        </div>
        <div className="text-center md:text-left flex-grow">
          <h1 className="text-4xl font-bold text-brand-green-800">{user.fullName}</h1>
          <p className="text-xl text-brand-brown-800 capitalize">{user.role === 'provider' ? 'Waste Provider' : 'Researcher / Innovator'}</p>
          <p className="mt-2 text-md text-brand-brown-600 flex items-center justify-center md:justify-start gap-2">
            <BuildingOfficeIcon className="w-5 h-5" />
            <span>{user.organization}</span>
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-semibold text-brand-green-900 mb-6">User Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <ProfileDetail icon={<AtSymbolIcon className="w-6 h-6" />} label="Email ID" value={user.email} />
          <ProfileDetail icon={<PhoneIcon className="w-6 h-6" />} label="Phone Number" value={user.phone} />
          <ProfileDetail icon={<MapPinIcon className="w-6 h-6" />} label="Location" value={user.location} />
          <ProfileDetail icon={<RecycleIcon className="w-6 h-6" />} label="Field Type" value={user.fieldType} />
          <ProfileDetail icon={<UserIcon className="w-6 h-6" />} label="User Category" value={user.userCategory} />
          {user.wasteType && (
            <ProfileDetail icon={<RecycleIcon className="w-6 h-6" />} label="Primary Waste Type" value={user.wasteType} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
