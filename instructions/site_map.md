Below is a structured site map outlining the primary pages, hierarchy, and their interconnections for the EMR app:

```
1. Authentication
   ├─ Login Page
   ├─ Password Recovery
   └─ (Optional) Account Registration

2. Dashboard (Home)
   ├─ Overview Summary (Key metrics, upcoming appointments, recent activity)
   ├─ Notifications/Alerts
   └─ Quick Access Links (Patients, Documents, Billing, etc.)

3. Patient Management
   ├─ Patient List & Search
   │    └─ Individual Patient Profiles
   │           ├─ Demographics
   │           ├─ Medical History
   │           ├─ Allergies & Medications
   │           └─ Attachments/Documents
   └─ Create/Edit Patient Record

4. Documentation
   ├─ Clinical Notes & Reports
   ├─ Document Templates
   ├─ Rich Text Document Editor
   └─ Document Archive & Search

5. Billing & Claims
   ├─ Billing Dashboard
   ├─ Claim Submission
   ├─ Claim History & Status Tracking
   └─ Invoice Management

6. Practice Management
   ├─ Appointment Scheduling
   │    ├─ Calendar View
   │    └─ Appointment Details
   ├─ Task Management / To-Do Lists
   └─ Staff Management

7. Analytics & Reporting
   ├─ Customizable Dashboards
   ├─ Financial Reports
   └─ Patient Outcome & Performance Reports

8. Settings & Administration
   ├─ User Management (Roles, Permissions)
   ├─ System Settings
   ├─ Integration & API Settings (e.g., HL7/FHIR)
   └─ Audit Logs & Security Settings

9. Help & Support
   ├─ FAQ / Knowledge Base
   └─ Contact Support / Ticketing
```

**Navigation Flow Example:**

- **Login:** Users sign in through the Authentication pages, which lead directly to the Dashboard.
- **Dashboard:** Acts as the central hub with links to Patient Management, Documentation, Billing & Claims, and Practice Management.
- **Patient Profiles:** From the Patient List, clicking on a patient opens a detailed profile. Providers can create or update clinical notes (Documentation) directly linked to that patient.
- **Billing & Claims:** Users can review billing data and submit claims, then track their status through the dedicated billing section.
- **Practice Management:** Offers scheduling and task management, integrating seamlessly with the Dashboard.
- **Settings:** Accessible from the main navigation, allowing administrators to manage user roles, system settings, and integrations.

This hierarchical structure ensures that users can quickly access the core functionalities while maintaining a logical flow between clinical documentation, administrative tasks, and billing operations.
