import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Assuming you have a separate CSS file for styles

const Profile = () => {
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });
  const [documents, setDocuments] = useState([]); // Store documents specific to the user
  const [error, setError] = useState(null); // To track errors
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch user details
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user-profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status === 200) {
          setUserInfo({ username: data.username, email: data.email });
        } else {
          setError(data.message || 'Failed to fetch user information.');
        }
      } catch (error) {
        setError('Error fetching user details.');
      }
    };

    // Fetch user-specific documents
    const fetchUserDocuments = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user-documents', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status === 200) {
          setDocuments(data.documents || []);
        } else {
          setError(data.message || 'Failed to fetch documents.');
        }
      } catch (error) {
        setError('Error fetching documents.');
      }
    };

    fetchUserDetails();
    fetchUserDocuments();
  }, [navigate]);

  const handleLogout = () => {
    // Clear the token and user info from localStorage
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirect to Home after logout
  };

  return (
    <div className="profile-page">
      <h2>Welcome to your Dashboard</h2>

      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <div className="user-info">
            <p><strong>Username:</strong> {userInfo.username}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
          </div>

          <h3>Your Saved Documents</h3>
          <table className="documents-table">
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Document ID</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              {documents.length > 0 ? (
                documents.map((doc, index) => (
                  <tr key={doc.docId}>
                    <td>{index + 1}</td>
                    <td>
                      {/* Create a hyperlink that navigates to the text editor */}
                      <a
                        href={`/text-editor/${doc.docId}`}  // Link to the text editor page
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default anchor behavior
                          navigate(`/text-editor/${doc.docId}`);  // Programmatic navigation
                        }}
                        className="doc-link"
                      >
                        {doc.docId}
                      </a>
                    </td>
                    <td>
                        {doc.content.length > 20
                          ? doc.content.slice(0, 20) + '...' // Preview first 20 characters
                          : doc.content}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No documents found.</td>
                </tr>
              )}
            </tbody>
          </table>

        </>
      )}

    </div>
  );
};

export default Profile;
