import React, { useState } from 'react';
import './TextEditor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faAlignCenter, faAlignRight, faAlignJustify } from '@fortawesome/free-solid-svg-icons';

const TextEditor = ({ text, onTextChange }) => {
  const [fontSize, setFontSize] = useState(14);
  const [color, setColor] = useState('#000000');
  const [textStyle, setTextStyle] = useState({
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    textTransform: 'none',
    textAlign: 'left',
  });

  const toggleStyle = (property, value) => {
    setTextStyle((prevStyle) => ({
      ...prevStyle,
      [property]: prevStyle[property] === value ? 'initial' : value,
    }));
  };

  // Save file functionality
  const handleSaveFile = () => {
    const randomNumbers = Math.floor(100 + Math.random() * 900); // Generate a random three-digit number
    const fileName = `syncwrite_${randomNumbers}.txt`; // Create a file name

    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  return (
    <div className="text-editor-container">
      <main className="text-editor-main">
        <section className="text-editor-section">
          <section className="toolbar">
            <div className="toolbar-item">
              <input
                className="input-font-size"
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                min="8"
              />
              <button
                className="button-style"
                onClick={() => toggleStyle('textTransform', 'uppercase')}
              >
                Aa
              </button>

            </div>

            <div className="toolbar-item">
              <button
                className="button-style"
                onClick={() => toggleStyle('fontWeight', 'bold')}
              >
                <b>B</b>
              </button>
              <button
                className="button-style"
                onClick={() => toggleStyle('fontStyle', 'italic')}
              >
                <i>I</i>
              </button>
              <button
                className="button-style"
                onClick={() => toggleStyle('textDecoration', 'underline')}
              >
                <u>U</u>
              </button>
            </div>

            <div className="toolbar-item">
              <button
                className="button-style"
                onClick={() => setTextStyle((prev) => ({ ...prev, textAlign: 'left' }))}
              >
                <FontAwesomeIcon icon={faAlignLeft} />
              </button>
              <button
                className="button-style"
                onClick={() => setTextStyle((prev) => ({ ...prev, textAlign: 'center' }))}
              >
                <FontAwesomeIcon icon={faAlignCenter} />
              </button>
              <button
                className="button-style"
                onClick={() => setTextStyle((prev) => ({ ...prev, textAlign: 'right' }))}
              >
                <FontAwesomeIcon icon={faAlignRight} />
              </button>
              <button
                className="button-style"
                onClick={() => setTextStyle((prev) => ({ ...prev, textAlign: 'justify' }))}
              >
                <FontAwesomeIcon icon={faAlignJustify} />
              </button>
            </div>

            <div className="toolbar-item">
              <button
                className="button-clear"
                onClick={() => onTextChange('')}
              >
                X
              </button>
              <button
                className="button-save"
                onClick={handleSaveFile}
              >
                Save to Desktop
              </button>
            </div>
          </section>

          <article>
            <textarea
              className="textarea-editor"
              style={{
                fontSize: `${fontSize}px`,
                color: color,
                fontWeight: textStyle.fontWeight,
                fontStyle: textStyle.fontStyle,
                textDecoration: textStyle.textDecoration,
                textTransform: textStyle.textTransform,
                textAlign: textStyle.textAlign,
              }}
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              placeholder="Start typing..."
            />
          </article>
        </section>
      </main>
    </div>
  );
};

export default TextEditor;
