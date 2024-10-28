import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [docID, setDocID] = useState();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const dropArea = document.getElementById('drop-area');

        const handleDragOver = (event) => {
            event.preventDefault();
            dropArea.classList.add('hover');
        };

        const handleDragLeave = () => {
            dropArea.classList.remove('hover');
        };

        const handleDrop = (event) => {
            event.preventDefault();
            dropArea.classList.remove('hover');
            const files = event.dataTransfer.files;
            handleFiles(files);
        };

        dropArea.addEventListener('dragover', handleDragOver);
        dropArea.addEventListener('dragleave', handleDragLeave);
        dropArea.addEventListener('drop', handleDrop);

        return () => {
            dropArea.removeEventListener('dragover', handleDragOver);
            dropArea.removeEventListener('dragleave', handleDragLeave);
            dropArea.removeEventListener('drop', handleDrop);
        };
    }, []);

    const handleFiles = (files) => {
        for (let i = 0; i < files.length; i++) {
            const fileType = files[i].type;
            const fileName = files[i].name;
            const fileExtension = fileName.split('.').pop();
    
            if (fileType === 'text/plain') {
                console.log(`${fileName} is a .txt file`);
                navigate('/text-editor');
                break;
            } else if (fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                console.log(`${fileName} is a Word file`);
                navigate('/word-editor');
                break;
            } else {
                alert(`${fileName} is not a supported file format.`);
            }
        }
    };
    

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        handleFiles(files);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const createDocument = (fileType) => {
        setShowModal(false);
        if (fileType === "txt") {
            console.log("Creating .txt document...");
            navigate('/text-editor');
        } else if (fileType === "docx") {
            console.log("Creating .docx document...");
            navigate('/word-editor');
        }
    };


    return (
        <>
            <div className="container">
                <div id="drop-area">
                <img src="/UploadIcon.jpg" alt="Drop Area Image" id="drop-image" />
                    <p>Drag and drop to Upload</p>
                    <input type="file" id="fileElem" multiple accept=".txt, .docx" style={{ display: 'none' }} onChange={handleFileInputChange} />
                    <label htmlFor="fileElem" id="file-label">Select Files</label>
                </div>
                <input
                    placeholder="Enter Document ID"
                    value={docID}
                    onChange={e => setDocID(e.target.value)}
                /><button onClick={openModal}>Create Document</button>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Select File Type</h3>
                        <button onClick={() => createDocument("txt")}>.txt</button>
                        <button onClick={() => createDocument("docx")}>.docx</button>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )}
            </>
    );
}

export default HomePage;
