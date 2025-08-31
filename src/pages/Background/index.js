// Background script for Website Text Extractor
console.log('Website Text Extractor background script loaded');

// Store extension state
let extensionEnabled = true;

// Import OpenAI
import OpenAI from 'openai';

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getExtensionState') {
    sendResponse({ enabled: extensionEnabled });
  } else if (request.action === 'setExtensionState') {
    extensionEnabled = request.enabled;
    // Broadcast to all tabs
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, {
          action: 'toggle',
          enabled: extensionEnabled
        }).catch(() => {
          // Ignore errors for tabs that don't have content script
        });
      });
    });
    sendResponse({ success: true });
  } else if (request.action === 'testApiKey') {
    testApiKey(request.apiKey).then(success => {
      sendResponse({ success });
    }).catch(() => {
      sendResponse({ success: false });
    });
    return true; // Keep message channel open for async response
  } else if (request.action === 'generateSummary') {
    generateSummary(request.text, request.apiKey).then(summary => {
      sendResponse({ success: true, summary });
    }).catch(error => {
      sendResponse({ success: false, error: error.message });
    });
    return true; // Keep message channel open for async response
  }
});

// Function to test API key
async function testApiKey(apiKey) {
  try {
    const client = new OpenAI({ apiKey });
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Hello" }],
      max_tokens: 5
    });
    return true;
  } catch (error) {
    console.error('API key test failed:', error);
    return false;
  }
}

// Function to generate summary
async function generateSummary(text, apiKey) {
  try {
    const client = new OpenAI({ apiKey });
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Please provide a concise summary of the following text in 2-3 sentences:\n\n${text.substring(0, 4000)}`
        }
      ],
      max_tokens: 200
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Summary generation failed:', error);
    throw error;
  }
}

// Handle extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Website Text Extractor installed');
});
