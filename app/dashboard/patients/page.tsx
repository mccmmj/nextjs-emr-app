'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { 
  MagnifyingGlassIcon as SearchIcon, 
  PlusIcon, 
  FunnelIcon as FilterIcon, 
  ArrowsUpDownIcon as SortAscendingIcon,
  EllipsisVerticalIcon as DotsVerticalIcon,
  CheckIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

// Mock data for patients
const patients = [
  { 
    id: 1, 
    name: 'John Doe', 
    dob: '1975-05-15', 
    gender: 'Male', 
    phone: '(555) 123-4567', 
    email: 'john.doe@example.com',
    lastVisit: '2023-06-10',
    status: 'Active'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    dob: '1982-08-22', 
    gender: 'Female', 
    phone: '(555) 987-6543', 
    email: 'jane.smith@example.com',
    lastVisit: '2023-06-05',
    status: 'Active'
  },
  { 
    id: 3, 
    name: 'Robert Johnson', 
    dob: '1968-11-30', 
    gender: 'Male', 
    phone: '(555) 456-7890', 
    email: 'robert.johnson@example.com',
    lastVisit: '2023-05-28',
    status: 'Active'
  },
  { 
    id: 4, 
    name: 'Emily Davis', 
    dob: '1990-03-12', 
    gender: 'Female', 
    phone: '(555) 234-5678', 
    email: 'emily.davis@example.com',
    lastVisit: '2023-05-15',
    status: 'Inactive'
  },
  { 
    id: 5, 
    name: 'Michael Wilson', 
    dob: '1955-07-08', 
    gender: 'Male', 
    phone: '(555) 876-5432', 
    email: 'michael.wilson@example.com',
    lastVisit: '2023-06-01',
    status: 'Active'
  },
  { 
    id: 6, 
    name: 'Sarah Brown', 
    dob: '1988-12-25', 
    gender: 'Female', 
    phone: '(555) 345-6789', 
    email: 'sarah.brown@example.com',
    lastVisit: '2023-04-20',
    status: 'Active'
  },
  { 
    id: 7, 
    name: 'David Miller', 
    dob: '1972-02-18', 
    gender: 'Male', 
    phone: '(555) 765-4321', 
    email: 'david.miller@example.com',
    lastVisit: '2023-05-10',
    status: 'Inactive'
  },
  { 
    id: 8, 
    name: 'Lisa Taylor', 
    dob: '1980-09-05', 
    gender: 'Female', 
    phone: '(555) 567-8901', 
    email: 'lisa.taylor@example.com',
    lastVisit: '2023-06-08',
    status: 'Active'
  },
];

// Create a client-only version of the StatusFilterDropdown
const ClientOnlyStatusFilter = dynamic(
  () => Promise.resolve(({ statusFilter, setStatusFilter }: { statusFilter: string, setStatusFilter: (value: string) => void }) => {
    return (
      <div className="relative">
        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Status Filter
        </label>
        <div className="relative">
          <select
            id="status-filter"
            name="status"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        {/* Visual indicator of current selection */}
        <div className="mt-1">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-1 ${
              statusFilter === 'active' ? 'bg-green-500' : 
              statusFilter === 'inactive' ? 'bg-red-500' : 'bg-gray-500'
            }`}></div>
            <span className="text-sm font-medium">
              {statusFilter === 'active' ? 'Active Patients' : 
               statusFilter === 'inactive' ? 'Inactive Patients' : 'All Patients'}
            </span>
          </div>
        </div>
      </div>
    );
  }),
  { ssr: false } // This is the key - it prevents server-side rendering
);

export default function PatientsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // We don't need isMounted anymore since we're using dynamic import with ssr:false
  
  useEffect(() => {
    console.log('Mounting PatientsPage');
  }, []);
  
  // Handle navigation to add patient page
  const handleAddPatient = () => {
    console.log('Navigating to add patient page');
    router.push('/dashboard/patients/add');
  };
  
  // Filter patients based on search term and status
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || 
                          patient.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Helper function to render status badge
  const renderStatusBadge = (status: string) => {
    if (status === 'Active') {
      return <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-green-100 text-green-800">Active</span>;
    } else if (status === 'Inactive') {
      return <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-red-100 text-red-800">Inactive</span>;
    } else {
      return <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-gray-100 text-gray-800">All</span>;
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-4" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <div>
              <Link href="/dashboard" className="text-gray-400 hover:text-gray-500">
                <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <span className="ml-2 text-sm font-medium text-gray-500">Patients</span>
            </div>
          </li>
        </ol>
      </nav>
      
      {/* Page header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your patient records and information
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={handleAddPatient}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 cursor-pointer"
            aria-label="Add new patient"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Patient
          </button>
        </div>
      </div>

      {/* Filters and search */}
      <div className="mt-6 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Use the client-only version of the dropdown */}
          <ClientOnlyStatusFilter 
            statusFilter={statusFilter} 
            setStatusFilter={setStatusFilter} 
          />
        </div>
        <div className="mt-4 sm:mt-0 flex items-center">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <FilterIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Filter
          </button>
          <button
            type="button"
            className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <SortAscendingIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Sort
          </button>
        </div>
      </div>

      {/* Patients table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date of Birth
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Gender
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Phone
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Last Visit
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
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <Link href={`/dashboard/patients/${patient.id}`} className="text-teal-600 hover:text-teal-900">
                          {patient.name}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{patient.dob}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{patient.gender}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{patient.phone}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{patient.lastVisit}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {renderStatusBadge(patient.status)}
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
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPatients.length}</span> of{' '}
              <span className="font-medium">{filteredPatients.length}</span> results
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