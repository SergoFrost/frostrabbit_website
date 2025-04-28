// App details data
const appData = {
    expense_tracker: {
        name: "Money Manager: Expense Tracker",
        description: "Control your finances hassle-free with our intuitive expense tracking app. Track your spending, create budgets, visualize your financial data, and gain insights into your spending habits. Whether you're saving for a big purchase or just trying to spend more mindfully, our Finance Tracker makes managing your money simple and stress-free.",
        playStore: "https://play.google.com/store/apps/details?id=com.frostrabbitcompany.expense_tracker",
        iosStore: "", // Removed iOS store link
        screenshotCount: 8, // Number of screenshots in the assets folder
        logo: "assets/apps_logo/expense_tracker.png" // App logo path
    },
    smart_habits: {
        name: "Small Habits - Goal Tracker",
        description: "Control your bad habits and overcome addictions with our powerful habit tracking tool. Track your progress, understand your triggers, and build motivation as you break negative patterns. Our smart notification system keeps you accountable and provides encouragement when you need it most. Take control of your life by breaking free from bad habits and addictions.",
        playStore: "https://play.google.com/store/apps/details?id=com.frostrabbitcompany.bad_habit_buster",
        iosStore: "", // Removed iOS store link
        screenshotCount: 8, // Number of screenshots in the assets folder
        logo: "assets/apps_logo/bad_habit.png" // App logo path
    },
    money_box: {
        name: "Moneybox: Savings Goal Tracker",
        description: "Collect for your purpose easily and without routine! A simple yet powerful savings tracker to help you reach your financial goals. Create multiple savings goals, track your progress with beautiful visuals, and celebrate your achievements along the way. Whether you're saving for a vacation, a new gadget, or your dream home, Moneybox Pro makes saving fun and motivating.",
        playStore: "https://play.google.com/store/apps/details?id=com.frostrabbitcompany.money_box.money_box",
        iosStore: "", // Removed iOS store link
        screenshotCount: 8, // Number of screenshots in the assets folder
        logo: "assets/apps_logo/money_box.png" // App logo path
    }
};

// Initialize app detail page
document.addEventListener('DOMContentLoaded', function() {
    // Get app ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const appId = urlParams.get('app');
    
    if (appId && appData[appId]) {
        // Set page title and meta description for SEO
        document.title = appData[appId].name + " - Frostrabbit Company";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', appData[appId].description.substring(0, 155) + '...');
        }
        
        // Fill app information
        const appTitle = document.getElementById('app-title');
        const appDescription = document.getElementById('app-description');
        const appLinks = document.getElementById('app-links');
        
        appTitle.textContent = appData[appId].name;
        appDescription.textContent = appData[appId].description;

        // Add app logo if it exists and there's a container for it
        const appLogoContainer = document.getElementById('app-logo');
        if (appLogoContainer && appData[appId].logo) {
            const logoImg = document.createElement('img');
            logoImg.src = appData[appId].logo;
            logoImg.alt = appData[appId].name + " Logo";
            logoImg.className = 'app-logo-img';
            appLogoContainer.appendChild(logoImg);
        }
        
        // Create app links
        let linksHTML = '';
        
        if (appData[appId].playStore) {
            linksHTML += `
                <a href="${appData[appId].playStore}" class="btn btn-primary" target="_blank">
                    <i class="fab fa-google-play"></i> Google Play
                </a>
            `;
        } else {
            linksHTML += `
                <a href="#" class="btn btn-primary store-coming-soon" data-store="google">
                    <i class="fab fa-google-play"></i> Google Play
                </a>
            `;
        }
        
        // Add iOS button that shows the modal when clicked since no apps are available
        linksHTML += `
            <a href="#" class="btn btn-primary store-coming-soon" data-store="ios">
                <i class="fab fa-apple"></i> App Store
            </a>
        `;
        
        appLinks.innerHTML = linksHTML;
        
        // Add event listeners for store buttons that don't have links
        document.querySelectorAll('.store-coming-soon').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the store name
                const store = this.getAttribute('data-store');
                let storeName = store === 'ios' ? 'App Store' : 'Google Play';
                
                // Show the coming soon modal
                showComingSoonModal(storeName);
            });
        });
        
        // Load app screenshots into carousel
        const appScreenshots = document.getElementById('app-screenshots');
        let screenshotsHTML = '';
        
        for (let i = 1; i <= appData[appId].screenshotCount; i++) {
            screenshotsHTML += `
                <div class="swiper-slide">
                    <img src="assets/${appId}/image${i}.png" alt="${appData[appId].name} Screenshot ${i}">
                </div>
            `;
        }
        
        appScreenshots.innerHTML = screenshotsHTML;
        
        // Function to check screen size and adjust swiper settings
        let swiper;
        
        function checkScreenSize() {
            if (window.innerWidth < 576) {
                // On small screens, reduce autoplay speed and disable effects
                if (swiper) {
                    swiper.params.autoplay.delay = 3000;
                    swiper.params.effect = 'fade';
                    swiper.update();
                }
            } else {
                if (swiper) {
                    swiper.params.autoplay.delay = 5000;
                    swiper.update();
                }
            }
        }
        
        // Initialize Swiper
        swiper = new Swiper('.mySwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: true,
            grabCursor: true,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            keyboard: {
                enabled: true,
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            breakpoints: {
                // when window width is >= 768px
                768: {
                    slidesPerView: 1.5,
                    spaceBetween: 20
                },
                // when window width is >= 992px
                992: {
                    slidesPerView: 2,
                    spaceBetween: 30
                }
            },
            on: {
                init: function() {
                    checkScreenSize();
                },
                resize: function() {
                    checkScreenSize();
                }
            }
        });
        
        // Update modal image functionality for swiper slides
        const swiperSlideImages = document.querySelectorAll('.swiper-slide img');
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        
        swiperSlideImages.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = this.src;
            });
        });
    } else {
        // Handle invalid app ID
        window.location.href = 'index.html';
    }
});

// Function to show the coming soon modal
function showComingSoonModal(storeName) {
    // Check if the coming soon modal already exists
    let comingSoonModal = document.getElementById('comingSoonModal');
    
    // If it doesn't exist, create it
    if (!comingSoonModal) {
        comingSoonModal = document.createElement('div');
        comingSoonModal.id = 'comingSoonModal';
        comingSoonModal.className = 'modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content coming-soon-content';
        
        const closeSpan = document.createElement('span');
        closeSpan.className = 'modal-close';
        closeSpan.innerHTML = '&times;';
        closeSpan.onclick = function() {
            comingSoonModal.style.display = 'none';
        };
        
        const messageContainer = document.createElement('div');
        messageContainer.className = 'coming-soon-message';
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-clock';
        
        const message = document.createElement('h3');
        message.id = 'comingSoonMessage';
        
        messageContainer.appendChild(icon);
        messageContainer.appendChild(message);
        
        modalContent.appendChild(closeSpan);
        modalContent.appendChild(messageContainer);
        
        comingSoonModal.appendChild(modalContent);
        document.body.appendChild(comingSoonModal);
        
        // Close when clicking outside the content
        comingSoonModal.onclick = function(event) {
            if (event.target === comingSoonModal) {
                comingSoonModal.style.display = 'none';
            }
        };
        
        // Close with escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && comingSoonModal.style.display === 'block') {
                comingSoonModal.style.display = 'none';
            }
        });
    }
    
    // Update the message
    document.getElementById('comingSoonMessage').textContent = `Coming soon to ${storeName}! Our app is currently under development and will be available shortly. Stay tuned!`;
    
    // Show the modal
    comingSoonModal.style.display = 'block';
} 