# Contact Form Setup Instructions

## JavaScript Solution for GitHub Pages

This contact form uses JavaScript with Formspree to handle email submissions without requiring PHP hosting.

## Setup Instructions

### 1. Get Formspree Endpoint

1. Go to [Formspree.io](https://formspree.io) and create a free account
2. Create a new form
3. Copy your form endpoint (looks like: `https://formspree.io/f/xaybzwkd`)

### 2. Update JavaScript File

Open `forms/contact.js` and replace `YOUR_FORMSPREE_ENDPOINT` with your actual Formspree endpoint:

```javascript
const formspreeEndpoint = 'https://formspree.io/f/YOUR_ACTUAL_ENDPOINT';
```

### 3. Test Locally

You can test the contact form locally using any of these methods:

#### Method 1: Live Server (VS Code Extension)
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html` and select "Open with Live Server"
3. Your site will open at `http://127.0.0.1:5501` (or similar)
4. Navigate to the contact page and test the form

#### Method 2: Python HTTP Server
```bash
# Navigate to your project directory
cd /path/to/your/project

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open `http://localhost:8000` in your browser.

#### Method 3: Node.js HTTP Server
```bash
# Install http-server globally
npm install -g http-server

# Navigate to your project directory
cd /path/to/your/project

# Start server
http-server -p 8000
```
Then open `http://localhost:8000` in your browser.

## How It Works

1. User fills out the contact form
2. JavaScript validates the form data
3. Data is sent to Formspree via fetch API
4. Formspree forwards the email to `president@ebytestechnology.com`
5. User sees success/error message

## Form Features

- **Fields**: name, email, subject, message
- **Validation**: All fields required, email format validated
- **Security**: Input sanitization and validation
- **Target Email**: president@ebytestechnology.com
- **Loading States**: Shows loading indicator during submission
- **Error Handling**: Displays user-friendly error messages

## Troubleshooting

### CORS Issues
If you get CORS errors when testing locally, it's normal. The form will work fine when deployed to GitHub Pages.

### Form Not Working
1. Check browser console for JavaScript errors
2. Verify your Formspree endpoint is correct
3. Make sure all form fields have the correct `name` attributes

### Testing Email Delivery
1. Submit a test form
2. Check your Formspree dashboard for the submission
3. Verify the email was received at president@ebytestechnology.com
