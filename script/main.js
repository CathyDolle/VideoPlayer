/*
CLOCK
*/
const clockElement = document.querySelector('.js-clock')
const clockHoursElement = clockElement.querySelector('.js-hours')
const clockMinutesElement = clockElement.querySelector('.js-minutes')
const clockSecondsElement = clockElement.querySelector('.js-seconds')

const tick = () => {
    const date = new Date()
    //hours
    const hours = date.getHours()
    const hoursAngle = (hours % 12) / 12 * 360
    clockHoursElement.style.transform = `rotate(${hoursAngle}deg)`
    //minutes
    const minutes = date.getMinutes()
    const minutesAngle = minutes / 60 * 360 + hours * 360
    clockMinutesElement.style.transform = `rotate(${minutesAngle}deg)`
    //seconds
    const seconds = date.getSeconds()
    const secondsAngle = seconds / 60 * 360 + minutes * 360 + hours * 360
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
        document.querySelector("h3.js-digital-clock").innerText = `0${hours} : 0${minutes}`
    } else if (minutes < 10 && hours > 10) {
        document.querySelector("h3.js-digital-clock").innerText = `${hours} : 0${minutes}`
    } else if (minutes > 10 && hours < 10) {
        document.querySelector("h3.js-digital-clock").innerText = `0${hours} : ${minutes}`
    } else {
        document.querySelector("h3.js-digital-clock").innerText = `${hours} : ${minutes}`
    }
}
window.setInterval(digitalTick, 1000)

/*
SCALE SCREEN
*/
const computerScreenUnlocked = document.querySelector('.js-unlocked')
const computerScreen = document.querySelector('.js-locked')
const digitalClock = document.querySelector('.js-digital-clock')
const room = document.querySelector('.room')

computerScreen.addEventListener('mouseover', () => {
    digitalClock.classList.remove('hidden')
})

computerScreen.addEventListener('mouseout', () => {
    digitalClock.classList.add('hidden')
})

room.addEventListener('click', (e) => {
    if (e.target.classList.contains("js-locked") || e.target.classList.contains("js-unlocked")) {
        gsap.to(".room", {
            duration: 0.3,
            scale: 2.3,
            x: '-11%',
            y: '-18%',
        })
        computerScreen.classList.add('hidden')
        computerScreenUnlocked.classList.remove('hidden')
    } else {
        gsap.to(".room", {
            duration: 0.3,
            scale: 1,
            x: '0%',
            y: '0%',
        })
        // computerScreen.classList.remove('hidden')
        // computerScreenUnlocked.classList.add('hidden')
    }
})

// PLAYER

class Player {
    constructor(_element) {
        this.element = _element
        this.videoElement = this.element.querySelector('.js-video')
        this.setPlayPause()
        this.setVolume()
        this.setSeekBar()
        this.setScreen()
        this.setVideo()
    }

    setPlayPause() {
        //play
        const playElement = this.element.querySelector('.js-play')
        playElement.addEventListener('click', () => {
            this.videoElement.play()
            pauseElement.classList.remove('hidden')
            playElement.classList.add('hidden')
        })
        this.videoElement.addEventListener('click', () => {
            if (this.videoElement.paused == false) {
                this.videoElement.pause()
                pauseElement.classList.add('hidden')
                playElement.classList.remove('hidden')
            } else {
                this.videoElement.play()
                pauseElement.classList.remove('hidden')
                playElement.classList.add('hidden')
            }
        })

        //pause
        const pauseElement = this.element.querySelector('.js-pause')
        pauseElement.addEventListener('click', () => {
            this.videoElement.pause()
            playElement.classList.remove('hidden')
            pauseElement.classList.add('hidden')

        })
    }

    setVolume() {
        const highVolumeButton = this.element.querySelector('.js-high-volume')
        const mutedVolumeButton = this.element.querySelector('.js-muted-volume')

        highVolumeButton.addEventListener('click', () => {
            highVolumeButton.classList.add('hidden')
            mutedVolumeButton.classList.remove('hidden')
            this.videoElement.muted = true
        })

        mutedVolumeButton.addEventListener('click', () => {
            mutedVolumeButton.classList.add('hidden')
            highVolumeButton.classList.remove('hidden')
            this.videoElement.muted = false
        })

    }

    setSeekBar() {
        const seekBarElement = this.element.querySelector('.js-seek-bar')
        const fillElement = this.element.querySelector('.js-seek-bar-fill')


        this.videoElement.addEventListener('timeupdate', () => {
            const ratio = this.videoElement.currentTime / this.videoElement.duration
            fillElement.style.transform = `scaleX(${ratio})`

            gsap.to(seekBarElement, {
                duration: 1,
                ease: Power1.easeOut
            })


        })

        seekBarElement.addEventListener('click', (_event) => {
            const bounding = seekBarElement.getBoundingClientRect() //réccupérer la distance de la vidéo, le padding marge etc.
            const ratio = (_event.clientX - bounding.left) / bounding.width // clientX -> position de la souris sur l'axe X
            const time = ratio * this.videoElement.duration

            this.videoElement.currentTime = time


        })
    }

    setScreen() {
        const videoContainerElement = document.querySelector('.js-video-container')
        const fullScreenElement = this.element.querySelector('.js-fullscreen')
        const minimizeScreenElement = this.element.querySelector('.js-minimize')
        const infosVideoElement = document.querySelector('.js-infos-video')
        const videoPlaylistElement = document.querySelector('.js-video-playlist')
        const bgCommandsElement = this.element.querySelector('.js-bg-commands')
        const seekBarElement = this.element.querySelector('.js-seek-bar')
        const navElement = document.querySelector('.js-nav')
        const mainBarElement = document.querySelector('.js-main-bar')
        const windowElement = document.querySelector('.js-window')
        const windowSiteElement = document.querySelector('.js-window-site')

        fullScreenElement.addEventListener('click', () => {
            videoContainerElement.style.width = ('100%')
            videoContainerElement.style.padding = ('0px')
            windowElement.style.height = ('100%')
            windowSiteElement.style.height = ('100%')
            infosVideoElement.classList.add('hidden')
            videoPlaylistElement.classList.add('hidden')
            fullScreenElement.classList.add('hidden')
            mainBarElement.classList.add('hidden')
            navElement.classList.add('hidden')
            minimizeScreenElement.classList.remove('hidden')
            bgCommandsElement.style.height = ('5%')
            seekBarElement.style.bottom = ('5.5%')
        })

        minimizeScreenElement.addEventListener('click', () => {
            videoContainerElement.style.width = ('70%')
            videoContainerElement.style.padding = ('3px')
            windowElement.style.height = ('97%')
            windowSiteElement.style.height = ('96%')
            infosVideoElement.classList.remove('hidden')
            videoPlaylistElement.classList.remove('hidden')
            fullScreenElement.classList.remove('hidden')
            mainBarElement.classList.remove('hidden')
            navElement.classList.remove('hidden')
            minimizeScreenElement.classList.add('hidden')
            bgCommandsElement.style.height = ('7%')
            seekBarElement.style.bottom = ('8%')
        })
    }

    setVideo() {
        const video1 = document.querySelector('.js-video')
        const video2 = document.querySelector('.js-video2')
        const video3 = document.querySelector('.js-video3')
        const video4 = document.querySelector('.js-video4')
        const infosVideo1 = document.querySelector('.js-infos-video1')
        const infosVideo2 = document.querySelector('.js-infos-video2')
        const infosVideo3 = document.querySelector('.js-infos-video3')
        const fillElement = this.element.querySelector('.js-seek-bar-fill')

        video2.addEventListener('click', () => {
            video1.src = 'videos/phoenix.mp4'
            pauseElement.classList.remove('hidden')
            playElement.classList.add('hidden')
            video1.play()
            fillElement.style.transform = `scaleX(${0})`
            infosVideo2.classList.remove('hidden')
            infosVideo3.classList.add('hidden')
            infosVideo1.classList.add('hidden')
        })

        video3.addEventListener('click', () => {
            video1.src = 'videos/truedamage.mp4'
            pauseElement.classList.remove('hidden')
            playElement.classList.add('hidden')
            video1.play()
            fillElement.style.transform = `scaleX(${0})`
            infosVideo3.classList.remove('hidden')
            infosVideo2.classList.add('hidden')
            infosVideo1.classList.add('hidden')
        })

        video4.addEventListener('click', () => {
            video1.src = 'videos/miso.mp4'
            pauseElement.classList.remove('hidden')
            playElement.classList.add('hidden')
            video1.play()
            fillElement.style.transform = `scaleX(${0})`
            infosVideo1.classList.remove('hidden')
            infosVideo2.classList.add('hidden')
            infosVideo3.classList.add('hidden')
        })
    }
}

const player1 = new Player(document.querySelector('.js-player'))

// OFF SCREEN

const offScreen = document.querySelector('.js-off-screen')
const videoElement = document.querySelector('.js-video')
const pauseElement = document.querySelector('.js-pause')
const playElement = document.querySelector('.js-play')

offScreen.addEventListener('click', () => {
    computerScreen.classList.remove('hidden')
    computerScreenUnlocked.classList.add('hidden')
    videoElement.pause()
    playElement.classList.remove('hidden')
    pauseElement.classList.add('hidden')
})

// hide commands
const videoBoard = document.querySelector('.js-video-board')

videoElement.addEventListener('mouseover', () => {
    videoBoard.classList.remove('hidden')
})

videoBoard.addEventListener('mouseover', () => {
    videoBoard.classList.remove('hidden')
})

videoBoard.addEventListener('mouseout', () => {
    videoBoard.classList.add('hidden')
})

videoElement.addEventListener('mouseout', () => {
    videoBoard.classList.add('hidden')
})

//DAY MODE

const windowDeco = document.querySelector('.js-window')

windowDeco.addEventListener('click', () => {
 
        windowDeco.style.backgroundImage = "url('images/ParisNight.svg')"
        document.body.style.background = "rgb(88, 88, 110)"

})