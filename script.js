// 1. Variables
var menuIcon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".sidebar");
var container = document.querySelector(".container");
var listContainer = document.getElementById("video-grid");
var searchInput = document.getElementById("search-input");
var noResultsMsg = document.getElementById("no-results");

// 2. Fetch Data using API (Simulated)
async function loadVideos() {
  try {
    // This fetches the file 'data.json' just like a real API call
    const response = await fetch('data.json'); 
    const videoData = await response.json();

    // Clear existing content
    listContainer.innerHTML = ""; 

    videoData.forEach(video => {
      let videoHTML = `
        <div class="vid-list" data-category="${video.category}">
          <a href="video.html"> 
            <img src="${video.thumbnail}" class="thumbnail">
          </a>
          <div class="flex-div">
            <img src="youtubeimages/Jack.png" class="profile-pic">
            <div class="vid-info">
              <a href="">${video.title}</a>
              <p>${video.channel}</p>
              <p>${video.views}</p>
            </div>
          </div>
        </div>
      `;
      listContainer.innerHTML += videoHTML;
    });

  } catch (error) {
    console.error("Error loading videos:", error);
    listContainer.innerHTML = "<p>Error loading videos. Make sure you are using Live Server!</p>";
  }
}

// Run the function
loadVideos();

// ---- Menu Toggle ----
menuIcon.onclick = function(){
  if(sidebar){
    sidebar.classList.toggle("small-sidebar");
  }
  container.classList.toggle("large-container");
}

// ---- Mood Filter Logic ----
function filterVideos(category, btnElement) {
  var videos = document.querySelectorAll(".vid-list");
  
  noResultsMsg.style.display = "none";

  videos.forEach(function(video) {
    var videoCategory = video.getAttribute("data-category");
    if (category === "all" || category === videoCategory) {
      video.style.display = "block"; 
    } else {
      video.style.display = "none"; 
    }
  });

  var allButtons = document.querySelectorAll(".mood-btn");
  allButtons.forEach(function(btn){
    btn.classList.remove("active");
  });
  if(btnElement) {
    btnElement.classList.add("active");
  }
}

// ---- Search Logic ----
if(searchInput) {
  searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      searchVideos();
    }
  });
}

function searchVideos() {
  var query = searchInput.value.toLowerCase(); 
  var videos = document.querySelectorAll(".vid-list");
  var matchCount = 0; 

  var allButtons = document.querySelectorAll(".mood-btn");
  allButtons.forEach(function(btn){
    btn.classList.remove("active");
  });

  videos.forEach(function(video) {
    var title = video.querySelector(".vid-info a").innerText.toLowerCase();
    var channel = video.querySelector(".vid-info p").innerText.toLowerCase();

    if (title.includes(query) || channel.includes(query)) {
      video.style.display = "block";
      matchCount++; 
    } else {
      video.style.display = "none";
    }
  });

  if (matchCount === 0) {
    noResultsMsg.style.display = "block";
  } else {
    noResultsMsg.style.display = "none";
  }
}