var menuIcon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".sidebar");
var container = document.querySelector(".container");

// Menu Toggle Logic
menuIcon.onclick = function(){
  if(sidebar){
    sidebar.classList.toggle("small-sidebar");
  }
  container.classList.toggle("large-container");
}

// ---- NEW: Mood Filter Logic ----

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
  btnElement.classList.add("active");
}