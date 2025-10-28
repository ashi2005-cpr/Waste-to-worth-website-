import React, { useState } from 'react';
import { RecycleIcon } from '../components/icons/RecycleIcon';
import { HandshakeIcon } from '../components/icons/HandshakeIcon';
import { Page, User, UserRole } from '../types';
import { UserIcon } from '../components/icons/UserIcon';
import { BuildingOfficeIcon } from '../components/icons/BuildingOfficeIcon';
import { AtSymbolIcon } from '../components/icons/AtSymbolIcon';
import { LockClosedIcon } from '../components/icons/LockClosedIcon';
import { PhoneIcon } from '../components/icons/PhoneIcon';
import { MapPinIcon } from '../components/icons/MapPinIcon';
import { EyeIcon } from '../components/icons/EyeIcon';
import { EyeOffIcon } from '../components/icons/EyeOffIcon';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
  login: (user: User) => void;
}

interface InputFieldProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ icon, children }) => (
  <div className="relative">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-brown-400 pointer-events-none">
      {icon}
    </span>
    {children}
  </div>
);

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage, login }) => {
  const [role, setRole] = useState<'provider' | 'researcher'>('provider');
  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [fieldType, setFieldType] = useState('');
  const [userCategory, setUserCategory] = useState('');
  const [wasteType, setWasteType] = useState('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      fullName,
      organization,
      email,
      phone,
      location,
      fieldType,
      userCategory,
      role: role === 'provider' ? UserRole.Provider : UserRole.Researcher,
      wasteType: role === 'provider' ? wasteType : undefined,
    };
    login(newUser);
  };

  const handleGetStartedClick = () => {
    const registerSection = document.getElementById('register-section');
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-12 animate-fade-in">
      <section className="bg-white/60 p-8 md:p-12 rounded-xl shadow-lg">
          <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-brand-green-900 mb-4 tracking-tight leading-tight">
                  Turning Bio-Waste into Bio-Wealth
              </h1>
              <p className="text-lg md:text-xl text-brand-brown-800 mb-8">
                  Connecting waste producers with biotech innovators.
              </p>
              <button 
                onClick={handleGetStartedClick}
                className="w-auto bg-brand-green-600 text-white font-bold py-3 px-8 rounded-md hover:bg-brand-green-700 transition-transform transform hover:scale-105 duration-300 shadow-md">
                Get Started
              </button>
          </div>
          <div className="mt-12 pt-8 border-t border-brand-green-200/50">
             <div className="flex flex-col md:flex-row justify-center items-center text-center gap-8 md:gap-16">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 bg-brand-green-100 p-2 rounded-full">
                    <RecycleIcon className="w-6 h-6 text-brand-green-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-brand-green-900">200+</p>
                    <p className="text-md text-brand-brown-800">Waste saved</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 bg-brand-green-100 p-2 rounded-full">
                    <UserIcon className="w-6 h-6 text-brand-green-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-brand-green-900">50+</p>
                    <p className="text-md text-brand-brown-800">Users connected</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 bg-brand-green-100 p-2 rounded-full">
                    <HandshakeIcon className="w-6 h-6 text-brand-green-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-brand-green-900">10+</p>
                    <p className="text-md text-brand-brown-800">collaborations</p>
                  </div>
                </div>
            </div>
          </div>
      </section>

      <section className="bg-white p-8 md:p-12 rounded-xl shadow-lg">
         <h2 className="text-3xl font-bold text-center text-brand-green-900 mb-10">How It Works</h2>
         <div className="flex flex-col md:flex-row justify-around items-start text-center gap-8">
            <div className="flex flex-col items-center max-w-xs mx-auto">
              <div className="flex items-center justify-center bg-brand-green-100 rounded-full h-16 w-16 mb-4 border-4 border-brand-green-200">
                 <span className="text-3xl font-bold text-brand-green-700">1</span>
              </div>
              <h3 className="text-xl font-semibold text-brand-green-800 mb-2">Post Your Waste</h3>
              <p className="text-brand-brown-800">Providers list available bio-waste with details like type, quantity, and location. Our AI can even help categorize it from a photo!</p>
            </div>
             <div className="flex flex-col items-center max-w-xs mx-auto">
               <div className="flex items-center justify-center bg-brand-green-100 rounded-full h-16 w-16 mb-4 border-4 border-brand-green-200">
                 <span className="text-3xl font-bold text-brand-green-700">2</span>
              </div>
              <h3 className="text-xl font-semibold text-brand-green-800 mb-2">Discover & Search</h3>
              <p className="text-brand-brown-800">Researchers and innovators search our database using advanced filters and geo-mapping to find the perfect resources for their projects.</p>
            </div>
             <div className="flex flex-col items-center max-w-xs mx-auto">
              <div className="flex items-center justify-center bg-brand-green-100 rounded-full h-16 w-16 mb-4 border-4 border-brand-green-200">
                 <span className="text-3xl font-bold text-brand-green-700">3</span>
              </div>
              <h3 className="text-xl font-semibold text-brand-green-800 mb-2">Connect & Collaborate</h3>
              <p className="text-brand-brown-800">Use our secure platform to connect, chat, and arrange the logistics for turning waste into a valuable new product.</p>
            </div>
         </div>
      </section>

      <section id="register-section" className="bg-brand-brown-50 p-8 md:p-12 rounded-xl shadow-lg scroll-mt-24">
        <h2 className="text-3xl font-bold text-center text-brand-green-900 mb-4">
          Join Waste2Worth Today
        </h2>
        <p className="text-lg text-brand-brown-700 text-center max-w-2xl mx-auto">Become part of the community turning waste into valuable resources. Create your account to get started.</p>

        <div className="mt-8">
            <label className="block text-sm font-medium text-brand-brown-700 mb-2 text-center">Select Your Role</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
              <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${role === 'provider' ? 'bg-brand-green-100 border-brand-green-500 ring-2 ring-brand-green-500 shadow-sm' : 'bg-white border-gray-300 hover:border-brand-green-400'}`}>
                <input type="radio" name="role" value="provider" checked={role === 'provider'} onChange={() => setRole('provider')} className="h-4 w-4 text-brand-green-600 border-gray-300 focus:ring-brand-green-500" />
                <span className="ml-3 text-sm font-semibold text-brand-brown-900">Waste Provider <span className="text-xs font-normal block text-brand-brown-600">(Industry/Lab/Farm)</span></span>
              </label>
              <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${role === 'researcher' ? 'bg-brand-green-100 border-brand-green-500 ring-2 ring-brand-green-500 shadow-sm' : 'bg-white border-gray-300 hover:border-brand-green-400'}`}>
                <input type="radio" name="role" value="researcher" checked={role === 'researcher'} onChange={() => setRole('researcher')} className="h-4 w-4 text-brand-green-600 border-gray-300 focus:ring-brand-green-500" />
                <span className="ml-3 text-sm font-semibold text-brand-brown-900">Researcher/Innovator <span className="text-xs font-normal block text-brand-brown-600">(Student/Startup)</span></span>
              </label>
            </div>
        </div>

        <form onSubmit={handleRegisterSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-8 max-w-2xl mx-auto">
          <div className="md:col-span-1">
            <InputField icon={<UserIcon className="w-5 h-5" />}>
              <input type="text" placeholder="Full Name" required value={fullName} onChange={e => setFullName(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:ring-brand-green-500 focus:border-brand-green-500 text-brand-brown-900 placeholder:text-brand-brown-500" />
            </InputField>
          </div>
          <div className="md:col-span-1">
            <InputField icon={<BuildingOfficeIcon className="w-5 h-5" />}>
              <input type="text" placeholder="Organization / Institute Name" required value={organization} onChange={e => setOrganization(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:ring-brand-green-500 focus:border-brand-green-500 text-brand-brown-900 placeholder:text-brand-brown-500" />
            </InputField>
          </div>
          <div className="md:col-span-2">
            <InputField icon={<AtSymbolIcon className="w-5 h-5" />}>
                <input type="email" placeholder="Email ID" required value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:ring-brand-green-500 focus:border-brand-green-500 text-brand-brown-900 placeholder:text-brand-brown-500" />
            </InputField>
          </div>
           <div className="md:col-span-2">
            <InputField icon={<LockClosedIcon className="w-5 h-5" />}>
                <input type={showPassword ? "text" : "password"} placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:ring-brand-green-500 focus:border-brand-green-500 text-brand-brown-900 placeholder:text-brand-brown-500" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-brand-brown-400 hover:text-brand-brown-600">
                  {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
            </InputField>
          </div>
          <div className="md:col-span-1">
            <InputField icon={<PhoneIcon className="w-5 h-5" />}>
                <input type="tel" placeholder="Phone Number (optional)" value={phone} onChange={e => setPhone(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:ring-brand-green-500 focus:border-brand-green-500 text-brand-brown-900 placeholder:text-brand-brown-500" />
            </InputField>
          </div>
          <div className="md:col-span-1">
            <InputField icon={<MapPinIcon className="w-5 h-5" />}>
                <input type="text" placeholder="Location (City, State)" required value={location} onChange={e => setLocation(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:ring-brand-green-500 focus:border-brand-green-500 text-brand-brown-900 placeholder:text-brand-brown-500" />
            </InputField>
          </div>
          <div className="md:col-span-1">
            <label htmlFor="fieldType" className="sr-only">Field Type</label>
            <select id="fieldType" required value={fieldType} onChange={e => setFieldType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-green-500 focus:border-brand-green-500 bg-white text-brand-brown-900">
              <option value="">Field Type...</option>
              <option>Agriculture</option>
              <option>Food</option>
              <option>Biotech</option>
              <option>Research</option>
              <option>Waste Mgmt</option>
            </select>
          </div>
          <div className="md:col-span-1">
            <label htmlFor="userCategory" className="sr-only">User Category</label>
            <select id="userCategory" required value={userCategory} onChange={e => setUserCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-green-500 focus:border-brand-green-500 bg-white text-brand-brown-900">
              <option value="">User Category...</option>
              <option>Industry</option>
              <option>Academic Institution</option>
              <option>Individual Researcher</option>
              <option>Farmer / SME</option>
            </select>
          </div>
          {role === 'provider' && (
            <div className="md:col-span-2 animate-fade-in">
              <label htmlFor="wasteType" className="sr-only">Waste Type (optional)</label>
              <select id="wasteType" value={wasteType} onChange={e => setWasteType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-green-500 focus:border-brand-green-500 bg-white text-brand-brown-900">
                <option value="">Waste Type (optional)...</option>
                <option>Food</option>
                <option>Lab</option>
                <option>Agricultural</option>
                <option>Plastic</option>
              </select>
            </div>
          )}
          <div className="md:col-span-2 text-center pt-4">
            <button
              type="submit"
              className="w-full text-lg font-semibold bg-brand-green-600 text-white py-3 px-6 rounded-lg hover:bg-brand-green-700 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Sign Up
            </button>
            <p className="mt-6 text-center text-sm text-brand-brown-700">
              Already have an account?{' '}
              <button type="button" onClick={() => alert('Login feature coming soon!')} className="font-medium text-brand-green-700 hover:underline">
                Login
              </button>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
};

export default HomePage;