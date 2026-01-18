document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Navigation Bar
    const navContainer = document.createElement('header');
    navContainer.innerHTML = `
        <nav class="navbar">
            <a href="index.html" class="logo">Portfolio.</a>
            <div class="menu-toggle" id="mobile-menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
            <ul class="nav-links">
                <li><a href="index.html" class="nav-link">Home</a></li>
                <li><a href="about.html" class="nav-link">About</a></li>
                <li><a href="skills.html" class="nav-link">Skills</a></li>
                <li><a href="experience.html" class="nav-link">Experience</a></li>
                <li><a href="projects.html" class="nav-link">Projects</a></li>
                <li><a href="contact.html" class="contact-btn">Contact Me</a></li>
            </ul>
        </nav>
    `;

    // Insert nav at the beginning of the body
    document.body.prepend(navContainer);

    // 2. Highlight Active Page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // 3. Simple Form Handling (if present)
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thanks for your message! This is a demo form.');
            contactForm.reset();
        });
    }

    // 4. Project Modal Logic
    const modal = document.getElementById('project-modal');
    // Only run if modal exists (i.e. on projects page or index page with modal)
    if (modal) {
        const modalImg = modal.querySelector('.modal-image');
        const modalTitle = modal.querySelector('.modal-title');
        const modalDesc = modal.querySelector('.modal-description');
        const modalDetails = modal.querySelector('.modal-details');
        const closeModal = modal.querySelector('.close-modal');

        // Project Data (could be moved to a separate JSON/Obj)
        const projectData = {
            'ai-summarizer': {
                title: 'AI Summarizer',
                description: 'Designing and implementing an AI-driven system for intelligent document analysis and information retrieval. This system utilizes advanced NLP techniques to summarize long-form text into concise, actionable insights.',
                image: 'images/ai_summarizer.png',
                details: '<p><strong>Tech Stack:</strong> Python, OpenAI API, React, Node.js</p><p><strong>Key Features:</strong> Automatic summarization, keyword extraction, sentiment analysis.</p>'
            },
            'youtube-classification': {
                title: 'YouTube Comment Classification',
                description: 'Developed a comprehensive model to classify YouTube comments into various labels such as Spam, Appreciation, Question, and Hate Speech. This helps creators manage their community more effectively.',
                image: 'images/youtube_classification.png',
                details: '<p><strong>Tech Stack:</strong> Python, TensorFlow, Scikit-learn, YouTube Data API</p><p><strong>Accuracy:</strong> 92% on test dataset.</p>'
            },
            'soulace': {
                title: 'Soulace',
                description: 'Co-developed Soulace, a full-stack wellness website focused on improving mental well-being through guided meditation, mood tracking, and community support.',
                image: 'images/soulace_wellness.png',
                details: '<p><strong>Tech Stack:</strong> MERN Stack (MongoDB, Express, React, Node.js)</p><p><strong>Impact:</strong> Helped over 500 users track their daily mood trends.</p>'
            }
        };



        // Open Modal
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                // e.stopPropagation(); // Optional: might not be needed if we don't have other click listeners

                const projectId = card.dataset.project;
                const data = projectData[projectId];

                if (data) {
                    modalImg.src = data.image;
                    modalTitle.textContent = data.title;
                    modalDesc.textContent = data.description;
                    modalDetails.innerHTML = data.details;

                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }
            });
        });

        // Close Modal
        const closeProjectModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeModal.addEventListener('click', closeProjectModal);

        // Close on click outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeProjectModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeProjectModal();
            }
        });
    }
});
