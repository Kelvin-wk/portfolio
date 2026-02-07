// ==========================================
// KELVIN'S PORTFOLIO BACKEND SERVER
// ==========================================

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from the portfolio directory
app.use(express.static(__dirname));

// ==========================================
// ROUTES
// ==========================================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Backend server is running',
    timestamp: new Date().toISOString()
  });
});

// Get portfolio info
app.get('/api/portfolio', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      name: 'Kelvin',
      title: 'Web Developer',
      location: 'Nairobi, Kenya',
      email: 'kibuikevin@zetech.ac.ke',
      phone: '+254 742 171 271',
      bio: 'Passionate web developer building amazing digital experiences',
      skills: [
        'HTML5',
        'CSS3',
        'JavaScript',
        'Responsive Design',
        'Web Development',
        'Problem Solving',
        'Git',
        'UI/UX'
      ],
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/ķèłvïņ-ĥåįž-0a7226362',
        github: 'https://github.com/BCS-05-0109KEVIN',
        twitter: '#',
        portfolio: '#'
      }
    }
  });
});

// Get projects data
app.get('/api/projects', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: [
      {
        id: 1,
        title: 'Responsive Portfolio Website',
        description: 'A fully responsive portfolio website with modern design',
        frontend: ['HTML5', 'CSS3', 'JavaScript', 'Dark Mode'],
        backend: 'Static hosting (GitHub Pages, Netlify)',
        link: '#'
      },
      {
        id: 2,
        title: 'Interactive Web App',
        description: 'Dynamic web application with state management',
        frontend: ['JavaScript', 'DOM Manipulation', 'CSS Grid', 'React'],
        backend: 'Node.js/Express, MongoDB, JWT auth',
        link: '#'
      },
      {
        id: 3,
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration',
        frontend: ['React', 'Redux', 'CSS'],
        backend: 'Node.js/Express, PostgreSQL, Stripe API',
        link: '#'
      }
    ]
  });
});

// Contact form submission
app.post(
  '/api/contact',
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ min: 3 }).withMessage('Subject must be at least 3 characters'),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
  ],
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;

    // Here you would typically save to database and send email
    // For now, just log and return success
    console.log('New contact message:', { name, email, subject, message });

    // In a real app, you would:
    // 1. Save to database
    // 2. Send confirmation email to user
    // 3. Send notification email to admin

    res.status(200).json({
      status: 'success',
      message: 'Your message has been received! We will get back to you soon.',
      timestamp: new Date().toISOString()
    });
  }
);

// Get contact info
app.get('/api/contact-info', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      email: 'kibuikevin@zetech.ac.ke',
      phone: '+254 742 171 271',
      location: 'Nairobi, Kenya',
      responseTime: '24 hours'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
    path: req.path
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(`\n✨ Portfolio Backend Server Running`);
  console.log(`📍 Server: http://localhost:${PORT}`);
  console.log(`🔗 API Health: http://localhost:${PORT}/api/health`);
  console.log(`📧 Portfolio API: http://localhost:${PORT}/api/portfolio`);
  console.log(`\n✅ Server started in ${process.env.NODE_ENV || 'development'} mode\n`);
});

module.exports = app;
