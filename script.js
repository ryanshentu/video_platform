// 1. The Data (Your Video Database)
const videoData = [
  {
    thumbnail: "youtubeimages/thumbnail1.png",
    title: "Try Not To Laugh Challenge",
    channel: "Comedy Central",
    views: "2M Views • 1 day ago",
    category: "funny"
  },
  {
    thumbnail: "youtubeimages/thumbnail2.png",
    title: "Learn CSS Grid in 10 Min",
    channel: "Web Dev Simplified",
    views: "500k Views • 2 days ago",
    category: "educational"
  },
  {
    thumbnail: "youtubeimages/thumbnail3.png",
    title: "Lofi Beats to Study To",
    channel: "Lofi Girl",
    views: "15k Views • 3 hours ago",
    category: "relaxed"
  },
  {
    thumbnail: "youtubeimages/thumbnail4.png",
    title: "Insane Parkour Highlights",
    channel: "Red Bull",
    views: "8M Views • 1 week ago",
    category: "hype"
  },
  {
    thumbnail: "youtubeimages/thumbnail5.png",
    title: "Cats Being Weird",
    channel: "MeowTube",
    views: "10M Views • 5 days ago",
    category: "funny"
  },
  {
    thumbnail: "youtubeimages/thumbnail6.png",
    title: "History of the Universe",
    channel: "Kurzgesagt",
    views: "3M Views • 1 month ago",
    category: "educational"
  },
  {
    thumbnail: "youtubeimages/thumbnail7.png",
    title: "Rain Sounds 10 Hours",
    channel: "Nature Hub",
    views: "100k Views • 1 year ago",
    category: "relaxed"
  },
  {
    thumbnail: "youtubeimages/thumbnail0.png",
    title: "Best Gaming Moments 2024",
    channel: "Gaming Nexus",
    views: "4M Views • 2 days ago",
    category: "hype"
  }
];

// 2. Variables
var menuIcon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".sidebar");
var container = document.querySelector(".container");
var listContainer = document.querySelector(".list-container"); // NEW: Select the container
var searchInput = document.getElementById("search-input");

// 3. Render Function (The Magic Part)
// This function loops through the data and builds the HTML
function loadVideos() {
  listContainer.innerHTML = ""; // Clear existing content

  videoData.forEach(video => {
    // Create the HTML for one video
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
    // Add it to the container
    listContainer.innerHTML += videoHTML;
  });
}

// 4. Run the function immediately when the page loads
loadVideos();


// ---- EXISTING LOGIC (Menu, Search, Filters) ----

menuIcon.onclick = function(){
  if(sidebar){
    sidebar.classList.toggle("small-sidebar");
  }
  container.classList.toggle("large-container");
}

function filterVideos(category, btnElement) {
  var videos = document.querySelectorAll(".vid-list");
  
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
  
  var allButtons = document.querySelectorAll(".mood-btn");
  allButtons.forEach(function(btn){
    btn.classList.remove("active");
  });

  videos.forEach(function(video) {
    var title = video.querySelector(".vid-info a").innerText.toLowerCase();
    var channel = video.querySelector(".vid-info p").innerText.toLowerCase();

    if (title.includes(query) || channel.includes(query)) {
      video.style.display = "block";
    } else {
      video.style.display = "none";
    }
  });
}