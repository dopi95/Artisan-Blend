
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

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM fully loaded. Event listener attached.");

  const sendBtn = document.getElementById("sendBtn");
  const userInputField = document.getElementById("userInput");
  const chatArea = document.getElementById("chatArea");

  if (!sendBtn || !userInputField || !chatArea) {
    console.error("❌ Required elements missing. Check your HTML IDs:");
    console.log("- Send button exists:", !!sendBtn);
    console.log("- Input field exists:", !!userInputField);
    console.log("- Chat area exists:", !!chatArea);
    return;
  }

  function addMessage(content, type) {
    const bubbleWrapper = document.createElement("div");
    bubbleWrapper.classList.add("flex", type === "user" ? "justify-end" : "justify-start");

    const bubble = document.createElement("div");
    bubble.className =
      "px-4 py-2 rounded-lg max-w-[75%] whitespace-pre-wrap";

    if (type === "user") {
      bubble.classList.add(
        "bg-blue-100",
        "text-blue-800",
        "dark:bg-blue-900",
        "dark:text-blue-100"
      );
    } else if (type === "bot") {
      bubble.classList.add(
        "bg-gray-200",
        "text-gray-800",
        "dark:bg-gray-700",
        "dark:text-white"
      );
    } else {
      bubble.classList.add("bg-red-100", "text-red-800", "italic");
    }

    bubble.textContent = content;
    bubbleWrapper.appendChild(bubble);
    chatArea.appendChild(bubbleWrapper);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  sendBtn.addEventListener("click", async () => {
    const userInput = userInputField.value.trim();

    if (!userInput) {
      userInputField.placeholder = "Please type a message...";
      userInputField.classList.add("border-red-500");
      setTimeout(() => {
        userInputField.classList.remove("border-red-500");
        userInputField.placeholder = "Type your message...";
      }, 2000);
      return;
    }

    addMessage(userInput, "user");
    userInputField.value = "";

    const typingWrapper = document.createElement("div");
    typingWrapper.className = "flex justify-start";
    const typingBubble = document.createElement("div");
    typingBubble.className =
      "px-4 py-2 rounded-lg max-w-[75%] italic text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300";
    typingBubble.textContent = "Bot is typing...";
    typingWrapper.appendChild(typingBubble);
    chatArea.appendChild(typingWrapper);
    chatArea.scrollTop = chatArea.scrollHeight;

    try {
      const response = await fetch("https://artisan-blend.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userInput }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Remove typing message
      chatArea.removeChild(typingWrapper);

      if (!data.response) {
        throw new Error("No response in API result.");
      }

      addMessage(data.response, "bot");
    } catch (error) {
      console.error("🚨 Chatbot error:", error);
      if (chatArea.contains(typingWrapper)) {
        chatArea.removeChild(typingWrapper);
      }
      addMessage("Oops! The chatbot is currently unavailable.", "error");
    }
  });

  userInputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendBtn.click();
    }
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

  // Toggle main mobile menu
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Toggle dropdown inside mobile menu
  const dropdownButton = document.getElementById('mobile-menu-dropdown');
  const dropdownContent = document.getElementById('mobile-dropdown-content');

  dropdownButton.addEventListener('click', () => {
    dropdownContent.classList.toggle('hidden');
  });

  // Close mobile menu when any main link is clicked
  const navLinks = mobileMenu.querySelectorAll('a');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      dropdownContent.classList.add('hidden'); // also hide dropdown
    });
  });

  // Also close when submenu links are clicked
  const dropdownLinks = dropdownContent.querySelectorAll('a');

  dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
      dropdownContent.classList.add('hidden');
      mobileMenu.classList.add('hidden');
    });
  });
