'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  PlusIcon, 
  MagnifyingGlassIcon as SearchIcon, 
  FunnelIcon as FilterIcon, 
  CalendarIcon,
  ClockIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  EllipsisVerticalIcon as DotsVerticalIcon
} from '@heroicons/react/24/outline';

// Mock data for appointments
const appointments = [
  { 
    id: 1, 
    patient: 'John Doe', 
    patientId: '1',
    date: '2023-07-15', 
    time: '09:00 AM', 
    duration: '30 min',
    type: 'Check-up', 
    provider: 'Dr. Smith',
    status: 'Scheduled',
    notes: 'Regular follow-up appointment'
  },
  { 
    id: 2, 
    patient: 'Jane Smith', 
    patientId: '2',
    date: '2023-07-15', 
    time: '10:00 AM', 
    duration: '45 min',
    type: 'Consultation', 
    provider: 'Dr. Johnson',
    status: 'Confirmed',
    notes: 'New patient consultation'
  },
  { 
    id: 3, 
    patient: 'Robert Johnson', 
    patientId: '3',
    date: '2023-07-15', 
    time: '11:30 AM', 
    duration: '15 min',
    type: 'Follow-up', 
    provider: 'Dr. Smith',
    status: 'Scheduled',
    notes: 'Post-surgery follow-up'
  },
  { 
    id: 4, 
    patient: 'Emily Davis', 
    patientId: '4',
    date: '2023-07-16', 
    time: '09:30 AM', 
    duration: '30 min',
    type: 'Check-up', 
    provider: 'Dr. Wilson',
    status: 'Scheduled',
    notes: 'Annual physical examination'
  },
  { 
    id: 5, 
    patient: 'Michael Wilson', 
    patientId: '5',
    date: '2023-07-16', 
    time: '11:00 AM', 
    duration: '60 min',
    type: 'Procedure', 
    provider: 'Dr. Johnson',
    status: 'Confirmed',
    notes: 'Minor surgical procedure'
  },
  { 
    id: 6, 
    patient: 'Sarah Brown', 
    patientId: '6',
    date: '2023-07-17', 
    time: '10:15 AM', 
    duration: '30 min',
    type: 'Check-up', 
    provider: 'Dr. Smith',
    status: 'Scheduled',
    notes: 'Blood pressure monitoring'
  },
  { 
    id: 7, 
    patient: 'David Miller', 
    patientId: '7',
    date: '2023-07-17', 
    time: '02:00 PM', 
    duration: '45 min',
    type: 'Consultation', 
    provider: 'Dr. Wilson',
    status: 'Cancelled',
    notes: 'Patient requested cancellation'
  },
  { 
    id: 8, 
    patient: 'Lisa Taylor', 
    patientId: '8',
    date: '2023-07-18', 
    time: '09:00 AM', 
    duration: '30 min',
    type: 'Follow-up', 
    provider: 'Dr. Johnson',
    status: 'Scheduled',
    notes: 'Medication review'
  },
];

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  
  // Get unique dates for the filter
  const uniqueDates = [...new Set(appointments.map(appointment => appointment.date))];
  
  // Filter appointments based on search term, status, and date
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.provider.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status.toLowerCase() === statusFilter.toLowerCase();
    
    const matchesDate = dateFilter === 'all' || appointment.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and schedule patient appointments
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Appointment
          </button>
        </div>
      </div>

      {/* Filters and search */}
      <div className="mt-6 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="ml-4">
            <select
              id="status"
              name="status"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="ml-4">
            <select
              id="date"
              name="date"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Dates</option>
              {uniqueDates.map((date) => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <FilterIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            More Filters
          </button>
          <button
            type="button"
            className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <CalendarIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Calendar View
          </button>
        </div>
      </div>

      {/* Appointments table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Patient
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Time
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Type
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Provider
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <Link href={`/dashboard/patients/${appointment.patientId}`} className="text-teal-600 hover:text-teal-900">
                          {appointment.patient}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{appointment.date}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 text-gray-400 mr-1.5" aria-hidden="true" />
                          <span>{appointment.time}</span>
                          <span className="ml-1.5 text-xs text-gray-400">({appointment.duration})</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{appointment.type}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 text-gray-400 mr-1.5" aria-hidden="true" />
                          <span>{appointment.provider}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          appointment.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : appointment.status === 'Scheduled'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status === 'Confirmed' && (
                            <CheckCircleIcon className="-ml-0.5 mr-1.5 h-3 w-3 text-green-400" aria-hidden="true" />
                          )}
                          {appointment.status === 'Cancelled' && (
                            <XCircleIcon className="-ml-0.5 mr-1.5 h-3 w-3 text-red-400" aria-hidden="true" />
                          )}
                          {appointment.status}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-5 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredAppointments.length}</span> of{' '}
              <span className="font-medium">{filteredAppointments.length}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-teal-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                1
              </button>
              <button
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
} 