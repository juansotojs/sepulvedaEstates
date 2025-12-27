// Smooth scroll implementation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission behavior
  
      const formData = new FormData(form);
  
      // Submit the form data using Fetch
      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Optionally, clear the form fields
          form.reset();
  
          // Display your custom success message
          // You can replace the alert() with any custom modal or inline message.
          alert("Thank you for your inquiry. We will be in touch soon.");
        } else {
          response.json().then(data => {
            if (data.hasOwnProperty("errors")) {
              alert(data["errors"].map(error => error["message"]).join(", "));
            } else {
              alert("Oops! There was a problem submitting your form.");
            }
          });
        }
      })
      .catch(error => {
        console.error("Error submitting the form:", error);
        alert("Oops! There was a problem submitting your form.");
      });
    });
  });

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

document.querySelector('.contact-button').addEventListener('click', function(e) {
    e.preventDefault();
    const formSection = document.querySelector('#contact');
    
    if(formSection) {
        formSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// Close menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if(targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetSection = document.querySelector(targetId);
                if(targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

const reelCards = document.querySelectorAll('.reel-card');

reelCards.forEach(card => {
    const reelUrl = card.getAttribute('data-reel');
    const videoId = reelUrl.split('/reel/')[1].replace('/', '');
    
    fetch(`https://www.instagram.com/p/${videoId}/?__a=1&__d=dis`)
        .then(response => response.json())
        .then(data => {
            const videoUrl = data.graphql.shortcode_media.video_url;
            card.innerHTML = `
                <video controls playsinline>
                    <source src="${videoUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        })
        .catch(error => {
            console.error('Error loading Instagram reel:', error);
            card.innerHTML = '<p>Unable to load reel</p>';
        });
});

// Force metadata loading for testimonial videos on mobile
document.addEventListener('DOMContentLoaded', () => {
    const testimonialVideos = document.querySelectorAll('.testimonial-video-card video');
    
    testimonialVideos.forEach(video => {
        // Force load metadata to show thumbnail
        video.load();
        
        // On mobile, ensure metadata loads by setting currentTime to 0
        if (window.innerWidth <= 768) {
            video.addEventListener('loadedmetadata', () => {
                video.currentTime = 0.1;
            });
        }
    });
});