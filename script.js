// ==========================================
// DARK MODE TOGGLE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
	const themeToggle = document.getElementById('themeToggle');
	const htmlElement = document.documentElement;
	const body = document.body;

	// Load saved theme preference
	const savedTheme = localStorage.getItem('theme') || 'light';
	if (savedTheme === 'dark') {
		body.classList.add('dark-mode');
		themeToggle.textContent = '☀️';
	}

	// Toggle dark mode
	themeToggle?.addEventListener('click', () => {
		body.classList.toggle('dark-mode');
		const isDarkMode = body.classList.contains('dark-mode');
		localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
		themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
	});

	// ==========================================
	// MOBILE MENU TOGGLE
	// ==========================================
	const menuToggle = document.getElementById('menuToggle');
	const navMenu = document.getElementById('navMenu');

	if (menuToggle) {
		menuToggle.addEventListener('click', () => {
			navMenu.classList.toggle('active');
		});

		// Close menu when link is clicked
		navMenu.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', () => {
				navMenu.classList.remove('active');
			});
		});
	}

	// Set active nav link
	const currentPath = window.location.pathname;
	navMenu?.querySelectorAll('a').forEach(link => {
		link.classList.remove('active');
		if (link.getAttribute('href').includes(currentPath.split('/').pop() || 'index.html')) {
			link.classList.add('active');
		}
	});

	// ==========================================
	// SCROLL ANIMATION TRIGGER
	// ==========================================
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('in-view');
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	// Observe all scroll-fade elements
	document.querySelectorAll('.scroll-fade').forEach(element => {
		observer.observe(element);
	});

	// ==========================================
	// SMOOTH PAGE TRANSITIONS
	// ==========================================
	document.querySelectorAll('a:not([target="_blank"])').forEach(link => {
		link.addEventListener('click', (e) => {
			const href = link.getAttribute('href');
			// Only apply transition for internal links
			if (href && !href.startsWith('#') && !href.startsWith('http')) {
				e.preventDefault();
				document.body.style.opacity = '0.5';
				setTimeout(() => {
					window.location.href = href;
				}, 200);
			}
		});
	});

	// Fade in on page load
	window.addEventListener('load', () => {
		document.body.style.opacity = '1';
	});

	// ==========================================
	// PROFILE IMAGE MODAL
	// ==========================================
	const profileImage = document.getElementById('profileImage');
	const profileModal = document.getElementById('profileModal');
	const modalClose = document.querySelector('.modal-close');

	// Open modal when profile image is clicked
	if (profileImage) {
		profileImage.addEventListener('click', () => {
			profileModal.classList.add('show');
			document.body.style.overflow = 'hidden';
		});
	}

	// Close modal when close button is clicked
	if (modalClose) {
		modalClose.addEventListener('click', () => {
			profileModal.classList.remove('show');
			document.body.style.overflow = 'auto';
		});
	}

	// Close modal when clicking outside the image
	if (profileModal) {
		profileModal.addEventListener('click', (e) => {
			if (e.target === profileModal) {
				profileModal.classList.remove('show');
				document.body.style.overflow = 'auto';
			}
		});
	}

	// Close modal with Escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			profileModal.classList.remove('show');
			document.body.style.overflow = 'auto';
		}
	});

	// ==========================================
	// CHATBOT FUNCTIONALITY
	// ==========================================
	const chatbotToggle = document.getElementById('chatbotToggle');
	const chatbotClose = document.getElementById('chatbotClose');
	const chatbotWidget = document.querySelector('.chatbot-widget');
	const chatbotInput = document.getElementById('chatbotInput');
	const chatbotSend = document.getElementById('chatbotSend');
	const chatbotMessages = document.getElementById('chatbotMessages');

	// Chatbot knowledge base with responses
	const chatbotResponses = {
		greeting: [
			"Hi! 👋 I'm Kelvin's AI assistant. How can I help you today?",
			"Hey there! What can I assist you with?"
		],
		about: [
			"Kelvin is a full-stack developer with expertise in web development, cloud technologies, and backend systems. He's passionate about building scalable solutions!",
			"Kelvin specializes in JavaScript, Node.js, React, and cloud-native applications. He loves creating innovative digital solutions!"
		],
		projects: [
			"Kelvin has worked on several projects including a Responsive Portfolio, Interactive Web Apps, and E-Commerce Platforms. You can explore all projects in the Projects section!",
			"Check out the Projects page to see Kelvin's work! He's built everything from responsive websites to full-stack applications."
		],
		contact: [
			"You can reach Kelvin via email at kibuikevin@zetech.ac.ke or call +254 742 171 271. He's also on LinkedIn and GitHub!",
			"Feel free to send a message on the Contact page. Kelvin responds within 24 hours!"
		],
		skills: [
			"Kelvin's main skills include: JavaScript, Node.js, React, HTML5, CSS3, Python, MongoDB, PostgreSQL, AWS, Docker, and Git!",
			"He specializes in full-stack development with strong backend expertise and modern frontend technologies."
		],
		experience: [
			"Kelvin has experience in building production-grade applications, API development, database design, and cloud deployment.",
			"With a background in computer science, he's worked on projects ranging from startups to enterprise solutions."
		],
		navigate: [
			"You can navigate using the menu at the top! Visit Home, About, Projects, or Contact pages. I'm always here to help!",
			"Need to go somewhere? The navigation menu has links to all sections of the site."
		],
		help: [
			"I can help you with: Learning about Kelvin, navigating the site, project details, contact information, and skills. What interests you?",
			"Ask me about Kelvin's background, projects, how to contact him, or help navigating the website!"
		],
		default: [
			"That's an interesting question! Feel free to explore the site or ask me more about Kelvin's work, skills, or projects.",
			"I'm here to help! Ask me about Kelvin's projects, skills, contact info, or how to navigate the site."
		]
	};

	// Function to get chatbot response based on keywords
	function getChatbotResponse(userMessage) {
		const message = userMessage.toLowerCase().trim();

		// Check for keyword matches
		if (message.match(/hello|hi|hey|greet/)) return chatbotResponses.greeting[Math.floor(Math.random() * chatbotResponses.greeting.length)];
		if (message.match(/about|who|kelvin|biography|background/)) return chatbotResponses.about[Math.floor(Math.random() * chatbotResponses.about.length)];
		if (message.match(/project|work|portfolio|built|create/)) return chatbotResponses.projects[Math.floor(Math.random() * chatbotResponses.projects.length)];
		if (message.match(/contact|reach|email|phone|call|message/)) return chatbotResponses.contact[Math.floor(Math.random() * chatbotResponses.contact.length)];
		if (message.match(/skill|know|expertise|technology|tech|language/)) return chatbotResponses.skills[Math.floor(Math.random() * chatbotResponses.skills.length)];
		if (message.match(/experience|career|worked|job|role/)) return chatbotResponses.experience[Math.floor(Math.random() * chatbotResponses.experience.length)];
		if (message.match(/navigate|where|how|site|page|menu/)) return chatbotResponses.navigate[Math.floor(Math.random() * chatbotResponses.navigate.length)];
		if (message.match(/help|assist|support|question/)) return chatbotResponses.help[Math.floor(Math.random() * chatbotResponses.help.length)];

		return chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)];
	}

	// Toggle chatbot visibility
	if (chatbotToggle) {
		chatbotToggle.addEventListener('click', () => {
			chatbotWidget.classList.toggle('active');
			if (chatbotWidget.classList.contains('active')) {
				chatbotInput.focus();
			}
		});
	}

	// Close chatbot
	if (chatbotClose) {
		chatbotClose.addEventListener('click', () => {
			chatbotWidget.classList.remove('active');
		});
	}

	// Send message function
	function sendChatbotMessage() {
		const userMessage = chatbotInput.value.trim();

		if (userMessage === '') return;

		// Add user message
		const userMessageEl = document.createElement('div');
		userMessageEl.classList.add('message', 'user-message');
		userMessageEl.innerHTML = `<p>${escapeHtml(userMessage)}</p>`;
		chatbotMessages.appendChild(userMessageEl);

		// Clear input
		chatbotInput.value = '';

		// Scroll to bottom
		chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

		// Get and send bot response after a short delay
		setTimeout(() => {
			const botResponse = getChatbotResponse(userMessage);
			const botMessageEl = document.createElement('div');
			botMessageEl.classList.add('message', 'bot-message');
			botMessageEl.innerHTML = `<p>${escapeHtml(botResponse)}</p>`;
			chatbotMessages.appendChild(botMessageEl);

			// Scroll to bottom
			chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
		}, 300);
	}

	// Helper function to escape HTML
	function escapeHtml(text) {
		const div = document.createElement('div');
		div.textContent = text;
		return div.innerHTML;
	}

	// Send button click
	if (chatbotSend) {
		chatbotSend.addEventListener('click', sendChatbotMessage);
	}

	// Enter key in input
	if (chatbotInput) {
		chatbotInput.addEventListener('keypress', (e) => {
			if (e.key === 'Enter') {
				sendChatbotMessage();
			}
		});
	}
});

