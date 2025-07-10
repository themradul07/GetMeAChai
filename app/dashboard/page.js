'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getuserdetails, updateProfile } from '@/actions/useractions';
import { toast } from 'sonner';

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [details, setDetails] = useState({
    name: '',
    email: '',
    username: '',
    profilePicture: '',
    coverPicture: '',
    razorpayKey: '',
    razorpaySecret: '',
    Bio: '',
    thumbnail:'',
    category : '',
  });

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }
    document.title = 'Dashboard - Get Me A Chai';
    fetchDashboard(session?.user?.name);
  }, [session, router]);

  const fetchDashboard = async (username) => {
    if (!username) return;
    const response = await getuserdetails(username);
    if (response) {
      setDetails(response);
    } else {
      toast.error('Failed to fetch user details');
    }
  };

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile(details.username, details);
      if (response.ok) {
        toast.success('User details updated successfully!', {
          description: 'Your details have been saved.',
        });
      } else {
        toast.error('Failed to update user details');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full max-w-lg p-6 rounded-lg bg-slate-800 shadow-md"
      >
        {[
          { id: 'name', label: 'Name', type: 'text' },
          { id: 'Bio', label: 'Bio', type: 'text' },
          { id: 'email', label: 'Email', type: 'text', disabled: true },
          { id: 'profilePicture', label: 'Profile Picture URL', type: 'text' },
          { id: 'coverPicture', label: 'Cover Picture URL', type: 'text' },
          { id: 'thumbnail', label: 'Thumbnail URL', type: 'text' },
          { id: 'Category', label: 'Category', type: 'text' },
          { id: 'razorpayKey', label: 'Razorpay Key', type: 'text' },
          { id: 'razorpaySecret', label: 'Razorpay Secret', type: 'text' },
        ].map(({ id, label, type, disabled }) => (
          <div key={id}>
            <label htmlFor={id} className="block mb-1 text-sm font-medium text-white">
              {label}
            </label>
            <input
              type={type}
              id={id}
              disabled={disabled}
              value={details[id] || ''}
              onChange={handleChange}
              className={`bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500 ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            />
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
