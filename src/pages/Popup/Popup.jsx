import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [isApiEnabled, setIsApiEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [savedSummary, setSavedSummary] = useState('');

  useEffect(() => {
    try {
      // Get current status from background script
      chrome.runtime.sendMessage({ action: 'getExtensionState' }, (response) => {
        try {
          if (response && response.enabled !== undefined) {
            setIsEnabled(response.enabled);
          }
        } catch (error) {
          console.log('Extension state response error:', error);
        }
      });

      // Get API key and saved summary from storage
      chrome.storage.local.get(['openaiApiKey', 'isApiEnabled', 'savedSummary'], (result) => {
        try {
          if (result.openaiApiKey) {
            setApiKey(result.openaiApiKey);
          }
          if (result.isApiEnabled !== undefined) {
            setIsApiEnabled(result.isApiEnabled);
          }
          if (result.savedSummary) {
            setSavedSummary(result.savedSummary);
          }
        } catch (error) {
          console.log('Storage get error:', error);
        }
      });
    } catch (error) {
      console.log('Popup initialization error:', error);
    }
  }, []);

  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);

    try {
      // Send message to background script
      chrome.runtime.sendMessage({
        action: 'setExtensionState',
        enabled: newState
      });
    } catch (error) {
      console.log('Toggle message error:', error);
    }
  };



  const handleApiToggle = () => {
    const newState = !isApiEnabled;
    setIsApiEnabled(newState);
    try {
      chrome.storage.local.set({ isApiEnabled: newState });
    } catch (error) {
      console.log('API toggle storage error:', error);
    }
  };

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      try {
        chrome.storage.local.set({ openaiApiKey: apiKey.trim() });
        setIsLoading(true);
        // Test the API key by sending a message to background script
        chrome.runtime.sendMessage({
          action: 'testApiKey',
          apiKey: apiKey.trim()
        }, (response) => {
          try {
            setIsLoading(false);
            if (response && response.success) {
              alert('API key saved successfully!');
            } else {
              alert('Invalid API key. Please check and try again.');
            }
          } catch (error) {
            console.log('API key test response error:', error);
            setIsLoading(false);
            alert('Error testing API key. Please try again.');
          }
        });
      } catch (error) {
        console.log('API key submit error:', error);
        setIsLoading(false);
        alert('Error saving API key. Please try again.');
      }
    }
  };

  const handleSaveSummary = () => {
    try {
      // Get the current summary from the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'getCurrentSummary' }, (response) => {
          try {
            if (response && response.summary) {
              chrome.storage.local.set({ savedSummary: response.summary }, () => {
                setSavedSummary(response.summary);
                alert('Summary saved successfully!');
              });
            } else {
              alert('No summary available to save. Please generate a summary first.');
            }
          } catch (error) {
            console.log('Save summary response error:', error);
            alert('Error saving summary. Please try again.');
          }
        });
      });
    } catch (error) {
      console.log('Save summary error:', error);
      alert('Error saving summary. Please try again.');
    }
  };

  const handleDeleteSummary = () => {
    try {
      chrome.storage.local.remove('savedSummary', () => {
        setSavedSummary('');
        alert('Summary deleted successfully!');
      });
    } catch (error) {
      console.log('Delete summary error:', error);
      alert('Error deleting summary. Please try again.');
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-header">
        <h2>Website Text Extractor</h2>
      </div>
      <div className="popup-content">
        <div className="toggle-section">
          <label className="toggle-label">
            <span>Enable Text Extractor</span>
            <button
              className={`toggle-button ${isEnabled ? 'enabled' : 'disabled'}`}
              onClick={handleToggle}
            >
              {isEnabled ? 'ON' : 'OFF'}
            </button>
          </label>
        </div>



        {/* OpenAI API Section */}
        <div className="api-section">
          <div className="api-toggle-section">
            <label className="toggle-label">
              <span>Enable AI Summary</span>
              <button
                className={`toggle-button ${isApiEnabled ? 'enabled' : 'disabled'}`}
                onClick={handleApiToggle}
              >
                {isApiEnabled ? 'ON' : 'OFF'}
              </button>
            </label>
          </div>

          <div className="api-key-section">
            <input
              type="password"
              placeholder="Enter OpenAI API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="api-key-input"
            />
            <button
              className="api-submit-button"
              onClick={handleApiKeySubmit}
              disabled={!apiKey.trim() || isLoading}
            >
              {isLoading ? 'Testing...' : 'Save API Key'}
            </button>
          </div>
        </div>

        {/* Saved Summary Section */}
        <div className="summary-section">
          <div className="summary-header">
            <h4>Saved Summary</h4>
            <div className="summary-buttons">
              <button
                className="save-summary-button"
                onClick={handleSaveSummary}
                disabled={!isApiEnabled}
              >
                💾 Save Summary
              </button>
              <button
                className="delete-summary-button"
                onClick={handleDeleteSummary}
                disabled={!savedSummary}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
          {savedSummary && (
            <div className="saved-summary-content">
              <p>{savedSummary}</p>
            </div>
          )}
        </div>

        <div className="instructions">
          <p>When enabled, a blue circle icon will appear in the top-right corner of web pages.</p>
          <p>Click the icon to extract and view the page's text content.</p>
          {isApiEnabled && (
            <p>AI Summary feature is enabled. Click the summary button in the text dialog to generate AI summaries.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
