# 🧮 Project Cost Tracker

A mini web application that helps users manage project costs effectively. Users can add, edit, and delete project items and associated costs (e.g., shipping, tax), view the total project expenditure, and securely manage their data with Firebase Authentication and storage.

---

## 🚀 Features

- 🔐 **Firebase Authentication** – User login and registration.
- 📦 **Add/Edit/Delete Items & Costs** – Track all components of a project's budget.
- 💰 **Total Project Cost Calculation** – Automatically calculates total cost (items + other costs).
- 📊 **State Management with Redux** – Efficient and scalable data flow.
- 🎨 **Chakra UI** – Responsive and modern user interface.
- ☁️ **Firebase Firestore** – Persistent backend for storing data securely.
- 📈 **Sorting & Filtering** – Easy budget management for large projects.
- 📱 **Responsive Design** – Works across desktop and mobile devices.

---

## 🧑‍💻 Tech Stack

- ⚛️ **React.js** – Frontend JavaScript framework
- 🛠️ **Vite** – Fast development build tool
- 🔄 **Redux Toolkit** – State management
- 🎨 **Chakra UI** – Component library for UI
- 🔥 **Firebase** – Authentication & Firestore database
- 🌐 **React Router** – Client-side routing

---

## 📁 Project Structure

```bash
Project-Cost-Tracker/
│
├── public/               # Static files
├── src/
│   ├── components/       # Reusable components
│   ├── features/         # Redux slices for items and otherCosts
│   ├── firebase/         # Firebase config and helpers
│   ├── pages/            # Auth and Home pages
│   ├── App.jsx
│
│
├── package.json
├── README.md
```

🔧 Installation

1. Clone the Repository

```bash
git clone https://github.com/your-username/project-cost-tracker.git
cd project-cost-tracker
```

2. Install Dependencies

```bash
npm install
```

3. Configure Firebase
   Create a Firebase project at https://console.firebase.google.com

Enable Email/Password Authentication

Create a Firestore Database

(replace with your Firebase values):

```bash
apiKey=your_api_key
authDomain=your_auth_domain
projectId=your_project_id
storageBucket=your_storage_bucket
messagingSenderId=your_sender_id
appId=your_app_id
```

▶️ Running the App

```bash
npm run dev
Open your browser and navigate to: http://localhost:5173
```
