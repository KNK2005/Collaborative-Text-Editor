import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import Texteditor from './Page/Texteditor';
import { v4 as uuidv4 } from 'uuid';
import './CollabTexteditor.css';

const socket = io('http://localhost:4000'); // Server URL

const CollabTexteditor = () => {
  const { docId } = useParams(); // Get docId from URL
  const navigate = useNavigate();
  const location = useLocation();
  const { content = '', username = 'Guest' } = location.state || {}; // Default username as "Guest"
  const [text, setText] = useState(content);

  useEffect(() => {
    // If no document ID, generate a new one and redirect to it
    if (!docId) {
      const newDocId = uuidv4();
      navigate(`/text-editor/${newDocId}`, { state: { content, username } });
      return;
    }

    // Join the document room
    socket.emit('join-document', docId);

    // Load the initial text from the server if not passed via state
    if (!content) {
      socket.on('load-text', (initialText) => {
        setText(initialText);
      });
    }

    // Update text in real-time
    socket.on('receive-text', (updatedText) => {
      setText(updatedText);
    });

    return () => {
      socket.off('load-text');
      socket.off('receive-text');
    };
  }, [docId, navigate, content]);

  const handleTextChange = (newText) => {
    setText(newText);
    socket.emit('text-change', newText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('URL copied to clipboard!');
  };

  const copyDocIdToClipboard = () => {
    navigator.clipboard.writeText(docId);
    alert('Document ID copied to clipboard!');
  };

  const saveToDB = async () => {
    try {
      const response = await fetch('http://localhost:4000/save-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ docId, username, content: text }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Document saved to the database successfully!');
      } else {
        alert(`Failed to save document: ${result.message}`);
      }
    } catch (error) {
      console.error('Error saving document:', error);
      alert('An error occurred while saving the document.');
    }
  };

  return (
    <div className="collab-texteditor">
      <div className="buttons-container">
        <button className="share-button" onClick={copyToClipboard}>
          Share Document Link
        </button>
        <button className="copy-docid-button" onClick={copyDocIdToClipboard}>
          Copy Document ID
        </button>
        <button className="save-db-button" onClick={saveToDB}>
          Save to DB
        </button>
      </div>
      <Texteditor text={text} onTextChange={handleTextChange} />
    </div>
  );
};

export default CollabTexteditor;
