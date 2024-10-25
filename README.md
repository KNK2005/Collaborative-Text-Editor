
# Collaborative Text Editor

A **web-based collaborative text editor** designed to enhance writing productivity by supporting multiple file formats and providing essential tools such as **grammar checking**, **plagiarism detection**, and **AI-powered text suggestions**. With this editor, managing documents becomes seamless, while collaboration is intuitive and efficient.

---

## 🚀 Features

### Supported File Types
- **`.txt`**  
- **`.doc`**  
- **`.docx`**

### Core Functionalities
- **Grammar Checker (via Grammarly API):**  
  Automatically identifies grammatical errors and suggests improvements in real time.

- **Plagiarism Detection (via Winston AI):**  
  Detects copied or unoriginal content by comparing text against multiple sources.

- **Generative Text Suggestions:**  
  Uses AI to provide auto-completion or enhancement suggestions for text input.

- **Save Files:**  
  Save documents in supported formats (.txt, .doc, .docx) with ease.

- **URL Support:**  
  Automatically recognizes valid URLs and converts them into clickable hyperlinks.

---

## 🔮 Future Features
- **Read-Only Mode:**  
  Enable non-editable views for documents, useful for reviewers and readers.

- **Live Text Synchronization:**  
  Allow multiple users to collaborate in real time, with all changes reflected instantly across devices.

---

## 🛠️ Technologies Used
- **Grammarly API:** For real-time grammar checking.  
- **Winston AI:** For robust plagiarism detection.  
- **Firebase Authentication:** For secure user authentication and session management.  
- **MongoDB:** For storing files and document metadata.  

---

## 📂 Folder Structure
```
Collaborative-Text-Editor/
├── node_modules/      # Dependencies (excluded from version control)
├── public/            # Static assets (HTML, CSS, client-side JavaScript)
├── src/               # Backend logic and main source code
├── .gitignore         # Files/folders to ignore in version control
├── package.json       # Project metadata and dependencies
├── README.md          # Project overview and instructions
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

3. **Set Up Firebase and MongoDB:**  
   - Create a Firebase project for **authentication**.
   - Set up a **MongoDB** database for file storage.
   - Add environment variables for Firebase and MongoDB configurations.

4. **Start the Application:**  
   ```bash
   npm start
   ```

5. **Access the Editor:**  
   Open your browser and navigate to:  
   ```
   http://localhost:3000
   ```

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

For any questions, feedback, or bug reports, please open an issue on GitHub or reach out to the project maintainers.

---

This editor is built to foster collaborative writing, with powerful tools integrated for error-free, creative, and efficient documentation. We look forward to your contributions and feedback to make this tool even better! 🚀
