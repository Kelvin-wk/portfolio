# Kelvin's Professional Portfolio

A modern, responsive portfolio website with dark mode support and interactive features.

## Features

### Frontend
- ✨ Smooth scroll animations
- 🌙 Dark mode toggle with persistence
- 📱 Fully responsive design
- ⌨️ Typing animation on hero section
- 🖼️ Clickable profile image modal
- 🎨 Beautiful parallax background
- 🔗 Smooth page transitions

### Backend (Node.js/Express)
- 🔒 CORS enabled for security
- ✔️ Input validation on all endpoints
- 📧 Contact form submission API
- 📊 Portfolio data endpoints
- 🏥 Health check endpoint
- 🪵 Morgan logging
- 🛡️ Helmet security headers

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

4. **Start the server**
   ```bash
   # Development mode with hot reload
   npm run dev

   # Production mode
   npm start
   ```

5. **Access the portfolio**
   - Frontend: `http://localhost:5000`
   - API Health: `http://localhost:5000/api/health`

## API Endpoints

### GET `/api/health`
Health check endpoint to verify server status.

**Response:**
```json
{
  "status": "success",
  "message": "Backend server is running",
  "timestamp": "2026-02-07T10:30:00.000Z"
}
```

### GET `/api/portfolio`
Get complete portfolio information.

**Response:**
```json
{
  "status": "success",
  "data": {
    "name": "Kelvin",
    "title": "Web Developer",
    "location": "Nairobi, Kenya",
    "skills": [...],
    "socialLinks": {...}
  }
}
```

### GET `/api/projects`
Get all portfolio projects with tech stack details.

**Response:**
```json
{
  "status": "success",
  "data": [...]
}
```

### GET `/api/contact-info`
Get contact information.

**Response:**
```json
{
  "status": "success",
  "data": {
    "email": "kibuikevin@zetech.ac.ke",
    "phone": "+254 742 171 271",
    "location": "Nairobi, Kenya"
  }
}
```

### POST `/api/contact`
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in working together..."
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Your message has been received!",
  "timestamp": "2026-02-07T10:30:00.000Z"
}
```

## Project Structure

```
portfolio/
├── server.js              # Main Express server
├── package.json           # Node dependencies
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── index.html            # Home page
├── about.html            # About page
├── projects.html         # Projects page
├── contact.html          # Contact page
├── style.css             # Styles
├── script.js             # Frontend JavaScript
└── README.md             # This file
```

## Technologies Used

### Frontend
- HTML5
- CSS3 (with CSS Grid & Flexbox)
- Vanilla JavaScript
- Local Storage for preferences

### Backend
- Node.js
- Express.js
- Express Validator
- Helmet (Security)
- Morgan (Logging)
- CORS

## Configuration

### Environment Variables
Create a `.env` file in the root directory:

```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Email notification system
- [ ] User authentication
- [ ] Blog functionality
- [ ] Project filtering and search
- [ ] Analytics integration
- [ ] Admin dashboard

## License

ISC License - Feel free to use this portfolio as a template for your own!

## Contact

- Email: kibuikevin@zetech.ac.ke
- Phone: +254 742 171 271
- GitHub: [BCS-05-0109KEVIN](https://github.com/BCS-05-0109KEVIN)
- LinkedIn: [Kelvin's Profile](https://www.linkedin.com/in/ķèłvïņ-ĥåįž-0a7226362)

---

**Built with ❤️ by Kelvin**
