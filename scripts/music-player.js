document.querySelectorAll(".about-link").forEach(function(link) {
  link.classList.add("about-link-market");
});

// variables
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");

const songSlider = document.getElementById("slider-song");

const shuffleButton = document.getElementById("shuffle-song");
const prevButton = document.getElementById("prev-song");
const playpauseButton = document.getElementById("playpause-song");
const nextButton = document.getElementById("next-song");
const repeatButton = document.getElementById("repeat-song");

const playedSong = document.querySelectorAll(".click-song");

// song repertory
const songs = [
  {
    image: "../assets/images/cover_album.png",
    name: "Intro (I. I'm afraid)",
    artist: "Bed Market",
    audio: "../assets/audio/intro.wav",
  },
  {
    image: "../assets/images/cover_album.png",
    name: "Change",
    artist: "Bed Market",
    audio: "../assets/audio/change.wav",
  },
  {
    image: "../assets/images/cover_album.png",
    name: "Isolation Cake",
    artist: "Bed Market",
    audio: "../assets/audio/isolationcake.wav",
  },
  {
    image: "../assets/images/cover_album.png",
    name: "Keep Falling",
    artist: "Bed Market",
    audio: "../assets/audio/keepfalling.wav",
  },
  {
    image: "../assets/images/cover_album.png",
    name: "Interlude (II. Farewell)",
    artist: "Bed Market",
    audio: "../assets/audio/interlude.wav",
  },
  {
    image: "../assets/images/cover_album.png",
    name: "Velvet Sky",
    artist: "Bed Market",
    audio: "../assets/audio/velvetsky.wav",
  },
  {
    image: "../assets/images/cover_album.png",
    name: "Sweet Memories",
    artist: "Bed Market",
    audio: "../assets/audio/sweetmemories.wav",
  },
  {
    image: "../assets/images/cover_album.png",
    name: "Shortcut",
    artist: "Bed Market",
    audio: "../assets/audio/shortcut.wav",
  },
  {
    image: "../assets/images/cover_album.png",
    name: "Blown Away",
    artist: "Bed Market",
    audio: "../assets/audio/blownaway.mp3",
  },
];

// audio variable
const audio = document.createElement("audio");
let currentSongIndex = 0; // 0 is the first element of a list, this corresponds to the song Intro */
updateSong(); // so that the page is initially loaded with the first song */

// play button
playpauseButton.addEventListener("click", function() {
  if (!audio.paused) {
      audio.pause();
  } 
  else {
      audio.play();
  }
});

audio.addEventListener("play", function() {
  playpauseButton.classList.remove("fa-circle-play");
  playpauseButton.classList.add("fa-circle-pause");
});

audio.addEventListener("pause", function() {
  playpauseButton.classList.remove("fa-circle-pause");
  playpauseButton.classList.add("fa-circle-play");
})

// repeat button
let isRepeat = false

repeatButton.addEventListener("click", function() {
  isRepeat = !isRepeat;
  repeatButton.classList.toggle("repeat-active", isRepeat);
});

// shuffle button
let isShuffle = false
const shuffledSongs = []
let shuffleHistoryPosition = 0

shuffleButton.addEventListener("click", function() {
  isShuffle = !isShuffle;
  
  shuffleButton.classList.toggle("shuffle-active", isShuffle);
      
  if (isShuffle) {
    shuffledSongs.push(currentSongIndex);
  }
  else {
    shuffledSongs.length = 0;
    shuffleHistoryPosition = 0;
  }
});

// previous song button
prevButton.addEventListener("click", function() { // the button prev has been added an event of type listener. The listener event is a click on the button */
  if (isShuffle) {
    
    if (shuffleHistoryPosition == 0 || audio.currentTime >= 3) {
      currentSongIndex = shuffledSongs[shuffleHistoryPosition];
    }
    else {
      shuffleHistoryPosition--;
      currentSongIndex = shuffledSongs[shuffleHistoryPosition];
    }
    
    updateSong();
    audio.play();
  }
  
  else if (currentSongIndex == 0 || audio.currentTime >= 3) {
    audio.currentTime = 0;
  }
  else {
      currentSongIndex--; /* that means that the song index is decreased by 1 (-1) */
      updateSong();
      audio.play();
  }
});

// next song button
nextButton.addEventListener("click", function() {
  if (isShuffle) {
    
    if (shuffledSongs.length == shuffleHistoryPosition + 1) {
      currentSongIndex = getRandomInt(0,8);
      shuffledSongs.push(currentSongIndex);
      shuffleHistoryPosition++;
    } 
    else {
      shuffleHistoryPosition++;
      currentSongIndex = shuffledSongs[shuffleHistoryPosition];
    }
    
    updateSong();
    audio.play();
  }
  
  else if (currentSongIndex == songs.length - 1) {
    currentSongIndex = 0;
    updateSong();
    audio.play();
  }
  else {
    currentSongIndex++;
    updateSong();
    audio.play();    
  }
});

// what happens at the end of a song
audio.addEventListener("ended", function() {
  
  if (isRepeat) {
    audio.currentTime = 0;
    updateSong();
    audio.play();
  }
  
  else if (isShuffle) {
    
    if (shuffledSongs.length == shuffleHistoryPosition + 1) {
      currentSongIndex = getRandomInt(0,8);
      shuffledSongs.push(currentSongIndex);
      shuffleHistoryPosition++;
    } 
    else {
      shuffleHistoryPosition++;
      currentSongIndex = shuffledSongs[shuffleHistoryPosition];
    }
    
    updateSong();
    audio.play();
  }
  
  else if (currentSongIndex == songs.length - 1) {
    currentSongIndex = 0;
    updateSong();
    audio.pause();
  }
  
  else {
    currentSongIndex++;
    updateSong();
    audio.play();    
  }
});

// song slider
songSlider.addEventListener("change", function() {
  audio.currentTime = songSlider.value;
});

setInterval(moveSlider, 1000);

// functions
// update song informations
function updateSong() {
  const song = songs[currentSongIndex];
  songImage.src = song.image;
  songName.innerText = song.name;
  songArtist.innerText = song.artist;
  
  highlightSong();
  
  audio.src = song.audio;
  audio.onloadedmetadata = function () {
      songSlider.value = 0;
      songSlider.max = audio.duration; 
  }
};

// song slider
function moveSlider() {
  songSlider.value = audio.currentTime;
};

// random number for next random song
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// play clicked song 
function playSongAtIndex(i) {
  
  if (currentSongIndex == i) {
    if (!audio.paused) {
      audio.pause();
    } 
    else {
      audio.play();
    }
  } else {
    currentSongIndex = i;
    updateSong();
    audio.play();
  }
}

// song list
function highlightSong() {
  playedSong.forEach(function(song) {
    song.classList.remove("song-active");
  })
  playedSong[currentSongIndex].classList.add("song-active");
  playedSong[currentSongIndex].querySelector(".play-symbol").classList.add("is-visible");
};

audio.addEventListener("play", function() {
  playedSong[currentSongIndex].querySelector(".play-symbol").classList.remove("is-visible");
  playedSong[currentSongIndex].querySelector(".pause-symbol").classList.add("is-visible");
});

audio.addEventListener("pause", function() {
  playedSong[currentSongIndex].querySelector(".pause-symbol").classList.remove("is-visible");
  playedSong[currentSongIndex].querySelector(".play-symbol").classList.add("is-visible");
});