import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import Texteditor from './Page/Texteditor';
import { v4 as uuidv4 } from 'uuid';

const socket = io('http://localhost:4000'); // Server URL

const CollabTexteditor = () => {
  const { docId } = useParams(); // Get docId from URL
  const navigate = useNavigate();
  const location = useLocation();
  const { content = '' } = location.state || {}; // Get content from state or set default
  const [text, setText] = useState(content);

  useEffect(() => {
    // If no document ID, generate a new one and redirect to it
    if (!docId) {
      const newDocId = uuidv4();
      navigate(`/text-editor/${newDocId}`, { state: { content } });
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

  return (
    <div>
      <button onClick={copyToClipboard}>Share Document Link</button>
      <Texteditor text={text} onTextChange={handleTextChange} />
    </div>
  );
};

export default CollabTexteditor;
