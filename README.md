# 🤖 Telegram Bot API Playground

A comprehensive web-based tool for testing and learning the Telegram Bot API. This playground provides an intuitive interface to interact with Telegram Bot API methods with all available parameters, real-time payload visualization, and response handling.

## ✨ Features

### 🎯 Complete API Coverage

- **sendMessage**: Full implementation with all documented parameters
- **sendPhoto**: Complete photo sending functionality with file upload and URL support
- All parameters organized into collapsible sections for better UX

### 📋 Parameter Categories

- **Basic Parameters**: Essential fields like chat_id, text, photo
- **Advanced Parameters**: Business connections, message threads, entities, effects
- **Link Preview Options**: URL preview settings and media handling
- **Media Options**: Caption positioning, spoiler effects
- **Message Options**: Notifications, content protection, paid broadcasts
- **Reply Parameters**: Message replies with quoting and positioning

### 🔍 Real-time Debugging

- **Payload Display**: See exactly what data is being sent to the API
- **Response Visualization**: Formatted JSON responses with success/error indicators
- **File Upload Support**: Handle both file uploads and URL-based media
- **FormData Visualization**: Readable display of multipart form data including file information

### 🎨 User Interface

- **Responsive Design**: Works on desktop and mobile devices
- **Collapsible Sections**: Organized parameter groups to reduce clutter
- **Scrollable Panels**: Both left and right panels with custom scrollbars
- **Modern Styling**: Clean, professional interface with smooth animations
- **Dark Response Area**: Easy-to-read JSON formatting

## 🚀 Getting Started

### Prerequisites

- A Telegram Bot Token (get one from [@BotFather](https://t.me/BotFather))
- A web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. No additional setup required - it's a client-side application!

### Usage

1. **Enter Bot Token**: Input your bot token from @BotFather
2. **Choose Method**: Select between sendMessage or sendPhoto
3. **Fill Parameters**: Complete the required fields (marked with \*)
4. **Optional Parameters**: Expand collapsible sections for advanced options
5. **Send Request**: Click the send button to execute the API call
6. **View Results**: Check the Payload and Response panels for debugging

## 📖 API Methods Supported

### sendMessage

Send text messages with full parameter support:

- Text formatting (Markdown, HTML)
- Link preview customization
- Message effects and business connections
- Reply parameters with quoting
- Message protection and notifications

### sendPhoto

Send photos with comprehensive options:

- File upload or URL-based photos
- Caption with formatting
- Media options (spoiler, caption positioning)
- All message options available for text messages

## 🔧 Technical Details

### File Structure

```
├── index.html          # Main HTML structure
├── script.js           # JavaScript functionality
├── style.css           # Styling and responsive design
└── README.md           # Documentation
```

### Browser Compatibility

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

### API Integration

- Uses Fetch API for HTTP requests
- FormData for file uploads
- JSON for text-based requests
- Real-time error handling

## 📝 Parameter Reference

### Required Parameters

- **Chat ID**: Target chat identifier (@username or numeric ID)
- **Content**: Message text or photo file/URL

### Optional Enhancements

- **Parse Mode**: Markdown, MarkdownV2, or HTML formatting
- **Message Effects**: Special visual effects (private chats only)
- **Business Connections**: For Telegram Business accounts
- **Reply Parameters**: Quote and reply to specific messages
- **Content Protection**: Prevent forwarding and saving

## 🐛 Debugging Features

### Payload Visualization

- Shows exact JSON or FormData being sent
- File information display (name, type, size)
- Timestamp for each request
- Method identification

### Response Analysis

- Formatted JSON output
- Success/error color coding
- Complete API response details
- Error message highlighting

## 🤝 Contributing

This project is created by **Rendi Gunawan**. Feel free to:

- Report bugs or issues
- Suggest new features
- Submit pull requests
- Share feedback

### Contact

- **GitHub**: [@rendinawan](https://github.com/rendinawan)
- **Telegram**: [@rendinawan](https://t.me/rendinawan)

## 📚 Resources

- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [Bot Creation Guide](https://core.telegram.org/bots#creating-a-new-bot)
- [Telegram Bot Features](https://core.telegram.org/bots/features)

## 📄 License

This project is open source and available under the MIT License.

## 🆕 Recent Updates

- ✅ Complete parameter coverage for sendMessage and sendPhoto
- ✅ Collapsible parameter sections for better UX
- ✅ Real-time payload visualization
- ✅ Scrollable panels with custom styling
- ✅ Enhanced file upload support
- ✅ FormData debugging capabilities

---

**Made with ❤️ by Rendi Gunawan**
