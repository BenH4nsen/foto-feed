// app.js

const photoFeed = document.getElementById("photo-feed");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const loginBtn = document.getElementById("login-btn");
const loginError = document.getElementById("login-error");

// Eine Liste von Fotos (Links zu Bildern)
const photos = [
  "file:///home/winetou/Bilder/Drohne/Ettelbr%C3%BCck/DJI_0003.JPG",
  "file:///home/winetou/Bilder/Drohne/Kirchberg/DJI_0053.JPG",
  "file:///home/winetou/Bilder/Drohne/Ettelbr%C3%BCck/DJI_0023.JPG",
  "file:///home/winetou/Bilder/Drohne/Ettelbr%C3%BCck/DJI_0007.JPG"
];

// Likes aus dem Local Storage laden oder leere Liste erstellen
let likes = JSON.parse(localStorage.getItem('likes')) || new Array(photos.length).fill(0);

let currentIndex = 0;
let currentUser = null; // Für Benutzer-Authentifizierung

// Funktion, um das aktuelle Foto zu laden
function loadPhoto(index) {
  const photoItem = document.createElement("div");
  photoItem.className = "photo-item";
  
  photoItem.innerHTML = `
    <img src="${photos[index]}" alt="Foto ${index + 1}" />
    <div class="like-section">
      <button id="like-btn-${index}" class="like-button ${likes[index] > 0 ? 'liked' : ''}">/home/winetou/Downloads/heart.png</button>
      <span id="like-count-${index}">${likes[index]} Likes</span>
    </div>
  `;

  photoFeed.innerHTML = ""; // Leeren vorherige Inhalte
  photoFeed.appendChild(photoItem);

  // Event Listener für den Like-Button
  document.getElementById(`like-btn-${index}`).addEventListener("click", () => {
    likes[index]++;
    localStorage.setItem('likes', JSON.stringify(likes)); // Likes speichern
    document.getElementById(`like-count-${index}`).textContent = `${likes[index]} Likes`;
    const likeButton = document.getElementById(`like-btn-${index}`);
    likeButton.classList.add('liked');
    
    // Animation zurücksetzen
    setTimeout(() => {
      likeButton.classList.remove('liked');
    }, 300);
  });
}

// Initiales Laden des ersten Fotos
loadPhoto(currentIndex);

// Funktionen für die Steuerung
nextBtn.addEventListener("click", () => {
  if (currentIndex < photos.length - 1) {
    currentIndex++;
    loadPhoto(currentIndex);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    loadPhoto(currentIndex);
  }
});

// Benutzer-Authentifizierung
loginBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "LenaBen1402") {
    currentUser = username;
    document.getElementById("login-section").style.display = "none";
    document.getElementById("app-section").style.display = "block";
  } else {
    loginError.textContent = "Falscher Benutzername oder Passwort.";
  }
});

// Swipe-Gesten implementieren
let startX;
let endX;

photoFeed.addEventListener('touchstart', (event) => {
  startX = event.touches[0].clientX; // Startposition speichern
});

photoFeed.addEventListener('touchend', (event) => {
  endX = event.changedTouches[0].clientX; // Endposition speichern
  handleSwipe();
});

function handleSwipe() {
  if (startX - endX > 50) {
    // Swipe nach links
    if (currentIndex < photos.length - 1) {
      currentIndex++;
      loadPhoto(currentIndex);
    }
  } else if (endX - startX > 50) {
    // Swipe nach rechts
    if (currentIndex > 0) {
      currentIndex--;
      loadPhoto(currentIndex);
    }
  }
}
