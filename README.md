# CareConnect

CareConnect is a comprehensive healthcare management system designed to streamline administrative tasks for medical professionals and provide patients with easy access to their medical records and appointment scheduling. The system includes an Admin Dashboard for healthcare providers and a user-friendly frontend for patients.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Live Demo](#live-demo)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Admin Dashboard**: Manage appointments, view patient records, and more.
- **Patient Portal**: Book appointments, view medical history, and update personal information.
- **Secure Authentication**: Role-based authentication for Admin and Patients.
- **Responsive Design**: Fully responsive design for seamless use on any device.

## Tech Stack

- **Frontend**: Vite, React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token),Cookies

## Live Demo

- **Frontend**: [CareConnect Frontend](https://careconnectdashboard.vercel.app)
- **Admin Dashboard**: [CareConnect Admin Dashboard](https://careconnectdashboard.vercel.app)

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**

    ```bash
    git clone https://github.com/Prem-Mule/CareConnect-YourHealthPartner-MERN-APP
    cd careconnect
    ```

2. **Install dependencies**

    ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install

    # Install dashboard dependencies
    cd ../Dashboard
    npm install
    ```

## Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```plaintext
MONGO_URI=your_mongo_database_uri
JWT_SECRET_KEY=your_jwt_secret_key
COOKIE_EXPIRES=number_of_days_for_cookie_to_expire
```

## Usage

1. **Start the backend server**

    ```bash
    cd backend
    npm run dev
    ```

2. **Start the frontend server**

    ```bash
    cd ../frontend
    npm run dev
    ```

2. **Start the Dashboard server**

    ```bash
    cd ../Dashboard
    npm run dev
    ```
Navigate to http://localhost:4000 to use the application.

## Contributing

We welcome contributions from the community! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## Contact
For any inquiries or feedback, please contact us at:

Email: muleprem777@gmail.com 
LinkedIn: [Prem Kiran Mule](https://www.linkedin.com/in/prem-mule/)
