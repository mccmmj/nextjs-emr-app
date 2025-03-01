'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  PlusIcon, 
  MagnifyingGlassIcon as SearchIcon, 
  FunnelIcon as FilterIcon, 
  CurrencyDollarIcon,
  DocumentArrowDownIcon as DocumentDownloadIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon as ExclamationIcon,
  EllipsisVerticalIcon as DotsVerticalIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

// Mock data for invoices
const invoices = [
  { 
    id: 1, 
    patient: 'John Doe', 
    patientId: '1',
    date: '2023-06-10', 
    dueDate: '2023-07-10',
    amount: 150.00,
    service: 'Annual Physical Examination',
    status: 'Paid',
    paymentMethod: 'Credit Card',
    paymentDate: '2023-06-15'
  },
  { 
    id: 2, 
    patient: 'Jane Smith', 
    patientId: '2',
    date: '2023-06-05', 
    dueDate: '2023-07-05',
    amount: 75.00,
    service: 'Flu Treatment',
    status: 'Paid',
    paymentMethod: 'Insurance',
    paymentDate: '2023-06-20'
  },
  { 
    id: 3, 
    patient: 'Robert Johnson', 
    patientId: '3',
    date: '2023-05-28', 
    dueDate: '2023-06-28',
    amount: 200.00,
    service: 'Post-Surgery Follow-up',
    status: 'Pending',
    paymentMethod: null,
    paymentDate: null
  },
  { 
    id: 4, 
    patient: 'Emily Davis', 
    patientId: '4',
    date: '2023-05-15', 
    dueDate: '2023-06-15',
    amount: 125.00,
    service: 'Diabetes Management',
    status: 'Overdue',
    paymentMethod: null,
    paymentDate: null
  },
  { 
    id: 5, 
    patient: 'Michael Wilson', 
    patientId: '5',
    date: '2023-06-01', 
    dueDate: '2023-07-01',
    amount: 100.00,
    service: 'Hypertension Check',
    status: 'Pending',
    paymentMethod: null,
    paymentDate: null
  },
  { 
    id: 6, 
    patient: 'Sarah Brown', 
    patientId: '6',
    date: '2023-04-20', 
    dueDate: '2023-05-20',
    amount: 250.00,
    service: 'Prenatal Visit',
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
    paymentDate: '2023-04-25'
  },
  { 
    id: 7, 
    patient: 'David Miller', 
    patientId: '7',
    date: '2023-05-10', 
    dueDate: '2023-06-10',
    amount: 175.00,
    service: 'Allergy Consultation',
    status: 'Overdue',
    paymentMethod: null,
    paymentDate: null
  },
  { 
    id: 8, 
    patient: 'Lisa Taylor', 
    patientId: '8',
    date: '2023-06-08', 
    dueDate: '2023-07-08',
    amount: 50.00,
    service: 'Vaccination',
    status: 'Pending',
    paymentMethod: null,
    paymentDate: null
  },
];

// Calculate summary statistics
const totalInvoices = invoices.length;
const totalPaid = invoices.filter(invoice => invoice.status === 'Paid').length;
const totalPending = invoices.filter(invoice => invoice.status === 'Pending').length;
const totalOverdue = invoices.filter(invoice => invoice.status === 'Overdue').length;

const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
const paidAmount = invoices
  .filter(invoice => invoice.status === 'Paid')
  .reduce((sum, invoice) => sum + invoice.amount, 0);
const pendingAmount = invoices
  .filter(invoice => invoice.status === 'Pending')
  .reduce((sum, invoice) => sum + invoice.amount, 0);
const overdueAmount = invoices
  .filter(invoice => invoice.status === 'Overdue')
  .reduce((sum, invoice) => sum + invoice.amount, 0);

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter invoices based on search term and status
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toString().includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || invoice.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Invoices</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage patient invoices and payments
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Invoice
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CurrencyDollarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Amount</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{formatCurrency(totalAmount)}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span className="font-medium text-gray-500">
                {totalInvoices} invoices
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Paid</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{formatCurrency(paidAmount)}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-green-50 px-5 py-3">
            <div className="text-sm">
              <span className="font-medium text-green-700">
                {totalPaid} invoices
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-6 w-6 text-yellow-500" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{formatCurrency(pendingAmount)}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 px-5 py-3">
            <div className="text-sm">
              <span className="font-medium text-yellow-700">
                {totalPending} invoices
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ExclamationIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Overdue</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{formatCurrency(overdueAmount)}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-red-50 px-5 py-3">
            <div className="text-sm">
              <span className="font-medium text-red-700">
                {totalOverdue} invoices
              </span>
            </div>
          </div>
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
              placeholder="Search invoices..."
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
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
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
            <ChartBarIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Reports
          </button>
        </div>
      </div>

      {/* Invoices table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Invoice #
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Patient
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Service
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Due Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Amount
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
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        INV-{invoice.id.toString().padStart(4, '0')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Link href={`/dashboard/patients/${invoice.patientId}`} className="text-teal-600 hover:text-teal-900">
                          {invoice.patient}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice.service}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice.date}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice.dueDate}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                        {formatCurrency(invoice.amount)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          invoice.status === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : invoice.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {invoice.status === 'Paid' && (
                            <CheckCircleIcon className="-ml-0.5 mr-1.5 h-3 w-3 text-green-400" aria-hidden="true" />
                          )}
                          {invoice.status === 'Pending' && (
                            <ClockIcon className="-ml-0.5 mr-1.5 h-3 w-3 text-yellow-400" aria-hidden="true" />
                          )}
                          {invoice.status === 'Overdue' && (
                            <ExclamationIcon className="-ml-0.5 mr-1.5 h-3 w-3 text-red-400" aria-hidden="true" />
                          )}
                          {invoice.status}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex items-center justify-end space-x-3">
                          <button
                            type="button"
                            className="text-teal-600 hover:text-teal-900"
                          >
                            <DocumentDownloadIcon className="h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">Download</span>
                          </button>
                          <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">More</span>
                          </button>
                        </div>
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
      <div className="mt-5 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg shadow">
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
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredInvoices.length}</span> of{' '}
              <span className="font-medium">{filteredInvoices.length}</span> results
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