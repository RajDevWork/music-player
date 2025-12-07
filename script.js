let musicList = [
  {
    id: 1,
    name: "Raabta",
    artist: "Arijit Singh",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
    duration: "04:57",
    src: "songs/raabta.mp3",
  },
  {
    id: 2,
    name: "Kesariya",
    artist: "Arijit Singh",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    duration: "04:28",
    src: "songs/kesariya.mp3",
  },
  {
    id: 3,
    name: "Apna Bana Le",
    artist: "Arijit Singh",
    cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76",
    duration: "04:21",
    src: "songs/apna-bana-le.mp3",
  },
  {
    id: 4,
    name: "Tum Hi Ho",
    artist: "Arijit Singh",
    cover: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe",
    duration: "04:21",
    src: "songs/tum-hi-ho.mp3",
  },
  {
    id: 5,
    name: "Chaleya",
    artist: "Arijit Singh, Shilpa Rao",
    cover: "https://images.unsplash.com/photo-1485579149621-3123dd979885",
    duration: "03:20",
    src: "songs/chaleya.mp3",
  },
  {
    id: 6,
    name: "Shayad",
    artist: "Arijit Singh",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    duration: "04:07",
    src: "songs/shayad.mp3",
  },
  {
    id: 7,
    name: "Hawayein",
    artist: "Arijit Singh",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    duration: "04:50",
    src: "songs/hawayein.mp3",
  },
  {
    id: 8,
    name: "Khairiyat",
    artist: "Arijit Singh",
    cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
    duration: "04:30",
    src: "songs/khairiyat.mp3",
  },
  {
    id: 9,
    name: "Ae Dil Hai Mushkil",
    artist: "Arijit Singh",
    cover: "https://images.unsplash.com/photo-1508704019882-f9cf40e475b4",
    duration: "04:29",
    src: "songs/ae-dil-hai-mushkil.mp3",
  },
  {
    id: 10,
    name: "Tera Yaar Hoon Main",
    artist: "Arijit Singh",
    cover: "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044",
    duration: "04:24",
    src: "songs/tera-yaar-hoon-main.mp3",
  },
  {
    id: 11,
    name: "Tum Kyu Chale Ate Ho ",
    artist: "Vicky Singh",
    cover: "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044",
    duration: "02:25",
    src: "songs/tum-kyun-chale-aateho.mp3",
  },
];
let songIndex = 0;
let songList = document.querySelector(".songList");
let playSong = document.querySelector("#play");
let nextSong = document.querySelector("#next");
let prevSong = document.querySelector("#prev");
let songsContainer = document.querySelector(".songsContainer");
let currentSongInfo = document.querySelector("#currentSongInfo");
let giffy = document.querySelector("#giffy");
let range = document.querySelector("#range");
//add all the music in playlist
let is_music_playing = 0;

musicList.forEach((ele) => {
  let div = document.createElement("div");
  div.classList.add("songItems");
  div.classList.add(`song_${ele.id}`);
  div.id = `${ele.id}`;
  div.innerHTML = `<img src="${ele.cover}" alt="${ele.name}">
                    <h4>${ele.name} - ${ele.artist}</h4>
                    <div>
                        <span id="duration_${ele.id}">${ele.duration}</span>
                        <button id='btn_${ele.id}'>
                            <i class="ri-play-circle-line"  style="font-size: 18px;cursor: pointer;"></i>
                        </button>
                    </div>`;
  div.addEventListener("click", playFromlist);
  songList.appendChild(div);
});
let music = new Audio(musicList[songIndex].src);

function ManageMusic() {
  /**remove previous active and pause all play begins */
  let activeSong = document.querySelectorAll(".active");
  if (activeSong) {
    activeSong.forEach((el) => {
      let idEle = el.id;
      el.classList.remove("active");
      document
        .querySelector(`#btn_${idEle}`)
        .firstElementChild.classList.remove("ri-pause-circle-line");
      document
        .querySelector(`#btn_${idEle}`)
        .firstElementChild.classList.add("ri-play-circle-line");
      // console.log(el.id)
    });
  }

  /**remove previous active and pause all play endsup */

  let Indsong = musicList[songIndex];
  let playlistbtn = document.querySelector(`#btn_${songIndex + 1}`);
  music.src = Indsong.src;

  songsContainer.style.backgroundImage = `url(${Indsong.cover})`;
  currentSongInfo.textContent = `${Indsong.name} - ${Indsong.artist}`;
  giffy.style.opacity = 1;

  // is_music_playing = !is_music_playing;
  console.log(is_music_playing);
  range.max = music.duration;
  if (!is_music_playing) {
    playSong.firstChild.classList.remove("ri-play-circle-line");
    playSong.firstChild.classList.add("ri-pause-circle-line");
    music.play();
    document.querySelector(`.song_${songIndex + 1}`).classList.add("active");
    playlistbtn.firstElementChild.classList.remove("ri-play-circle-line");
    playlistbtn.firstElementChild.classList.add("ri-pause-circle-line");
    is_music_playing = 1;
  } else {
    // console.log("False case");
    playSong.firstChild.classList.remove("ri-pause-circle-line");
    playSong.firstChild.classList.add("ri-play-circle-line");
    playlistbtn.firstElementChild.classList.remove("ri-pause-circle-line");
    playlistbtn.firstElementChild.classList.add("ri-play-circle-line");
    music.pause();
    giffy.style.opacity = 0;
    document.querySelector(`.song_${songIndex + 1}`).classList.remove("active");
    is_music_playing = 0;
  }
}

function playFromlist(e) {
  // console.log(e.target);
  let currentID = e.target.parentNode.id.replace("btn_", "");
  if (Number(currentID)) {
    // console.log('is_music_playing ',is_music_playing)

    if (is_music_playing) {
      is_music_playing = 0;
    }
    // else{
    // is_music_playing = 0;
    // }
    // is_music_playing = !is_music_playing;
    // is_music_playing = !is_music_playing;
    songIndex = Number(currentID) - 1;
    ManageMusic();
  }
}

playSong.addEventListener("click", (e) => {
  ManageMusic();
});

function formatTime(sec) {
  let m = Math.floor(sec / 60);
  let s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? "0" + s : s}`;
}

music.addEventListener("timeupdate", (e) => {
  // console.log(e);
  let current = e.target.currentTime;
  let duration = e.target.duration;

  let remaining = duration - current;
  // console.log("remianing = ",remaining);

  if (isNaN(remaining)) {
    return;
  }
  // console.log(e.target.currentTime, e.target.duration);
  let progress = Math.floor((current / duration) * 100);
  range.value = progress;

  remaining = formatTime(remaining);

  document.querySelector(
    `#duration_${songIndex + 1}`
  ).textContent = `${remaining}`;
  // console.log("remaining = ",remaining)
  if (remaining === 0) {
    if (is_music_playing) {
      playSong.firstChild.classList.remove("ri-play-circle-line");
      playSong.firstChild.classList.add("ri-pause-circle-line");
      music.pause();
      document.querySelector(`.song_${songIndex + 1}`).classList.add("active");
      playlistbtn.firstElementChild.classList.remove("ri-play-circle-line");
      playlistbtn.firstElementChild.classList.add("ri-pause-circle-line");
    } else {
      // console.log("False case");
      playSong.firstChild.classList.remove("ri-pause-circle-line");
      playSong.firstChild.classList.add("ri-play-circle-line");
      playlistbtn.firstElementChild.classList.remove("ri-pause-circle-line");
      playlistbtn.firstElementChild.classList.add("ri-play-circle-line");
      music.play();
      giffy.style.opacity = 0;
      document
        .querySelector(`.song_${songIndex + 1}`)
        .classList.remove("active");
    }
  }
  // console.log(progress);
});

nextSong.addEventListener("click", (e) => {
  if (songIndex >= musicList.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  is_music_playing = !is_music_playing;
  ManageMusic();
});

prevSong.addEventListener("click", (e) => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  is_music_playing = !is_music_playing;
  ManageMusic();
});

range.addEventListener("change", (e) => {
  console.log("e = ", e.target.value);
  // p = ct * du /100

  // ct = (p * 100) / du
  let curProgress = (e.target.value / 100) * music.duration;

  // console.log(curProgress);
  music.currentTime = curProgress;
});
