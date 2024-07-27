
const contentForm = document.getElementById('contentForm');
const titleInput = document.getElementById('titleInput');
const contentInput = document.getElementById('contentInput');
const imageURLInput = document.getElementById('imageURLInput');
const videoURLInput = document.getElementById('videoURLInput');
const contentContainer = document.getElementById('contentContainer');


let contentArray = [];

function displayContent() {
  contentContainer.innerHTML = '';
  contentArray.forEach((content) => {
    const blogElement = document.createElement('div');
    blogElement.classList.add('blog');
    const titleElement = document.createElement('h3');
    titleElement.textContent = content.title;
    blogElement.appendChild(titleElement);

    if (content.imageURL !== '') {
      const imageElement = document.createElement('img');
      imageElement.src = content.imageURL;
      imageElement.alt = 'Blog Image';
      blogElement.appendChild(imageElement);
    }

    if (content.videoURL !== '') {

      let videoIframe = document.createElement('iframe');
      if (content.videoURL.includes('youtube.com')) {
        const videoId = extractYouTubeVideoId(content.videoURL);
        videoIframe.src = `https://www.youtube.com/embed/${videoId}`;
      }
      videoIframe.frameBorder = '0';
      videoIframe.allowFullscreen = true;
      blogElement.appendChild(videoIframe);
    }

    const contentParagraph = document.createElement('p');
    
    contentParagraph.textContent = content.content;
    blogElement.appendChild(contentParagraph);

    contentContainer.appendChild(blogElement);
  });
}


function addContent(title, content, imageURL, videoURL) {
  const newContent = { title, content, imageURL, videoURL };
  contentArray.push(newContent);
  displayContent();
  clearForm();
  saveDataToLocalStorage();
}


function clearForm() {
  titleInput.value = '';
  contentInput.value = '';
  imageURLInput.value = '';
  videoURLInput.value = '';
}


contentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const imageURL = imageURLInput.value.trim();
  const videoURL = videoURLInput.value.trim();

  if (title !== '' && content !== '') {
    
    if (videoURL === '' || isValidVideoURL(videoURL)) {
      addContent(title, content, imageURL, videoURL);
    } else {
      alert('Invalid video URL. Please provide a valid YouTube or Vimeo URL.');
    }
  } else {
    alert('Title and content are required.');
  }
});
function isValidVideoURL(url) {
  return url.includes('youtube.com') || url.includes('vimeo.com');
}

function extractYouTubeVideoId(url) {
  const match = url.match(/[?&]v=([^&]+)/);
  return match && match[1] ? match[1] : '';
}
function extractVimeoVideoId(url) {
  const match = url.match(/\/(\d+)/);
  return match && match[1] ? match[1] : '';
}

function saveDataToLocalStorage() {
  localStorage.setItem('contentArray', JSON.stringify(contentArray));
}

function loadDataFromLocalStorage() {
  const storedData = localStorage.getItem('contentArray');
  if (storedData) {
    contentArray = JSON.parse(storedData);
    displayContent();
  }
}


window.addEventListener('load', loadDataFromLocalStorage);
