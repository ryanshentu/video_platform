// 1. Get the ID from the URL
const params = new URLSearchParams(window.location.search);
// Default to 0 if no ID is found so the page doesn't crash
const videoId = params.get('id') || 0; 

// 2. Select HTML Elements
const videoFrame = document.getElementById("video-frame");
const videoTitle = document.getElementById("video-title");
const channelName = document.getElementById("channel-name");
const videoViews = document.getElementById("video-views");
const rightSidebar = document.querySelector(".right-sidebar");

async function loadPage() {
  try {
    // 3. Fetch Data Once
    const response = await fetch('data.json');
    const videoData = await response.json();

    // --- PART A: Load the Main Video ---
    const currentVideo = videoData.find(v => v.id == videoId);

    if (currentVideo) {
      videoTitle.innerText = currentVideo.title;
      channelName.innerText = currentVideo.channel;
      videoViews.innerText = currentVideo.views;
      videoFrame.src = `https://www.youtube.com/embed/${currentVideo.video_id}?autoplay=1`;
    } else {
      videoTitle.innerText = "Video not found";
    }

    // --- PART B: Load the 'Up Next' Sidebar ---
    // Clear the hardcoded HTML first
    rightSidebar.innerHTML = "";

    videoData.forEach(video => {
      // Logic: If this is the video currently playing, SKIP it.
      if (video.id == videoId) return;

      let sideVideoHTML = `
        <div class="side-videolist">
            <a href="video.html?id=${video.id}" class="small-thumbnail">
                <img src="${video.thumbnail}">
            </a>
            <div class="vid-info">
                <a href="video.html?id=${video.id}">${video.title}</a>
                <p>${video.channel}</p>
                <p>${video.views}</p>
            </div>
        </div>
      `;
      
      // Add the new HTML to the sidebar
      rightSidebar.innerHTML += sideVideoHTML;
    });

  } catch (error) {
    console.error("Error loading data:", error);
  }
}

// Run the function
loadPage();