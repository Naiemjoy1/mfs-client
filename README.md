````markdown
# Mobile Financial Service (MFS) Client

This is the client-side application for a basic Mobile Financial Service (MFS) like bKash or Nagad. It is built using React.js and various other libraries to provide a secure and responsive user interface.

## Live Link

- [Live Demo](https://mobile-financial-service-8e757.web.app/){:target="\_blank"}

## Server GitHub

- [MFS Server Repository](https://github.com/Naiemjoy1/mfs-server){:target="\_blank"}

## Users

### Admin

- **Email:** admin@mfs.com
- **Password:** 12345

### Agent

- **Email:** agent@mfs.com
- **Password:** 12345

### User

- **Email:** user1@mfs.com
- **Password:** 12345

## Features

- User Registration and Secure Login (JWT)
- Send Money with Fee Handling
- Cash In via Agents (No Fee)
- Cash Withdrawal with 1.5% Fee
- Cash Request & Cash-Out
- Balance Inquiry with Hidden Display
- Transaction History (Last 100 Transactions)
- Role-Based Dashboards (User, Agent, Admin)

## Tech Stack

- React.js
- Axios
- React Query
- React Hook Form
- Recharts
- PropTypes
- React Router DOM
- SweetAlert2

## Installation Guide

1. Clone the repository:

   ```bash
   git clone https://github.com/Naiemjoy1/mfs-client
   ```
````

2. Navigate to the project directory:

   ```bash
   cd mfs-client
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the application:
   ```bash
   npm start
   ```

---

## Assessment-Based Features

### Account Types

The system supports three roles:

- **User**

  - Can register with unique details (Mobile, Email, NID).
  - Receives **40 Taka bonus** on sign-up.
  - Can send money (5 Taka fee for amounts over 100 Taka).
  - Can cash-in through an agent **(No Fee)**.
  - Can cash-out through an agent **(1.5% Fee)**.

- **Agent**

  - Can register and request admin approval.
  - Starts with **100,000 Taka** in balance.
  - Can request a balance recharge from the admin.
  - Earns **1% commission** on cash-outs.

- **Admin**
  - Can **approve agents**, **manage users**, and **block accounts**.
  - Can add money to agents.
  - Earns **0.5% from cash-outs** and **5 Taka per transaction**.
  - Monitors **total money in the system**.

### Secure Authentication

- Secure **JWT authentication**.
- Encrypted PIN with **bcrypt**.
- **One-device login restriction** for security.

### Money Transactions

- **Send Money**
  - Minimum amount: **50 Taka**
  - Fee: **5 Taka** for amounts **over 100 Taka**
  - Updates sender, receiver, and admin balances.
- **Cash-Out**
  - **1.5% fee**
  - Admin earns **0.5%**, agent earns **1%**.
- **Cash-In**
  - No fees.
  - Updates **user balance** and **system total**.
- **Balance Inquiry**
  - Balance is **blurred by default** for privacy.
  - Click to reveal.
- **User Management (Admin)**
  - View user balances & transaction history.
  - Search by **phone number**.
- **Agent Approval (Admin)**
  - Accept/reject agent requests.

### Additional Features

- **Cash Request (Agent → Admin)**
- **Withdraw Request (Agent → Admin)**
- **Admin Withdraw Approval**
- **Detailed Transaction Tracking**

This project ensures a secure and efficient **Mobile Financial Service** system using **React.js, Node.js, Express.js, MongoDB, and Mongoose**.

---

Let me know if you'd like any further refinements! 🚀
