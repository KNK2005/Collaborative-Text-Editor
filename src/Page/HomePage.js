import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; 

const HomePage = ({ username }) => {
  const [docID, setDocID] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [fileName, setFileName] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const dropArea = document.getElementById("drop-area");

    const handleDragOver = (event) => {
      event.preventDefault();
      dropArea.classList.add("hover");
    };

    const handleDragLeave = () => {
      dropArea.classList.remove("hover");
    };

    const handleDrop = (event) => {
      event.preventDefault();
      dropArea.classList.remove("hover");
      const files = event.dataTransfer.files;
      handleFiles(files);
    };

    dropArea.addEventListener("dragover", handleDragOver);
    dropArea.addEventListener("dragleave", handleDragLeave);
    dropArea.addEventListener("drop", handleDrop);

    return () => {
      dropArea.removeEventListener("dragover", handleDragOver);
      dropArea.removeEventListener("dragleave", handleDragLeave);
      dropArea.removeEventListener("drop", handleDrop);
    };
  }, []);

  // Handle file upload (only .txt files now)
  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = file.type;
      const fileName = file.name;
      const generatedDocID = uuidv4(); // Generate a unique document ID for the file

      if (fileType === "text/plain") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileContent = e.target.result;
          navigate(`/text-editor/${generatedDocID}`, { state: { content: fileContent, fileName } });
        };
        reader.onerror = () => {
          console.error("Error reading file");
        };
        reader.readAsText(file);
        break;
      } else {
        alert(`${fileName} is not a supported file format. Please upload a .txt file.`);
      }
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  // Open the modal to create a new document
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Create new document (only .txt now)
  const createDocument = (fileType) => {
    const newDocID = uuidv4();
    setShowModal(false);

    if (fileType === "txt") {
      navigate(`/text-editor/${newDocID}`, { state: { content: "", fileName: "New Document.txt" } });
    }
  };

  // Join an existing document by ID
  const joinDocument = () => {
    if (docID.trim()) {
      navigate(`/text-editor/${docID}`);
    } else {
      alert("Please enter a valid document ID.");
    }
  };

  return (
    <>
      <div className="container">
        
        <h1>Hi, {username}</h1> {/* Display the username here */}
        <div id="drop-area">
          <img src="/UploadIcon.jpg" alt="Drop Area" id="drop-image" />
          <p>Drag and drop to upload a document</p>
          <input
            type="file"
            id="fileElem"
            multiple
            accept=".txt"
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
          <label htmlFor="fileElem" id="file-label">
            Select Files
          </label>
        </div>
        <input
          placeholder="Enter Document ID to join"
          value={docID}
          onChange={(e) => setDocID(e.target.value)}
        />
        <div class="side-by-side-container">

        <button  className="joinDoc" onClick={joinDocument}>Join Document</button>
        <button className="createDoc" onClick={openModal}>Create Document</button>
      </div>
      </div>


      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Select Document Type</h3>

            <button onClick={() => createDocument("txt")}>.txt</button>
            <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
      )}
    </>
  );
};

export default HomePage;
