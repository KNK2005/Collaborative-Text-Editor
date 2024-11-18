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
  const storedUsername = localStorage.getItem("username");
  const username = storedUsername || location.state?.username || 'Guest'; // Default to 'Guest'

  const { content = '' } = location.state || {};  
  const [text, setText] = useState(content);
  const [fontSize, setFontSize] = useState(14);
  const [color, setColor] = useState('#000000');
  const [textStyle, setTextStyle] = useState({
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    textTransform: 'none',
    textAlign: 'left',
  });

  // Fetch initial document content
  useEffect(() => {
    const fetchDocument = async () => {
      const response = await fetch(`http://localhost:4000/api/text-editor/${docId}`);
      const data = await response.json();
      setText(data.content || '');
    };

    if (docId) fetchDocument();
  }, [docId]);

  // Handle style updates from the server
  useEffect(() => {
    socket.on('receive-style', (updatedStyle) => {
      setTextStyle(updatedStyle);
      if (updatedStyle.fontSize) setFontSize(updatedStyle.fontSize);
      if (updatedStyle.color) setColor(updatedStyle.color);
    });

    return () => {
      socket.off('receive-style');
    };
  }, []);

  // Handle joining the document room and syncing content
  useEffect(() => {
    if (!docId) {
      const newDocId = uuidv4();
      navigate(`/text-editor/${newDocId}`, { state: { content, username } });
      return;
    }

    socket.emit('join-document', docId);

    if (!content) {
      socket.on('load-text', (initialText) => {
        setText(initialText);
      });
    }

    socket.on('receive-text', (updatedText) => {
      setText(updatedText);
    });

    return () => {
      socket.off('load-text');
      socket.off('receive-text');
    };
  }, [docId, navigate, content]);

  // Broadcast text changes to the server
  const handleTextChange = (newText) => {
    setText(newText);
    socket.emit('text-change', newText);
  };

  // Broadcast style changes to the server
  const handleStyleChange = (property, value) => {
    const updatedStyle = {
      ...textStyle,
      [property]: value,
    };

    setTextStyle(updatedStyle);
    socket.emit('style-change', updatedStyle);
  };

  // Save the document to the database
  const saveToDB = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/save-document', {
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

  // Share link and document ID functions
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('URL copied to clipboard!');
  };

  const copyDocIdToClipboard = () => {
    navigator.clipboard.writeText(docId);
    alert('Document ID copied to clipboard!');
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
      <Texteditor
        text={text}
        onTextChange={handleTextChange}
        fontSize={fontSize}
        color={color}
        textStyle={textStyle}
        onStyleChange={handleStyleChange}
      />
    </div>
  );
};

export default CollabTexteditor;
