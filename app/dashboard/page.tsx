'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  UserGroupIcon, 
  CalendarIcon, 
  CurrencyDollarIcon, 
  ClipboardDocumentCheckIcon as ClipboardCheckIcon,
  ChartBarIcon,
  ArrowSmallUpIcon as ArrowSmUpIcon,
  ArrowSmallDownIcon as ArrowSmDownIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

// Mock data for the dashboard
const stats = [
  { 
    name: 'Total Patients', 
    value: '1,284', 
    icon: UserGroupIcon, 
    change: '+4.75%', 
    changeType: 'increase',
    href: '/dashboard/patients'
  },
  { 
    name: 'Appointments Today', 
    value: '12', 
    icon: CalendarIcon, 
    change: '+2.5%', 
    changeType: 'increase',
    href: '/dashboard/appointments'
  },
  { 
    name: 'Pending Records', 
    value: '8', 
    icon: ClipboardCheckIcon, 
    change: '-3.2%', 
    changeType: 'decrease',
    href: '/dashboard/records'
  },
  { 
    name: 'Revenue This Month', 
    value: '$24,500', 
    icon: CurrencyDollarIcon, 
    change: '+8.1%', 
    changeType: 'increase',
    href: '/dashboard/billing'
  },
];

// Mock data for recent patients
const recentPatients = [
  { id: 1, name: 'John Doe', age: 45, lastVisit: '2023-06-15', status: 'Follow-up Scheduled' },
  { id: 2, name: 'Jane Smith', age: 32, lastVisit: '2023-06-14', status: 'Lab Results Pending' },
  { id: 3, name: 'Robert Johnson', age: 58, lastVisit: '2023-06-12', status: 'Medication Review' },
  { id: 4, name: 'Emily Davis', age: 27, lastVisit: '2023-06-10', status: 'New Patient' },
  { id: 5, name: 'Michael Wilson', age: 63, lastVisit: '2023-06-09', status: 'Post-Surgery Check' },
];

// Mock data for upcoming appointments
const upcomingAppointments = [
  { id: 1, patient: 'Sarah Johnson', time: '9:00 AM', type: 'Check-up', duration: '30 min' },
  { id: 2, patient: 'David Miller', time: '10:30 AM', type: 'Follow-up', duration: '15 min' },
  { id: 3, patient: 'Lisa Brown', time: '11:15 AM', type: 'Consultation', duration: '45 min' },
  { id: 4, patient: 'James Wilson', time: '1:00 PM', type: 'Vaccination', duration: '15 min' },
  { id: 5, patient: 'Patricia Moore', time: '2:30 PM', type: 'Physical Therapy', duration: '60 min' },
];

export default function DashboardPage() {
  // Initialize with empty string to avoid hydration mismatch
  const [timeRange, setTimeRange] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  
  // Set default values after component has mounted
  useEffect(() => {
    setTimeRange('week');
    setIsMounted(true);
  }, []);

  // Custom dropdown component that clearly shows the selected option
  const TimeRangeDropdown = () => {
    // Helper function to get display text for time range
    const getTimeRangeDisplayText = () => {
      switch(timeRange) {
        case 'day': return 'Today';
        case 'week': return 'This Week';
        case 'month': return 'This Month';
        case 'year': return 'This Year';
        default: return 'This Week';
      }
    };

    // Helper function to get icon color for time range
    const getTimeRangeIconColor = () => {
      switch(timeRange) {
        case 'day': return 'bg-blue-500';
        case 'week': return 'bg-green-500';
        case 'month': return 'bg-purple-500';
        case 'year': return 'bg-orange-500';
        default: return 'bg-green-500';
      }
    };

    return (
      <div className="relative">
        <label htmlFor="time-range" className="block text-sm font-medium text-gray-700 mb-1">
          Time Range
        </label>
        <div className="relative">
          {/* Custom dropdown with visible selected option */}
          <div className="relative">
            <button
              type="button"
              className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              onClick={() => {
                const select = document.getElementById('time-range');
                if (select) {
                  select.focus();
                  select.click();
                }
              }}
            >
              <span className="flex items-center">
                <span className={`flex-shrink-0 inline-block h-2 w-2 rounded-full ${getTimeRangeIconColor()}`} />
                <span className="ml-3 block truncate font-medium">
                  {isMounted ? getTimeRangeDisplayText() : 'This Week'}
                </span>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </button>

            {/* Hidden actual select element */}
            <select
              id="time-range"
              name="timeRange"
              className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              suppressHydrationWarning
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Dashboard Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, Dr. Smith. Here's what's happening today.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex space-x-3">
            {/* Use the custom TimeRangeDropdown component */}
            <TimeRangeDropdown />
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <ChartBarIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Reports
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link 
            key={stat.name} 
            href={stat.href}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <div className="font-medium text-teal-700 hover:text-teal-900">
                  View all
                </div>
              </div>
            </div>
            <div className={`px-5 py-1 border-t ${
              stat.changeType === 'increase' ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <div className="flex items-center">
                {stat.changeType === 'increase' ? (
                  <ArrowSmUpIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowSmDownIcon className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-xs font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} from last {isMounted ? timeRange : 'week'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Patients and Upcoming Appointments */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Patients */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Recent Patients</h2>
              <Link href="/dashboard/patients" className="text-sm font-medium text-teal-600 hover:text-teal-500">
                View all
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Visit
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{patient.age}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{patient.lastVisit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {patient.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Today's Appointments</h2>
              <Link href="/dashboard/appointments" className="text-sm font-medium text-teal-600 hover:text-teal-500">
                View all
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{appointment.patient}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{appointment.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{appointment.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{appointment.duration}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <button
            type="button"
            onClick={() => router.push('/dashboard/patients/add')}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 cursor-pointer"
            aria-label="Add new patient"
          >
            <UserGroupIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add New Patient
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <CalendarIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Schedule Appointment
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <ClipboardCheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Create Medical Record
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <CurrencyDollarIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Process Payment
          </button>
        </div>
      </div>
    </div>
  );
} 