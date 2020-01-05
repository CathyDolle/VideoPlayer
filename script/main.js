// VIDEO PLAYER
class videoPlayer {
  constructor(_element) {
    this.element = _element
    this.videoElement = this.element.querySelector(".js-main-video")
    this.setVideo()
    this.setPlayPause()
    this.setVolume()
    this.setSeekBar()
    this.setHideCommands()
    this.setScreen()
    this.setTime()
  }

  // VIDEO PLAYLIST
  setVideo() {
    // VIDEO CONST
    const playlistVideo = document.querySelector(".js-video-playlist")
    const videoElement = this.element.querySelector(".js-main-video")
    // DESCRIPTIONS CONST
    const videoTitle = this.element.querySelector(".js-video-title")
    const videoDescription = this.element.querySelector(".js-video-description")
    const videoLink = this.element.querySelector(".js-video-link")

    // INIT VIDEO INFOS
    function initVideo() {
      videoElement.src = videoPlaylist[0].file
      videoTitle.innerText = videoPlaylist[0].title
      videoLink.href = videoPlaylist[0].link
      videoDescription.innerHTML = videoPlaylist[0].description
    }
    initVideo()

    // CREATE A NEW VIDEO
    function newVideo(source, cover, title, description, link) {
      const video = document.createElement("video")
      playlistVideo.appendChild(video)
      video.src = source
      video.poster = cover
      video.addEventListener("click", () => {
        videoElement.src = video.src
        videoTitle.innerText = title
        videoDescription.innerHTML = description
        videoLink.href = link
        videoElement.play()
        videoElement.currentTime = 0
        pauseElement.classList.remove("hidden")
        playElement.classList.add("hidden")
      })
    }

    // ADAPT INFO FROM ARRAY FOR EACH VIDEO
    for (
      let i = 0;
      i < videoPlaylist.length;
      i++ //Si videoPlaylist est un tableau
    ) {
      newVideo(
        videoPlaylist[i].file,
        videoPlaylist[i].cover,
        videoPlaylist[i].title,
        videoPlaylist[i].description,
        videoPlaylist[i].link
      )
    }

    // Main video playing
    function mainvideo() {
      initVideo()
      videoElement.play()
      videoElement.currentTime = 0
      pauseElement.classList.remove("hidden")
      playElement.classList.add("hidden")
    }
    // BUTTION NEXT/PREV VIDEO
    // NEXT
    const nextElement = this.element.querySelector(".js-next")

    function nextvideo() {
      videoPlaylist.push(videoPlaylist.shift())
      mainvideo()
    }

    // Next video button
    nextElement.addEventListener("click", () => {
      nextvideo()
    })
    // Next video keyboard
    document.addEventListener("keyup", event => {
      if (event.key == "ArrowRight") {
        nextvideo()
      }
    })
    // Autoplay video
    this.videoElement.addEventListener("ended", () => {
      nextvideo()
    })

    // PREV CONST
    const prevElement = this.element.querySelector(".js-prev")
    // Function prev
    function prevvideo() {
      videoPlaylist.unshift(videoPlaylist.pop())
      mainvideo()
    }
    // Button prev
    prevElement.addEventListener("click", () => {
      prevvideo()
    })
    // Button key prev
    document.addEventListener("keyup", event => {
      if (event.key == "ArrowLeft") {
        prevvideo()
      }
    })
  }

  setPlayPause() {
    //play - pause const
    const playElement = this.element.querySelector(".js-play")
    const pauseElement = this.element.querySelector(".js-pause")
    const videoElement = this.element.querySelector(".js-main-video")

    // Function for play pause
    function playvideo() {
      if (videoElement.paused == false) {
        videoElement.pause()
        pauseElement.classList.add("hidden")
        playElement.classList.remove("hidden")
      } else {
        videoElement.play()
        pauseElement.classList.remove("hidden")
        playElement.classList.add("hidden")
      }
    }

    // play button
    playElement.addEventListener("click", () => {
      playvideo()
    })

    // pause button
    pauseElement.addEventListener("click", () => {
      playvideo()
    })

    // play/pause on screen click
    this.videoElement.addEventListener("click", () => {
      playvideo()
    })

    // play/pause with space key
    document.addEventListener("keyup", event => {
      if (event.key == " ") {
        playvideo()
      }
    })
  }

  setVolume() {
    const highVolumeButton = this.element.querySelector(".js-high-volume")
    const mutedVolumeButton = this.element.querySelector(".js-muted-volume")
    // fill bar volume
    const volumeBar = this.element.querySelector(".js-volume-bar")
    const volumeBarFill = this.element.querySelector(".js-volume-bar-fill")

    // Drag yea
    volumeBar.addEventListener("mousedown", _e => {
      this.userIsDraggingSeekBar = true
    })

    volumeBar.addEventListener("mousemove", _e => {
      if (this.userIsDraggingSeekBar) {
        const bounding = volumeBar.getBoundingClientRect() //distance of the video (padding etc.)
        const ratio = (_e.clientX - bounding.left) / bounding.width // clientX position mouse on X axe
        volumeBarFill.style.transform = `scaleX(${ratio})`
        if (ratio < 0) {
          this.userIsDraggingSeekBar = false
        }
        this.videoElement.volume = ratio
      }
    })

    // Dont drag
    volumeBar.addEventListener("mouseup", _e => {
      this.userIsDraggingSeekBar = false
    })

    volumeBar.addEventListener("mouseleave", _e => {
      this.userIsDraggingSeekBar = false
    })

    // HIGH VOLUME

    highVolumeButton.addEventListener("click", () => {
      highVolumeButton.classList.add("hidden")
      mutedVolumeButton.classList.remove("hidden")
      this.videoElement.muted = true
    })

    // MUTE

    mutedVolumeButton.addEventListener("click", () => {
      mutedVolumeButton.classList.add("hidden")
      highVolumeButton.classList.remove("hidden")
      this.videoElement.muted = false
    })
  }

  setSeekBar() {
    const seekBarElement = this.element.querySelector(".js-seek-bar")
    const fillElement = this.element.querySelector(".js-seek-bar-fill")

    // Drag & Drop
    seekBarElement.addEventListener("mousedown", _e => {
      this.userIsDraggingSeekBar = true
    })

    seekBarElement.addEventListener("mousemove", _e => {
      if (this.userIsDraggingSeekBar) {
        const bounding = seekBarElement.getBoundingClientRect() //distance of the video (padding etc.)
        const ratio = (_e.clientX - bounding.left) / bounding.width // clientX position mouse on X axe
        const time = ratio * this.videoElement.duration
        fillElement.style.transform = `scaleX(${ratio})`
        this.videoElement.currentTime = time
      }
    })

    seekBarElement.addEventListener("mouseup", _e => {
      this.userIsDraggingSeekBar = false
    })

    seekBarElement.addEventListener("mouseleave", _e => {
      this.userIsDraggingSeekBar = false
    })

    // time update
    this.videoElement.addEventListener("timeupdate", () => {
      const ratio = this.videoElement.currentTime / this.videoElement.duration
      fillElement.style.transform = `scaleX(${ratio})`
    })
  }

  setHideCommands() {
    // hide commands on hover
    const videoCommands = document.querySelector(".js-video-commands")

    this.videoElement.addEventListener("mouseover", () => {
      videoCommands.classList.remove("hidden")
    })

    videoCommands.addEventListener("mouseover", () => {
      videoCommands.classList.remove("hidden")
    })

    videoCommands.addEventListener("mouseout", () => {
      videoCommands.classList.add("hidden")
    })

    this.videoElement.addEventListener("mouseout", () => {
      videoCommands.classList.add("hidden")
    })
  }

  setScreen() {
    // Const to hide/show for full screen (hide window element)
    const video = this.element.querySelector(".js-video")
    const videoContainerElement = this.element.querySelector(
      ".js-video-container"
    )
    const fullScreenElement = this.element.querySelector(".js-fullscreen")
    const minimizeScreenElement = this.element.querySelector(".js-minimize")
    const infosVideoElement = this.element.querySelector(".js-infos-video")
    const videoPlaylistElement = this.element.querySelector(
      ".js-video-playlist"
    )
    const bgCommandsElement = this.element.querySelector(".js-bg-commands")
    const seekBarElement = this.element.querySelector(".js-seek-bar")
    const navElement = document.querySelector(".js-nav")
    const mainBarElement = document.querySelector(".js-main-bar")
    const windowElement = document.querySelector(".js-window")
    const windowSiteElement = document.querySelector(".js-window-site")

    // fullscreen
    function fullscreen() {
      if (minimizeScreenElement.classList.contains("hidden")) {
        // full screen
        video.style.height = "100%"
        videoContainerElement.style.width = "100%"
        videoContainerElement.style.height = "100%"
        videoContainerElement.style.padding = "0px"
        windowElement.style.height = "100%"
        windowSiteElement.style.height = "100%"
        infosVideoElement.classList.add("hidden")
        videoPlaylistElement.classList.add("hidden")
        fullScreenElement.classList.add("hidden")
        mainBarElement.classList.add("hidden")
        navElement.classList.add("hidden")
        minimizeScreenElement.classList.remove("hidden")
        bgCommandsElement.style.height = "6%"
        seekBarElement.style.bottom = "5.5%"
      } else {
        // minim screen
        videoContainerElement.style.width = "70%"
        video.style.height = "67.5%"
        videoContainerElement.style.padding = "3px"
        windowElement.style.height = "96%"
        windowSiteElement.style.height = "96%"
        infosVideoElement.classList.remove("hidden")
        videoPlaylistElement.classList.remove("hidden")
        fullScreenElement.classList.remove("hidden")
        mainBarElement.classList.remove("hidden")
        navElement.classList.remove("hidden")
        minimizeScreenElement.classList.add("hidden")
        bgCommandsElement.style.height = "8%"
        seekBarElement.style.bottom = "8%"
      }
    }

    // full/minimize screen with F key
    document.addEventListener("keyup", event => {
      if (event.key == "f") {
        fullscreen()
      }
    })

    // full screen with click button
    fullScreenElement.addEventListener("click", () => {
      fullscreen()
    })

    // minimize screen with click button
    minimizeScreenElement.addEventListener("click", () => {
      fullscreen()
    })
  }
  setTime() {
    // TIME CONST
    const videoCurrentTime = this.element.querySelector(
      ".js-video-current-time"
    )
    const videoDuration = this.element.querySelector(".js-video-duration")

    var updates = setInterval(() => {
      // current time
      var vmins = Math.floor(this.videoElement.currentTime / 60)
      var vsecs = Math.floor(this.videoElement.currentTime % 60)
      if (vsecs < 10) {
        vsecs = "0" + String(vsecs)
      }
      videoCurrentTime.innerText = vmins + ":" + vsecs
      // duration
      var vdurMins = Math.floor(this.videoElement.duration / 60)
      var vdurSecs = Math.floor(this.videoElement.duration % 60)
      if (vdurSecs < 10) {
        vdurSecs = "0" + String(vdurSecs)
      }
      if (isNaN(this.videoElement.duration)) {
        videoDuration.innerText = "0:00"
      } else if (!isNaN(this.videoElement.duration)) {
        videoDuration.innerText = vdurMins + ":" + vdurSecs
      }
    }, 10)
  }
}
const videoPlayer1 = new videoPlayer(document.querySelector(".js-window-site"))

/*
CLOCK
*/
const clockElement = document.querySelector(".js-clock")
const clockHoursElement = clockElement.querySelector(".js-hours")
const clockMinutesElement = clockElement.querySelector(".js-minutes")
const clockSecondsElement = clockElement.querySelector(".js-seconds")

const tick = () => {
  const date = new Date()
  //hours
  const hours = date.getHours()
  const hoursAngle = ((hours % 12) / 12) * 360
  clockHoursElement.style.transform = `rotate(${hoursAngle}deg)`
  //minutes
  const minutes = date.getMinutes()
  const minutesAngle = (minutes / 60) * 360 + hours * 360
  clockMinutesElement.style.transform = `rotate(${minutesAngle}deg)`
  //seconds
  const seconds = date.getSeconds()
  const secondsAngle = (seconds / 60) * 360 + minutes * 360 + hours * 360
  clockSecondsElement.style.transform = `rotate(${secondsAngle}deg)`
}
window.setInterval(tick, 1000)
tick()

/*
DIGITAL CLOCk
*/
const digitalTick = () => {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  if (minutes < 10 && hours < 10) {
    document.querySelector(
      "h3.js-digital-clock"
    ).innerText = `0${hours} : 0${minutes}`
  } else if (minutes < 10 && hours > 10) {
    document.querySelector(
      "h3.js-digital-clock"
    ).innerText = `${hours} : 0${minutes}`
  } else if (minutes > 10 && hours < 10) {
    document.querySelector(
      "h3.js-digital-clock"
    ).innerText = `0${hours} : ${minutes}`
  } else {
    document.querySelector(
      "h3.js-digital-clock"
    ).innerText = `${hours} : ${minutes}`
  }
}
window.setInterval(digitalTick, 1000)

/*
HOVER
*/
const computerScreen = document.querySelector(".js-computer-locked")

// show screen + time on hover
computerScreen.addEventListener("mouseover", () => {
  digitalClock.classList.remove("hidden")
})

// dont show screen + time
computerScreen.addEventListener("mouseout", () => {
  digitalClock.classList.add("hidden")
})

/*
SCALE COMPUTER SCREEN & IPHONE SCREEN
*/

// Const room (main scale)
const room = document.querySelector(".room")

// Const for scale computer screen
const computerScreenUnlocked = document.querySelector(".js-computer-unlocked")

// Clock element on computer screen (locked)
const digitalClock = document.querySelector(".js-digital-clock")

// Const for scale iphone screen
const iphoneScreenUnlocked = document.querySelector(".js-iphone-unlocked")
const iphoneScreen = document.querySelector(".js-iphone-locked")

// Const Off screen
const offScreen = document.querySelector(".js-off-screen")
const pauseElement = document.querySelector(".js-pause")
const playElement = document.querySelector(".js-play")
const videoElement = document.querySelector(".js-main-video")

// origin scale
function scaleroom() {
  room.style.transform = "scale(1)"
  // Hide Iphone -> Its locked when user unscale the Iphone
  iphoneScreen.classList.remove("hidden")
  iphoneScreenUnlocked.classList.add("hidden")
}

// computer scale
function scalecomputer() {
  room.style.transform = "scale(2) translateY(-8%)"
  computerScreen.classList.add("hidden")
  computerScreenUnlocked.style.opacity = "1"
}

// Event : click the computer or iphone screen -> unlocked + scale
if (window.innerWidth > 1300) {
  room.addEventListener("click", e => {
    // scale computer screen
    if (e.target.classList.contains("js-room-scale")) {
      scaleroom()
    }
    // scale iphone screen
    else if (
      e.target.classList.contains("js-iphone-locked") ||
      e.target.classList.contains("js-iphone-unlocked")
    ) {
      room.style.transform = "scale(4) translateX(-30%) translateY(-20%)"
      iphoneScreen.classList.add("hidden")
      iphoneScreenUnlocked.classList.remove("hidden")
    }
    // off screen
    else if (e.target.classList.contains("js-off-screen")) {
      room.style.transform = "scale(1)"
      computerScreen.classList.remove("hidden")
      computerScreenUnlocked.style.opacity = "0"
      playElement.classList.remove("hidden")
      pauseElement.classList.add("hidden")
      videoElement.pause()
    }
    // for window & post it
    else if (e.target.classList.contains("js-no-scale")) {
      room.style.transform = "scale(1)"
    }
    // scale computer
    else {
      scalecomputer()
    }
  })
}
// Escape = origin scale
document.addEventListener("keyup", event => {
  // console.log(event);

  if (event.key == "Escape") {
    scaleroom()
  }
})

// Enter = computer scale
document.addEventListener("keyup", event => {
  if (event.key == "Enter") {
    scalecomputer()
  }
})

// IPHONE AUDIO PLAYER

// AUDIO
var audio = new Audio()
i = 0

// INITIAL AUDIO
// Const to attribute array infos
const audioArtist = document.querySelector(".js-audio-artist")
const audioTitle = document.querySelector(".js-audio-title")
const audioCover = document.querySelector(".js-audio-cover")

// Initial audio
function initAudio() {
  audio.src = audioPlaylist[i].file
  audioTitle.innerText = audioPlaylist[i].title
  audioArtist.innerText = audioPlaylist[i].artist
  audioCover.style.backgroundImage = `url(${audioPlaylist[i].cover})`
}
initAudio()

// IPHONE AUDIOS < COMMANDS CONST
const audioPrev = document.querySelector(".js-prev-audio")
const audioNext = document.querySelector(".js-next-audio")
const audioPlay = document.querySelector(".js-play-audio")
const audioPause = document.querySelector(".js-pause-audio")

// IPHONE AUDIO < TIME CONST
const audioCurrentTime = document.querySelector(".js-audio-current-time")
const audioDuration = document.querySelector(".js-audio-duration")

// IPHONE AUDIO < TIMEBAR CONST
const audioTimeBar = document.querySelector(".js-audio-time-bar")
const audioTimeBarFill = document.querySelector(".js-audio-time-bar-fill")

// Time bar update currentTime
audio.addEventListener("timeupdate", () => {
  const ratioAudio = audio.currentTime / audio.duration
  audioTimeBarFill.style.transform = `scaleX(${ratioAudio})`
})

// Time bar update currentTime on click

// Drag & Drop
audioTimeBar.addEventListener("mousedown", _e => {
  this.userIsDraggingSeekBar = true
})

audioTimeBar.addEventListener("mousemove", _e => {
  if (this.userIsDraggingSeekBar) {
    const boundingAudio = audioTimeBar.getBoundingClientRect() //réccupérer la distance de la vidéo, le padding marge etc.
    const ratioAudio = (_e.clientX - boundingAudio.left) / boundingAudio.width // clientX -> position de la souris sur l'axe X
    const timeAudio = ratioAudio * audio.duration
    audioTimeBarFill.style.transform = `scaleX(${ratioAudio})`
    audio.currentTime = timeAudio
  }
})

audioTimeBar.addEventListener("mouseup", _e => {
  this.userIsDraggingSeekBar = false
})

audioTimeBar.addEventListener("mouseleave", _e => {
  this.userIsDraggingSeekBar = false
})

// AUDIO SHOW TIME
var update = setInterval(() => {
  // current time
  var mins = Math.floor(audio.currentTime / 60)
  var secs = Math.floor(audio.currentTime % 60)

  if (secs < 10) {
    secs = "0" + String(secs)
  }
  audioCurrentTime.innerText = mins + ":" + secs
  // duration
  var durMins = Math.floor(audio.duration / 60)
  var durSecs = Math.floor(audio.duration % 60)
  if (durSecs < 10) {
    durSecs = "0" + String(durSecs)
  }
  if (isNaN(audio.duration)) {
    audioDuration.innerText = "0:00"
  } else if (!isNaN(audio.duration)) {
    audioDuration.innerText = durMins + ":" + durSecs
  }
}, 10)

// Play / pause function
function playPauseAudio() {
  if (audio.paused == false) {
    audio.pause()
    audioPause.classList.add("hidden")
    audioPlay.classList.remove("hidden")
  } else {
    audio.play()
    audioPause.classList.remove("hidden")
    audioPlay.classList.add("hidden")
  }
}

// play button on click
audioPlay.addEventListener("click", () => {
  playPauseAudio()
})

// pause button on click
audioPause.addEventListener("click", () => {
  playPauseAudio()
})

// pause on P Key
document.addEventListener("keyup", event => {
  if (event.key == "p") {
    playPauseAudio()
  }
})

// NEXT audio function
function nextaudio() {
  audioPlaylist[i].currentTime = 0
  audio.pause()
  i = (i + 1) % audioPlaylist.length
  initAudio()
  audio.play()
  audioPause.classList.remove("hidden")
  audioPlay.classList.add("hidden")
}

function prevaudio() {
  audioPlaylist[i].currentTime = 0
  audio.pause()
  if (i === 0) {
    i = audioPlaylist.length - 1
  } else {
    i--
  }
  audio.src = audioPlaylist[i].file
  initAudio()
  audio.play()
  audioPause.classList.remove("hidden")
  audioPlay.classList.add("hidden")
}

// Next button on click
audioNext.addEventListener("click", () => {
  nextaudio()
})

// Prev button on click
audioPrev.addEventListener("click", () => {
  prevaudio()
})

// Next on up key ArrowUp
document.addEventListener("keyup", event => {
  if (event.key == "ArrowUp") {
    nextaudio()
  }
})

// Prev on up key ArrowDown
document.addEventListener("keyup", event => {
  if (event.key == "ArrowDown") {
    prevaudio()
  }
})

//autoplay
audio.addEventListener("ended", () => {
  nextaudio()
})

// Iphone volume

// fill bar volume
const volumeAudioBar = document.querySelector(".js-volume-audio-bar")
const volumeAudioBarFill = document.querySelector(".js-volume-audio-bar-fill")

volumeAudioBar.addEventListener("mousedown", _e => {
  this.userIsDraggingSeekBar = true
})

volumeAudioBar.addEventListener("mousemove", _e => {
  if (this.userIsDraggingSeekBar) {
    const bounding = volumeAudioBar.getBoundingClientRect() //distance of the video (padding etc.)
    const ratio = (_e.clientX - bounding.left) / bounding.width // clientX position mouse on X axe
    volumeAudioBarFill.style.transform = `scaleX(${ratio})`
    if (ratio < 0) {
      this.userIsDraggingSeekBar = false
    }
    audio.volume = ratio
  }
})

volumeAudioBar.addEventListener("mouseup", _e => {
  this.userIsDraggingSeekBar = false
})

volumeAudioBar.addEventListener("mouseleave", _e => {
  this.userIsDraggingSeekBar = false
})

//DAY/NIGHT MODE

const windowDeco = document.querySelector(".js-window-deco")
const titleSong = document.querySelector("h1")
const descSong = document.querySelector("p")
const site = document.querySelector(".js-window-site")
const nav = document.querySelector(".js-nav")

windowDeco.addEventListener("click", a => {
  // night
  if (a.target.classList.contains("js-day")) {
    windowDeco.style.backgroundImage = "url('images/parisNight.svg')"
    document.body.style.background = "rgb(88, 88, 110)"
    windowDeco.classList.remove("js-day")
    titleSong.style.color = "white"
    descSong.style.color = "white"
    site.style.background = "rgb(26, 26, 26)"
    nav.style.background = "rgb(5, 5, 5)"
  }
  // day
  else {
    windowDeco.style.backgroundImage = "url('images/paris.svg')"
    document.body.style.background = "#D2D2E0"
    windowDeco.classList.add("js-day")
    titleSong.style.color = "black"
    descSong.style.color = "black"
    site.style.background = "white"
    nav.style.background = "#e5e5e5"
  }
})

// POST IT
const roomPost = document.querySelector(".js-room-post")
const closePost = document.querySelector(".js-close-post")
const postLogo = document.querySelector(".js-post-logo")
const postContainLogo = document.querySelector(".js-post-contain-logo")
const postKey = document.querySelector(".js-post-key")
const postContainKey = document.querySelector(".js-post-contain-key")
const postContain = document.querySelector(".js-post-contain")

// Remove Room Post
function removeRoomPost() {
  roomPost.classList.remove("hidden")
}
// Close post
function removePost() {
  roomPost.classList.add("hidden")
  postContainLogo.classList.add("hidden")
  postContainKey.classList.add("hidden")
  drawerOpen.classList.add("hidden")
}
// Close Post
closePost.addEventListener("click", () => {
  removePost()
})
// Shortcut for close post
document.addEventListener("keyup", event => {
  if (event.key == "Escape") {
    removePost()
  }
})
// Open Post Logo
postLogo.addEventListener("click", () => {
  removeRoomPost()
  postContainLogo.classList.remove("hidden")
  postContain.style.width = "600px"
})
// Open Post Key
postKey.addEventListener("click", () => {
  removeRoomPost()
  postContainKey.classList.remove("hidden")
  postContain.style.width = "1100px"
})

// DRAWER

const drawer = document.querySelector(".js-drawer")
const drawerOpen = document.querySelector(".js-drawer-open")

drawer.addEventListener("click", () => {
  removeRoomPost()
  drawerOpen.classList.remove("hidden")
  postContain.style.width = "1000px"
})

// Responsive
// const videoCommands = document.querySelector('.js-video-commands')

if (window.innerWidth < 1301) {
  videoElement.removeAttribute("controls")
  room.addEventListener("click", e => {
    computerScreen.classList.add("hidden")
    // videoCommands.classList.add('hidden')
    computerScreenUnlocked.style.opacity = "1"
    if (e.target.classList.contains("js-off-screen")) {
      computerScreen.classList.remove("hidden")
      computerScreenUnlocked.style.opacity = "0"
      playElement.classList.remove("hidden")
      pauseElement.classList.add("hidden")
      videoElement.pause()
    }
  })
}
