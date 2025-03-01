'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeftIcon, 
  PencilIcon, 
  TrashIcon, 
  DocumentTextIcon, 
  CalendarIcon, 
  CurrencyDollarIcon,
  ClipboardDocumentListIcon as ClipboardListIcon,
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon as MailIcon,
  MapPinIcon as LocationMarkerIcon,
  IdentificationIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// Mock patient data
const patients = [
  { 
    id: '1', 
    name: 'John Doe', 
    dob: '1975-05-15', 
    age: 48,
    gender: 'Male', 
    phone: '(555) 123-4567', 
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, CA 12345',
    insurance: 'Blue Cross Blue Shield',
    policyNumber: 'BCBS12345678',
    emergencyContact: 'Jane Doe (Wife) - (555) 987-6543',
    lastVisit: '2023-06-10',
    nextAppointment: '2023-07-15',
    status: 'Active',
    medicalHistory: [
      { condition: 'Hypertension', diagnosedDate: '2018-03-10', notes: 'Well controlled with medication' },
      { condition: 'Type 2 Diabetes', diagnosedDate: '2019-11-22', notes: 'Diet controlled, regular monitoring' }
    ],
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2018-03-15' },
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2019-12-01' }
    ],
    allergies: [
      { allergen: 'Penicillin', reaction: 'Rash', severity: 'Moderate' },
      { allergen: 'Peanuts', reaction: 'Hives', severity: 'Mild' }
    ],
    vitalSigns: [
      { date: '2023-06-10', bloodPressure: '128/82', heartRate: 72, temperature: 98.6, respiratoryRate: 16, weight: 185, height: 71 }
    ],
    recentVisits: [
      { date: '2023-06-10', reason: 'Regular check-up', provider: 'Dr. Smith', notes: 'Patient is doing well. Continue current medications.' },
      { date: '2023-03-05', reason: 'Flu symptoms', provider: 'Dr. Johnson', notes: 'Prescribed Tamiflu and recommended rest and fluids.' },
      { date: '2022-12-18', reason: 'Annual physical', provider: 'Dr. Smith', notes: 'All tests within normal range. Recommended diet and exercise plan.' }
    ]
  },
  // More patients would be here in a real application
];

export default function PatientDetailPage() {
  const params = useParams();
  const patientId = params.id as string;
  
  // Find the patient with the matching ID
  const patient = patients.find(p => p.id === patientId);
  
  // Active tab state
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!patient) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Patient Not Found</h2>
          <p className="mt-1 text-sm text-gray-500">
            The patient you are looking for does not exist or has been removed.
          </p>
          <div className="mt-6">
            <Link
              href="/dashboard/patients"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700"
            >
              <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Back to Patients
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Back button and actions */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/dashboard/patients"
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <ArrowLeftIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
          Back to Patients
        </Link>
        <div className="flex space-x-3">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <PencilIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Edit
          </button>
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            <TrashIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>

      {/* Patient header */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-2xl leading-6 font-bold text-gray-900">{patient.name}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {patient.age} years old • {patient.gender} • {patient.status}
            </p>
          </div>
          <div>
            <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
              patient.status === 'Active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {patient.status}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {[
            { name: 'Overview', id: 'overview', icon: UserCircleIcon },
            { name: 'Medical History', id: 'medical-history', icon: ClipboardListIcon },
            { name: 'Visits', id: 'visits', icon: DocumentTextIcon },
            { name: 'Appointments', id: 'appointments', icon: CalendarIcon },
            { name: 'Billing', id: 'billing', icon: CurrencyDollarIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <tab.icon className="h-5 w-5 mr-2" aria-hidden="true" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {activeTab === 'overview' && (
          <div>
            {/* Contact Information */}
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Information</h3>
            </div>
            <div className="px-4 py-5 sm:p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
                <span className="text-sm text-gray-900">{patient.phone}</span>
              </div>
              <div className="flex items-center">
                <MailIcon className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
                <span className="text-sm text-gray-900">{patient.email}</span>
              </div>
              <div className="flex items-center sm:col-span-2">
                <LocationMarkerIcon className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
                <span className="text-sm text-gray-900">{patient.address}</span>
              </div>
              <div className="flex items-center">
                <IdentificationIcon className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
                <div>
                  <span className="text-sm text-gray-900 block">Insurance: {patient.insurance}</span>
                  <span className="text-sm text-gray-500 block">Policy: {patient.policyNumber}</span>
                </div>
              </div>
              <div className="flex items-center">
                <UserCircleIcon className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
                <span className="text-sm text-gray-900">Emergency Contact: {patient.emergencyContact}</span>
              </div>
            </div>

            {/* Appointments */}
            <div className="px-4 py-5 sm:px-6 border-t border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Appointments</h3>
            </div>
            <div className="px-4 py-5 sm:p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
                <div>
                  <span className="text-sm text-gray-500 block">Last Visit</span>
                  <span className="text-sm text-gray-900 block">{patient.lastVisit}</span>
                </div>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
                <div>
                  <span className="text-sm text-gray-500 block">Next Appointment</span>
                  <span className="text-sm text-gray-900 block">{patient.nextAppointment}</span>
                </div>
              </div>
            </div>

            {/* Allergies */}
            <div className="px-4 py-5 sm:px-6 border-t border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Allergies</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Allergen</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Reaction</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Severity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {patient.allergies.map((allergy, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{allergy.allergen}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{allergy.reaction}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{allergy.severity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Medications */}
            <div className="px-4 py-5 sm:px-6 border-t border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Current Medications</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Medication</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Dosage</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Frequency</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Start Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {patient.medications.map((medication, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{medication.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{medication.dosage}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{medication.frequency}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{medication.startDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Vital Signs */}
            <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Latest Vital Signs</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Recorded on {patient.vitalSigns[0].date}
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
              <div>
                <span className="text-sm text-gray-500 block">Blood Pressure</span>
                <span className="text-sm text-gray-900 block">{patient.vitalSigns[0].bloodPressure} mmHg</span>
              </div>
              <div>
                <span className="text-sm text-gray-500 block">Heart Rate</span>
                <span className="text-sm text-gray-900 block">{patient.vitalSigns[0].heartRate} bpm</span>
              </div>
              <div>
                <span className="text-sm text-gray-500 block">Temperature</span>
                <span className="text-sm text-gray-900 block">{patient.vitalSigns[0].temperature}°F</span>
              </div>
              <div>
                <span className="text-sm text-gray-500 block">Respiratory Rate</span>
                <span className="text-sm text-gray-900 block">{patient.vitalSigns[0].respiratoryRate} breaths/min</span>
              </div>
              <div>
                <span className="text-sm text-gray-500 block">Weight</span>
                <span className="text-sm text-gray-900 block">{patient.vitalSigns[0].weight} lbs</span>
              </div>
              <div>
                <span className="text-sm text-gray-500 block">Height</span>
                <span className="text-sm text-gray-900 block">{patient.vitalSigns[0].height} in</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'medical-history' && (
          <div>
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Medical Conditions</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Condition</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Diagnosed Date</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {patient.medicalHistory.map((condition, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{condition.condition}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{condition.diagnosedDate}</td>
                        <td className="px-3 py-4 text-sm text-gray-500">{condition.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'visits' && (
          <div>
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Visits</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Date</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Reason</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Provider</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {patient.recentVisits.map((visit, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{visit.date}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{visit.reason}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{visit.provider}</td>
                        <td className="px-3 py-4 text-sm text-gray-500">{visit.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="px-4 py-5 sm:p-6">
            <div className="text-center py-10">
              <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming appointments</h3>
              <p className="mt-1 text-sm text-gray-500">Schedule a new appointment for this patient.</p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <CalendarIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  New Appointment
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="px-4 py-5 sm:p-6">
            <div className="text-center py-10">
              <CurrencyDollarIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No billing information</h3>
              <p className="mt-1 text-sm text-gray-500">Create a new invoice for this patient.</p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <CurrencyDollarIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Create Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 