<img src="src/assets/img/icon-128.png" width="64"/>

# 🤖 AI Summary Chrome Extension

A beautiful Chrome extension that extracts text from web pages and generates AI-powered summaries using OpenAI's GPT-4o-mini model. Features a stunning "Fog and Colors" glassmorphism theme for a modern, ethereal user experience.

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-blue)](https://developer.chrome.com/docs/extensions/mv3/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-green)](https://openai.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## ✨ Features

- **🤖 AI-Powered Summaries**: Generate concise summaries using OpenAI's GPT-4o-mini model
- **💾 Summary Management**: Save and delete summaries for future reference
- **🎨 Beautiful UI**: Stunning "Fog and Colors" glassmorphism theme
- **📄 Text Extraction**: Extract clean text content from any webpage
- **🔒 Secure API**: Secure OpenAI API key storage using Chrome's storage API
- **⚡ Fast Performance**: Optimized for speed with modern React 18
- **🛡️ Error Handling**: Comprehensive error handling and user feedback
- **📱 Responsive Design**: Works seamlessly across different screen sizes

## 🎨 Visual Design

This extension features a beautiful "Fog and Colors" theme inspired by modern glassmorphism design:

- **Purple Gradient Backgrounds**: Smooth transitions from light to dark purple
- **Glassmorphism Effects**: Translucent cards with backdrop blur
- **Subtle Animations**: Smooth hover effects and transitions
- **Modern Typography**: Clean, readable fonts with subtle text shadows
- **Layered Depth**: Multiple translucent layers creating visual depth

### Prerequisites

- [Node.js](https://nodejs.org/) version >= **18**
- [Chrome Browser](https://www.google.com/chrome/)
- [OpenAI API Key](https://platform.openai.com/api-keys)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/juanvillano/text-ai-summary-chrome-extension.git
   cd text-ai-summary-chrome-extension
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build
   ```

4. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `build` folder from this project

5. **Configure OpenAI API**
   - Click the extension icon in your Chrome toolbar
   - Toggle "Enable AI Summary" to ON
   - Enter your OpenAI API key
   - Click "Save API Key"

## 📖 How to Use

1. **Enable the Extension**
   - Click the extension icon in your Chrome toolbar
   - Toggle "Enable Text Extractor" to ON

2. **Extract Text from a Webpage**
   - Navigate to any webpage you want to summarize
   - Look for the blue circle icon (📄) in the top-right corner
   - Click the icon to extract and view the page's text content

3. **Generate AI Summary**
   - In the text dialog, click the "🤖 AI Summary" button
   - Wait for the AI to generate a concise summary
   - The summary will appear in a dedicated section below the text

4. **Save Summary**
   - Click "💾 Save Summary" in the extension popup
   - Your summary will be saved and visible in the popup
   - Use "🗑️ Delete" to remove saved summaries

## 🔧 Technical Features

This extension is built with modern web technologies:

- **[Chrome Extension Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/)**: Latest Chrome extension standard
- **[React 18](https://reactjs.org/)**: Modern React with hooks and concurrent features
- **[Webpack 5](https://webpack.js.org/)**: Advanced bundling and optimization
- **[OpenAI API](https://openai.com/)**: GPT-4o-mini for intelligent text summarization
- **[Glassmorphism CSS](https://css-tricks.com/glassmorphism-and-css/)**: Modern UI design with backdrop filters
- **[Chrome Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)**: Secure local data storage

## 🛠️ Development

### Development Mode

For development with hot reload:

```bash
npm start
```

This will start the webpack dev server with automatic reloading when you make changes.

### Building for Production

To build the extension for production:

```bash
npm run build
```

The `build` folder will contain the extension ready for Chrome Web Store submission.

### Project Structure

```
src/
├── pages/
│   ├── Background/          # Background script
│   ├── Content/            # Content script for webpage interaction
│   └── Popup/              # Extension popup interface
├── assets/
│   └── img/                # Extension icons
└── manifest.json           # Extension manifest
```

## 📋 Requirements

- **Node.js**: Version 18 or higher
- **Chrome Browser**: Latest version
- **OpenAI API Key**: Required for AI summarization features
- **Internet Connection**: Required for OpenAI API calls

## 🔐 Security & Privacy

- **API Key Storage**: Your OpenAI API key is stored securely in Chrome's local storage
- **No Data Collection**: This extension does not collect or transmit any personal data
- **Local Processing**: Text extraction happens locally in your browser
- **Secure API Calls**: All API calls to OpenAI are made securely over HTTPS

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built on the excellent [Chrome Extension Boilerplate](https://github.com/lxieyang/chrome-extension-boilerplate-react)
- Inspired by modern glassmorphism design principles
- Powered by OpenAI's GPT-4o-mini model

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/juanvillano/text-ai-summary-chrome-extension/issues) page
2. Create a new issue with detailed information
3. Include your Chrome version and any error messages

---

**Made with ❤️ by [Juan Villar](https://github.com/juanvillano)**


