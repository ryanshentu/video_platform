var menuIcon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".sidebar");
var container = document.querySelector(".container");
var searchInput = document.getElementById("search-input"); // New: Get the search box

// Menu Toggle Logic
menuIcon.onclick = function(){
  if(sidebar){
    sidebar.classList.toggle("small-sidebar");
  }
  container.classList.toggle("large-container");
}

// ---- Mood Filter Logic ----

function filterVideos(category, btnElement) {
  // 1. Get all the videos
  var videos = document.querySelectorAll(".vid-list");
  
  // 2. Loop through every video to show/hide based on category
  videos.forEach(function(video) {
    var videoCategory = video.getAttribute("data-category");

    if (category === "all" || category === videoCategory) {
      video.style.display = "block"; // Show
    } else {
      video.style.display = "none";  // Hide
    }
  });

  // 3. Remove 'active' class from ALL buttons
  var allButtons = document.querySelectorAll(".mood-btn");
  allButtons.forEach(function(btn){
    btn.classList.remove("active");
  });

  // 4. Add 'active' class to the button we just clicked
  if(btnElement) {
    btnElement.classList.add("active");
  }
}

// ---- NEW: Search Functionality ----

// 1. Listen for the "Enter" key in the search box
if(searchInput) {
  searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      searchVideos();
    }
  });
}

// 2. The Search Logic
function searchVideos() {
  var query = searchInput.value.toLowerCase(); // Convert typed text to lowercase
  var videos = document.querySelectorAll(".vid-list");
  
  // Reset mood buttons visually (since search overrides categories)
  var allButtons = document.querySelectorAll(".mood-btn");
  allButtons.forEach(function(btn){
    btn.classList.remove("active");
  });

  videos.forEach(function(video) {
    // Get the title and channel name from the video card
    var title = video.querySelector(".vid-info a").innerText.toLowerCase();
    var channel = video.querySelector(".vid-info p").innerText.toLowerCase();

    // Check if the title OR channel contains the search text
    if (title.includes(query) || channel.includes(query)) {
      video.style.display = "block"; // Show
    } else {
      video.style.display = "none";  // Hide
    }
  });
}