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
- 💾 **localStorage Support** _(Bonus)_ – Optionally retains session state.
- 📈 **Sorting & Filtering** _(Bonus)_ – Easy budget management for large projects.
- 📱 **Responsive Design** – Works across desktop and mobile devices.

---

## 📁 Project Structure

```bash
Project-Cost-Tracker/
│
├── public/               # Static files
├── src/
│   ├── components/       # Reusable components
│   ├── features/         # Redux slices for items and costs
│   ├── firebase/         # Firebase config and helpers
│   ├── pages/            # Auth and Home pages
│   ├── App.js
│   ├── index.js
│
├── .env                  # Firebase environment variables
├── package.json
├── README.md
```
