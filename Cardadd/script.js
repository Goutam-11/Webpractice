document.getElementById("addCard").addEventListener("click", function () {
  const imageUrl = document.getElementById("imageUrl").value;
  const title = document.getElementById("title").value;
  const name = document.getElementById("name").value;
  const views = document.getElementById("views").value;
  const duration = document.getElementById("duration").value;

  const cardData = {
    id: Date.now(), // Unique ID for the card
    imageUrl: imageUrl || "img/hqdefault.avif",
    title: title || "Default Title",
    name: name || "Default Name",
    views: views || "0",
    duration: duration || "00:00",
    creationTime: new Date().toISOString(),
  };

  // Save card to localStorage
  saveCardToLocalStorage(cardData);

  // Add card to DOM
  addCardToDOM(cardData);
});

// Load cards from localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
  const cards = getCardsFromLocalStorage();
  cards.forEach(addCardToDOM);
});

// Helper function to add a card to the DOM
function addCardToDOM(cardData) {
  const cardContainer = document.querySelector(".cardContainer");

  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", cardData.id);

  card.innerHTML = `
    <div class="image">
      <img src="${cardData.imageUrl}" alt="" class="img" />
      <span class="duration">${cardData.duration}</span>
    </div>
    <div class="text">
      <h1 class="title">${cardData.title}</h1>
      <p class="name">
        ${cardData.name}
        <span class="material-symbols-outlined"> check_circle </span>
      </p>
      <span class="views">${formatViews(cardData.views)}</span>
      <span class="time">. Just now</span>
    </div>
    <button class="delete-btn">Delete</button>
  `;

  // Add delete functionality
  card.querySelector(".delete-btn").addEventListener("click", function () {
    deleteCard(cardData.id);
  });

  // Append card to container
  cardContainer.appendChild(card);

  // Update time periodically
  updateTime(card.querySelector(".time"), new Date(cardData.creationTime));
}

// Save card to localStorage
function saveCardToLocalStorage(cardData) {
  const cards = getCardsFromLocalStorage();
  cards.push(cardData);
  localStorage.setItem("cards", JSON.stringify(cards));
}

// Get cards from localStorage
function getCardsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("cards")) || [];
}

// Delete card from DOM and localStorage
function deleteCard(cardId) {
  // Remove from DOM
  const card = document.querySelector(`.card[data-id='${cardId}']`);
  if (card) card.remove();

  // Remove from localStorage
  let cards = getCardsFromLocalStorage();
  cards = cards.filter((card) => card.id !== cardId);
  localStorage.setItem("cards", JSON.stringify(cards));
}

// Helper function to format views
function formatViews(views) {
  const num = parseInt(views, 10);
  if (isNaN(num)) return "0 Views";

  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num + " Views";
}

// Function to update elapsed time
function updateTime(timeElement, creationTime) {
  const updateInterval = 1000; // Update every second
  setInterval(() => {
    const now = new Date();
    const elapsedSeconds = Math.floor((now - creationTime) / 1000);

    let timeText;
    if (elapsedSeconds < 60) {
      timeText = "Just now";
    } else if (elapsedSeconds < 3600) {
      const minutes = Math.floor(elapsedSeconds / 60);
      timeText = `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    } else if (elapsedSeconds < 86400) {
      const hours = Math.floor(elapsedSeconds / 3600);
      timeText = `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(elapsedSeconds / 86400);
      timeText = `${days} day${days > 1 ? "s" : ""} ago`;
    }

    timeElement.textContent = `. ${timeText}`;
  }, updateInterval);
}
