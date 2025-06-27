document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        const isOpen = mobileMenu.classList.toggle('hidden');
        mobileMenuButton.innerHTML = isOpen 
            ? '<i class="fas fa-bars text-xl"></i>' 
            : '<i class="fas fa-times text-xl"></i>';
    });
// Mobile submenu toggle
const mobileDropdownBtn = document.getElementById('mobile-menu-dropdown');
const mobileDropdownContent = document.getElementById('mobile-dropdown-content');
mobileDropdownBtn.addEventListener('click', function () {
    mobileDropdownContent.classList.toggle('hidden');
});
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
        });
    }
  });
});

// === Auto-Play Hero Slider ===
let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slide");
const indicators = document.querySelectorAll(".carousel-indicator");
const slideInterval = 5000; // 5 seconds

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? "1" : "0";
    slide.dataset.active = i === index ? "true" : "false";
  });

  indicators.forEach((dot, i) => {
    dot.classList.toggle("bg-opacity-100", i === index);
    dot.classList.toggle("bg-opacity-50", i !== index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, slideInterval);

// === Repeating Typewriter Effect ===
const typewriterText = "Artisan Blend";
const typewriterElement = document.getElementById("typewriter-text");
let charIndex = 0;

function typeWriter() {
  if (charIndex < typewriterText.length) {
    typewriterElement.textContent += typewriterText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 150);
  } else {
    // Wait a bit, then clear and start over
    setTimeout(() => {
      typewriterElement.textContent = "";
      charIndex = 0;
      typeWriter();
    }, 2000); // Pause 2s after completing
  }
}

window.addEventListener("DOMContentLoaded", () => {
  typewriterElement.textContent = "";
  typeWriter();
});

// const chatArea = document.getElementById("chatArea");
// const userInput = document.getElementById("userInput");
// const sendBtn = document.getElementById("sendBtn");

// sendBtn.addEventListener("click", () => {
//   const message = userInput.value.trim();
//   if (message === "") return;

//   // Show user message bubble
//   const userBubble = document.createElement("div");
//   userBubble.className =
//     "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 p-3 rounded-lg w-max max-w-[80%] ml-auto";
//   userBubble.textContent = message;
//   chatArea.appendChild(userBubble);

//   userInput.value = "";
//   chatArea.scrollTop = chatArea.scrollHeight;
// });
// sendBtn.addEventListener("click", () => {
//   const message = userInput.value.trim();
//   if (message === "") return;

//   const userBubble = document.createElement("div");
//   userBubble.className =
//     "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 p-3 rounded-lg w-max max-w-[80%] ml-auto";
//   userBubble.textContent = message;
//   chatArea.appendChild(userBubble);

//   userInput.value = "";

//   // Bot is typing...
//   const botTyping = document.createElement("div");
//   botTyping.id = "botTyping";
//   botTyping.className =
//     "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 p-3 rounded-lg w-max max-w-[80%] mt-2 italic animate-pulse";
//   botTyping.textContent = "Bot is typing...";
//   chatArea.appendChild(botTyping);

//   chatArea.scrollTop = chatArea.scrollHeight;

//   setTimeout(() => {
//     botTyping.remove();

//     const botBubble = document.createElement("div");
//     botBubble.className =
//       "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 p-3 rounded-lg w-max max-w-[80%]";
//     botBubble.textContent =
//       "Thanks for your message! We'll get back to you shortly.";
//     chatArea.appendChild(botBubble);

//     chatArea.scrollTop = chatArea.scrollHeight;
//   }, 1000);
// });

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM fully loaded. Event listener attached.");

  const sendBtn = document.getElementById("sendBtn");
  const userInputField = document.getElementById("userInput");
  const chatArea = document.getElementById("chatArea");

  // More thorough null checking
  if (!sendBtn || !userInputField || !chatArea) {
    console.error("❌ Required elements missing. Check your HTML IDs:");
    console.log("- Send button exists:", !!sendBtn);
    console.log("- Input field exists:", !!userInputField);
    console.log("- Chat area exists:", !!chatArea);
    return;
  }

  function addMessage(content, type) {
    const bubble = document.createElement("div");
    let classes = "p-3 rounded-lg w-max max-w-[80%] mb-2";

    if (type === "user") {
      classes +=
        " bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 self-end";
    } else if (type === "bot") {
      classes += " bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white";
    } else {
      classes += " bg-red-100 text-red-800";
    }

    bubble.className = classes;
    bubble.textContent = content;
    bubble.style.marginLeft = type === "user" ? "auto" : "0";
    chatArea.appendChild(bubble);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  sendBtn.addEventListener("click", async () => {
    const userInput = userInputField.value.trim();
    if (userInput === "") return;

    addMessage(userInput, "user");
    userInputField.value = "";

    try {
      console.log("📤 Sending POST request...");
      const response = await fetch("https://artisan-blend.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userInput }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("📦 Received response:", data);

      if (!data.response) {
        throw new Error("No response in API result.");
      }

      addMessage(data.response, "bot");
    } catch (error) {
      console.error("🚨 Chatbot error:", error);
      addMessage("Oops! The chatbot is currently unavailable.", "error");
    }
  });

  userInputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendBtn.click();
    }
  });
    });
});

//view full menu
function toggleMenu() {
    const extraMenu = document.getElementById('extra-menu');
    const toggleBtn = document.getElementById('toggle-btn');

    extraMenu.classList.toggle('hidden');

    if (extraMenu.classList.contains('hidden')) {
      toggleBtn.textContent = 'View full menu';
      } else {
        toggleBtn.textContent = 'View less menu';
      }
  }