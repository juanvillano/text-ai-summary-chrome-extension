// Website Text Extractor Content Script
let isEnabled = true;
let floatingIcon = null;
let dialog = null;

// Function to extract text from the page
function extractPageText() {
  // Remove script and style elements
  const scripts = document.querySelectorAll('script, style, nav, header, footer, aside');
  scripts.forEach(el => el.style.display = 'none');

  // Get all text content
  const textContent = document.body.innerText || document.body.textContent;

  // Restore visibility
  scripts.forEach(el => el.style.display = '');

  // Clean up the text
  return textContent
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, '\n')
    .trim();
}

// Function to create floating icon
function createFloatingIcon() {
  if (floatingIcon) return;

  floatingIcon = document.createElement('div');
  floatingIcon.id = 'website-text-extractor-icon';
  floatingIcon.innerHTML = '📄';
  floatingIcon.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10000;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    font-size: 20px;
    color: white;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  `;

  floatingIcon.addEventListener('mouseenter', () => {
    floatingIcon.style.transform = 'scale(1.1)';
    floatingIcon.style.background = 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)';
    floatingIcon.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.6)';
  });

  floatingIcon.addEventListener('mouseleave', () => {
    floatingIcon.style.transform = 'scale(1)';
    floatingIcon.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    floatingIcon.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
  });

  floatingIcon.addEventListener('click', showTextDialog);

  document.body.appendChild(floatingIcon);
}

// Function to show text dialog
function showTextDialog() {
  if (dialog) {
    dialog.remove();
    dialog = null;
    return;
  }

  const text = extractPageText();

  dialog = document.createElement('div');
  dialog.id = 'website-text-extractor-dialog';
  dialog.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 800px;
    height: 70%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    z-index: 10001;
    display: flex;
    flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  `;

  dialog.innerHTML = `
    <div style="
      padding: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-radius: 16px 16px 0 0;
    ">
      <h3 style="margin: 0; color: white; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);">Extracted Text</h3>
      <div style="display: flex; gap: 10px;">
        <button id="summary-button" style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          transition: all 0.3s ease;
        ">🤖 AI Summary</button>
        <button id="close-dialog" style="
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
          transition: all 0.3s ease;
        ">Close</button>
      </div>
    </div>
    <div id="text-content" style="
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      line-height: 1.6;
      color: white;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    ">${text}</div>
    <div id="summary-content" style="
      display: none;
      padding: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-radius: 0 0 16px 16px;
    ">
      <h4 style="margin: 0 0 10px 0; color: white; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);">AI Summary</h4>
      <div id="summary-text" style="
        line-height: 1.6;
        color: white;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      "></div>
    </div>
  `;

  document.body.appendChild(dialog);

  // Add close functionality
  document.getElementById('close-dialog').addEventListener('click', () => {
    dialog.remove();
    dialog = null;
  });



  // add summary functionality
  document.getElementById('summary-button').addEventListener('click', () => {
    generateSummaryForText();
  });

  // Close on outside click
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      dialog.remove();
      dialog = null;
    }
  });
}



// Function to generate summary for text
async function generateSummaryForText() {
  if (!dialog) return;

  const summaryButton = document.getElementById('summary-button');
  const summaryContent = document.getElementById('summary-content');
  const summaryText = document.getElementById('summary-text');

  try {
    // Check if chrome.storage is available
    if (!chrome.storage || !chrome.storage.local) {
      alert('Storage not available. Please reload the extension.');
      return;
    }

    // Check if API is enabled
    chrome.storage.local.get(['isApiEnabled', 'openaiApiKey'], (result) => {
      try {
        if (!result.isApiEnabled || !result.openaiApiKey) {
          alert('Please enable AI Summary and add your OpenAI API key in the extension popup.');
          return;
        }

        // Show loading state
        summaryButton.textContent = 'Generating...';
        summaryButton.disabled = true;
        summaryContent.style.display = 'block';
        summaryText.textContent = 'Generating summary...';

        // Get current text
        const currentText = document.getElementById('text-content').textContent;

        // Send message to background script to generate summary
        chrome.runtime.sendMessage({
          action: 'generateSummary',
          text: currentText,
          apiKey: result.openaiApiKey
        }, (response) => {
          try {
            summaryButton.textContent = '🤖 AI Summary';
            summaryButton.disabled = false;

            if (response && response.success) {
              summaryText.textContent = response.summary;
            } else {
              summaryText.textContent = 'Error generating summary. Please check your API key and try again.';
            }
          } catch (error) {
            console.log('Summary response handler error:', error);
            summaryButton.textContent = '🤖 AI Summary';
            summaryButton.disabled = false;
            summaryText.textContent = 'Error generating summary. Please try again.';
          }
        });
      } catch (error) {
        console.log('Storage get error:', error);
        summaryButton.textContent = '🤖 AI Summary';
        summaryButton.disabled = false;
        summaryText.textContent = 'Error accessing storage. Please reload the extension.';
      }
    });
  } catch (error) {
    console.log('Summary generation error:', error);
    summaryButton.textContent = '🤖 AI Summary';
    summaryButton.disabled = false;
    summaryText.textContent = 'Error generating summary. Please try again.';
  }
}

// Function to remove floating icon
function removeFloatingIcon() {
  if (floatingIcon) {
    floatingIcon.remove();
    floatingIcon = null;
  }
  if (dialog) {
    dialog.remove();
    dialog = null;
  }
}

// Function to toggle extension
function toggleExtension(enabled) {
  isEnabled = enabled;
  if (enabled) {
    createFloatingIcon();
  } else {
    removeFloatingIcon();
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    // Check if extension context is valid
    if (!chrome.runtime || !chrome.runtime.id) {
      sendResponse({ success: false, error: 'Extension context invalid' });
      return;
    }

    if (request.action === 'toggle') {
      toggleExtension(request.enabled);
      sendResponse({ success: true });
    } else if (request.action === 'getStatus') {
      sendResponse({ enabled: isEnabled });
    } else if (request.action === 'getCurrentSummary') {
      // Get the current summary from the dialog if it exists
      const summaryText = document.getElementById('summary-text');
      if (summaryText && summaryText.textContent && summaryText.textContent !== 'Generating summary...') {
        sendResponse({ summary: summaryText.textContent });
      } else {
        sendResponse({ summary: null });
      }
    }
  } catch (error) {
    console.log('Content script message handler error:', error);
    sendResponse({ success: false, error: error.message });
  }
});

// Initialize on page load
if (isEnabled) {
  // Wait a bit for the extension context to be ready
  setTimeout(() => {
    try {
      if (chrome.runtime && chrome.runtime.id) {
        createFloatingIcon();
      }
    } catch (error) {
      console.log('Extension context not ready:', error);
    }
  }, 1000);
}
