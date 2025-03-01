'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  PlusIcon, 
  MagnifyingGlassIcon as SearchIcon, 
  FunnelIcon as FilterIcon, 
  DocumentTextIcon,
  DocumentArrowDownIcon as DocumentDownloadIcon,
  DocumentDuplicateIcon,
  UserIcon,
  ClockIcon,
  EllipsisVerticalIcon as DotsVerticalIcon
} from '@heroicons/react/24/outline';

// Mock data for medical records
const records = [
  { 
    id: 1, 
    title: 'Annual Physical Examination', 
    patient: 'John Doe',
    patientId: '1',
    provider: 'Dr. Smith',
    date: '2023-06-10',
    type: 'Physical Examination',
    status: 'Completed',
    notes: 'Patient is in good health. All vitals within normal range.'
  },
  { 
    id: 2, 
    title: 'Flu Treatment', 
    patient: 'Jane Smith',
    patientId: '2',
    provider: 'Dr. Johnson',
    date: '2023-06-05',
    type: 'Sick Visit',
    status: 'Completed',
    notes: 'Patient presented with flu symptoms. Prescribed Tamiflu and recommended rest.'
  },
  { 
    id: 3, 
    title: 'Post-Surgery Follow-up', 
    patient: 'Robert Johnson',
    patientId: '3',
    provider: 'Dr. Wilson',
    date: '2023-05-28',
    type: 'Follow-up',
    status: 'Completed',
    notes: 'Surgical site healing well. No signs of infection. Pain well-controlled.'
  },
  { 
    id: 4, 
    title: 'Diabetes Management', 
    patient: 'Emily Davis',
    patientId: '4',
    provider: 'Dr. Smith',
    date: '2023-05-15',
    type: 'Chronic Disease Management',
    status: 'Completed',
    notes: 'Blood sugar levels improved. Continuing current medication regimen.'
  },
  { 
    id: 5, 
    title: 'Hypertension Check', 
    patient: 'Michael Wilson',
    patientId: '5',
    provider: 'Dr. Johnson',
    date: '2023-06-01',
    type: 'Follow-up',
    status: 'Completed',
    notes: 'Blood pressure slightly elevated. Increased medication dosage.'
  },
  { 
    id: 6, 
    title: 'Prenatal Visit', 
    patient: 'Sarah Brown',
    patientId: '6',
    provider: 'Dr. Wilson',
    date: '2023-04-20',
    type: 'Prenatal Care',
    status: 'Completed',
    notes: 'Pregnancy progressing normally. All tests within normal range.'
  },
  { 
    id: 7, 
    title: 'Allergy Consultation', 
    patient: 'David Miller',
    patientId: '7',
    provider: 'Dr. Smith',
    date: '2023-05-10',
    type: 'Consultation',
    status: 'Pending Review',
    notes: 'Allergy testing performed. Awaiting results.'
  },
  { 
    id: 8, 
    title: 'Vaccination', 
    patient: 'Lisa Taylor',
    patientId: '8',
    provider: 'Dr. Johnson',
    date: '2023-06-08',
    type: 'Preventive Care',
    status: 'Completed',
    notes: 'Administered COVID-19 and flu vaccines. No adverse reactions.'
  },
];

export default function MedicalRecordsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Get unique record types for the filter
  const uniqueTypes = [...new Set(records.map(record => record.type))];
  
  // Filter records based on search term, type, and status
  const filteredRecords = records.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.provider.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || record.type === typeFilter;
    
    const matchesStatus = statusFilter === 'all' || record.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and access patient medical records
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Record
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
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="ml-4">
            <select
              id="type"
              name="type"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
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
              <option value="completed">Completed</option>
              <option value="pending review">Pending Review</option>
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
        </div>
      </div>

      {/* Records grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRecords.map((record) => (
          <div
            key={record.id}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DocumentTextIcon className="h-8 w-8 text-teal-500" aria-hidden="true" />
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">{record.title}</h3>
                    <p className="text-sm text-gray-500">{record.type}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <UserIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" aria-hidden="true" />
                  <Link href={`/dashboard/patients/${record.patientId}`} className="text-teal-600 hover:text-teal-900">
                    {record.patient}
                  </Link>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <UserIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" aria-hidden="true" />
                  <span>{record.provider}</span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <ClockIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" aria-hidden="true" />
                  <span>{record.date}</span>
                </div>
              </div>
              <div className="mt-4">
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  record.status === 'Completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {record.status}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 line-clamp-2">{record.notes}</p>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-between">
              <button
                type="button"
                className="inline-flex items-center text-sm text-teal-600 hover:text-teal-900"
              >
                <DocumentDuplicateIcon className="mr-1.5 h-4 w-4" aria-hidden="true" />
                View
              </button>
              <button
                type="button"
                className="inline-flex items-center text-sm text-teal-600 hover:text-teal-900"
              >
                <DocumentDownloadIcon className="mr-1.5 h-4 w-4" aria-hidden="true" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredRecords.length === 0 && (
        <div className="mt-8 text-center py-12 bg-white shadow rounded-lg">
          <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No records found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('all');
                setStatusFilter('all');
              }}
            >
              Clear filters
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      {filteredRecords.length > 0 && (
        <div className="mt-8 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg shadow">
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredRecords.length}</span> of{' '}
                <span className="font-medium">{filteredRecords.length}</span> results
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
      )}
    </div>
  );
} 