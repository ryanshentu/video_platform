const params = new URLSearchParams(window.location.search);
const videoId = params.get('id') || 0; 

const videoFrame = document.getElementById("video-frame");
const videoTitle = document.getElementById("video-title");
const channelName = document.getElementById("channel-name");
const videoViews = document.getElementById("video-views");
const rightSidebar = document.querySelector(".right-sidebar");

async function loadPage() {
  try {
    const response = await fetch('data.json');
    const videoData = await response.json();

    const currentVideo = videoData.find(v => v.id == videoId);

    if (currentVideo) {
      videoTitle.innerText = currentVideo.title;
      channelName.innerText = currentVideo.channel;
      videoViews.innerText = currentVideo.views;
      videoFrame.src = `https://www.youtube.com/embed/${currentVideo.video_id}?autoplay=1`;
    } else {
      videoTitle.innerText = "Video not found";
    }

    rightSidebar.innerHTML = "";

    videoData.forEach(video => {
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
      
      rightSidebar.innerHTML += sideVideoHTML;
    });

  } catch (error) {
    console.error("Error loading data:", error);
  }
}

loadPage();