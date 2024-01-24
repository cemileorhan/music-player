const image = document.querySelector("#cover")
const title = document.querySelector("#title")
const artist = document.querySelector("#artist")
const music = document.querySelector("audio")
const currentTimeEl = document.querySelector("#current-time")
const durationEl = document.querySelector("#duration")
const progress = document.querySelector("#progress")
const progressContainer = document.querySelector("#progress-container")
const prevBtn = document.querySelector("#prev")
const playBtn = document.querySelector("#play")
const nextBtn = document.querySelector("#next")
const background = document.querySelector("#background")

const songs = [
   { path: "music-img/gunes-capkinkiz.mp3", musicName: "Çapkın Kız Freestyle", artist: "Güneş", cover: "music-img/gunes.jpg"},
   { path: "music-img/motive-zip.mp3", musicName: "ZIP", artist: "Motive", cover: "music-img/motive.jpg"},
   { path: "music-img/hadise-feryat.mp3", musicName: "Feryat", artist: "Hadise", cover: "music-img/hadise.jpg"},
   { path: "music-img/liashine-dusuyorumtekrar.mp3", musicName: "Düşüyorum Tekrar", artist: "Lia Shine", cover: "music-img/liashine.jpg"},
   { path: "music-img/no1-dunyagulbana.mp3", musicName: "Dünya Gül Bana", artist: "No.1, Heja", cover: "music-img/no1.jpg"}
]

let isLoading = false
function playSong(){
    isLoading = true
    playBtn.classList.replace("fa-play","fa-pause");
    playBtn.setAttribute("title","Pause");
    music.play()
}

function pauseSong(){
    isLoading = false
    playBtn.classList.replace("fa-pause","fa-play");
    playBtn.setAttribute("title","Play");
    music.pause()
}

function playToggle(){
    if(isLoading){
        pauseSong()
    }
    else{
        playSong()
    }
}

function loadSongs(song){
    title.innerHTML = song.musicName
    artist.innerHTML = song.artist
    music.src = song.path
    changeCover(song.cover)
}

function changeCover(cover){
    image.classList.remove("active");
    setTimeout(function(){
        image.src = cover
        image.classList.add("active");
    }, 100)
    background.src = cover
}

let songIndex = 0
function prevSong(){
    songIndex--
    if(songIndex < 0){
        songIndex = 4
    }
    loadSongs(songs[songIndex])
    playSong()
}

function nextSong(){
    songIndex++
    if(songIndex > songs.length - 1){
        songIndex = 0
    }
    loadSongs(songs[songIndex])
    playSong()
}

loadSongs(songs[songIndex])
function updateProgressBar(){
        const {duration, currentTime } = music;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
        durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
        currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = music.duration;
    music.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener("click", playToggle);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);

