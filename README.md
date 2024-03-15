### Project Name: Customer Success Platform

---

### Project Overview:

The Customer Success Platform is a comprehensive application aimed at enhancing communication, transparency, and efficiency within our system. It automates the process of notifying stakeholders about updates or changes, thereby ensuring timely and relevant information dissemination. This project involves the development of various functionalities, including registration and login, role-based management, email notification system, CRUD operations for project charter sections, export functionality, user interface development, and documentation.

---

### Features:

1. **Registration and Login:**
   - Users can register for an account using basic information or log in via Microsoft accounts using Auth0.
   - Integration with Microsoft authentication eliminates the need for separate credentials, enhancing user experience.

2. **Role-Based Management:**
   - Admins have full access to manage projects, sections, and users.
   - Auditors can view project details, assign project managers, and add comments.
   - Project Managers can update project details and submit changes.
   - Other stakeholders have view-only access to project details.

3. **CRUD Operations for Project Charter Sections:**
   - Implement Create/Read/Update/Delete functionality for each of the 15 sections of the project charter.

4. **Email Notification System:**
   - Stakeholders receive email notifications for updates within the platform, triggered by changes in the Audit History table.

5. **Export as a Document:**
   - Users can export project details in a predefined format, including the first 10 CRUD operations from the provided template.

6. **User Interface Development:**
   - A user-friendly interface allows stakeholders to manage notification preferences and view updates.

7. **Documentation:**
   - Comprehensive documentation is provided for all implemented functionalities, configurations, and development processes.

---

### Installation:

1. Clone the repository from [GitHub link](#).
2. Install dependencies using `npm install` for frontend and `bundle install` for backend.
3. Configure Auth0 for Microsoft authentication.You can refer below repository.
   [GitHub](https://github.com/Rinil-Parmar/Login-Auth0-MSidentity).
5. Set up database and run migrations using `rails db:create` and `rails db:migrate`.
6. Start the server using `npm start` for frontend and `rails server` for backend.

---

### Usage:

1. Register for an account or log in using Microsoft credentials.
2. Navigate through different sections of the platform to perform CRUD operations or view project details.
3. Manage user roles and permissions as an Admin.
   For admin login credetials:
   email: admin1@gmail.com
   password: admin1@gmail.com
5. Receive email notifications for updates in the platform.
6. Export project details as a document for offline reference.

---

### Contributing:

We welcome contributions to enhance the Customer Success Platform. Please follow the contribution guidelines provided in the repository.

---


### Authors:

- [Rinil Parmar](#) - *Role/Responsibility*

---

