
# SyncWrite: A Collaborative Text Editor for Real-Time Collaboration

A **web-based collaborative text editor** designed to enhance writing productivity and foster teamwork. This editor supports real-time collaboration and includes features to streamline text editing and document sharing, making it an essential tool for teams and individuals alike. With this editor, managing documents becomes seamless, while collaboration is intuitive and efficient.


You can check out the website here: [Visit the website](https://rn349h-3000.csb.app/)

---

## 🚀 Features

### Supported File Types
- **`.txt`**  

### Core Functionalities
- **Save Files:**  
  Save documents in supported formats (.txt) with ease.
  
- **Real-Time Collaboration:**
  Work with multiple users simultaneously, with changes synced in real time.

- **Cloud Integration for File Management:**  
  Save files to the cloud and retrieve them anytime for seamless accessibility across devices.

---

## 🔮 Future Features
- **Read-Only Mode:**  
  Enable non-editable views for documents, useful for reviewers and readers.

- **Enhanced Formatting Options:**  
  Provide advanced text styling and formatting options, such as tables, headers, and code blocks.

- **Support for More File Types:**  
  Add compatibility for additional file formats such as:
  - `.ppt` (PowerPoint Presentations)
  - `.docx` (Word Documents)
  - `.pdf` (Portable Document Format)

---

## 🛠️ Tech Stack

- **Frontend:** React  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Real-Time Collaboration:** WebSockets (Socket.IO)
- **Hosting:** Codesandbox


---

## 📂 Folder Structure
```
Collaborative-Text-Editor/
├── Asset/                   # Contains assets like images, icons, and other static files
├── public/                  # Public files served by the application
├── src                      # Source code of the application
│ ├── components             # Reusable components
│ ├── Page/                  # Page-specific components or views
│ └── index.js               # Entry point for the app
├── .gitignore               # Git ignored files and folders
├── LICENSE.md               # License file
├── README.md                # Project documentation
├── package.json             # Project metadata and dependencies
├── postcss.config.js        # PostCSS configuration file 
├──.env                      # MongoDB auth link
└── server.js                # Backend server script

```

---

## 🛠️ Setup Instructions

1. **Clone the Repository:**  
   ```bash
   git clone git@github.com:KNK2005/Collaborative-Text-Editor.git
   cd Collaborative-Text-Editor
   ```

2. **Install Dependencies:**  
   ```bash
   npm install
   ```

3. **Set Up MongoDB:**  
   - Set up a **MongoDB** database for file storage.
   - Add environment variables for MongoDB configurations.

4. **Start the Backend Server:**  
   ```bash
   node server.js
   ```
   
5. **Start the Application:**  
   ```bash
   npm start
   ```

6. **Access the Editor:**  
   Open your browser and navigate to:  
   ```
   http://localhost:3000
   ```

---

## 👥 Contributors

### Team Members and Their Contributions

- **S Kaushik Nishaanth Kumar**  
  - Designed and implemented the **frontend** using React.  
  - Created UI components for seamless user experience.
  - Contributed to deployment and testing.

- **Sanidhya Kumar**  
  - Developed the **backend** using Node.js and Express.  
  - Implemented **database schemas** and integrated MongoDB.
  - Integrated **real-time collaboration** features using WebSockets.  

---

## 🤝 Contributing

We welcome contributions from the community! Please follow these steps:

1. **Fork the repository** on GitHub.
2. **Create a new branch**:  
   ```bash
   git checkout -b feature-branch-name
   ```
3. **Make your changes** and **commit**:  
   ```bash
   git commit -m "Added new feature or fixed an issue"
   ```
4. **Push to your branch**:  
   ```bash
   git push origin feature-branch-name
   ```
5. **Open a pull request** on GitHub with a brief description of your changes.

---

## 📄 License


This project is licensed under the **MIT License**. For more details, please refer to the [LICENSE.md](LICENSE.md) file or visit the [MIT License website](https://mit-license.org/).


---

## 📧 Contact

📸 Screenshots

-Here is a Preview of the website:

-Home Page:

  ![Screenshot](Asset/Screenshot-1.png)
-Signup Page:

  ![Screenshot](Asset/Screenshot-2.png)
-Login Page:

  ![Screenshot](Asset/Screenshot-3.png)
-Home Page after Logging in:

  ![Screenshot](Asset/Screenshot-4.png)
-Dashboard:

  ![Screenshot](Asset/Screenshot-5.png)
-Editor Page:

  ![Screenshot](Asset/Screenshot-6.png)

For any questions, feedback, or bug reports, please open an issue on GitHub or reach out to the project maintainers.

---




This editor is built to foster collaborative writing, with powerful tools integrated for error-free, creative, and efficient documentation. We look forward to your contributions and feedback to make this tool even better! 🚀
