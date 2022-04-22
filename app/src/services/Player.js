import  WaveformPlaylist from 'waveform-playlist'
import store from '../Store/store'

class Player{
    constructor(){
        this.player = null
        this.time   = 0
        this.volume = 0
    }

     init_Player(){
        this.player =  WaveformPlaylist({
            ac: new (window.AudioContext || window.webkitAudioContext)(),
            samplesPerPixel: 3000,
            timescale: true,
            mono: true,
            waveHeight: 80,
            container: document.getElementById("pists-container"),
            state: "select",
            seekStyle: "fill",
            colors: {
                waveOutlineColor: "rgb(26, 29, 33)",
                timeColor: "white",
                fadeColor: "white",
            },
            zoomLevels: [500, 1000, 3000, 5000],
        })
    }

    laodTrack(){
        return new Promise((resolve, reject) => {
            this.player.load(store.state.pists).then(() => {
                resolve()
            }).catch(() => reject())
        })
    }

    removeTrack(track){
        this.player.getEventEmitter().emit('removeTrack', track)
    }

    addTrack(file){
        console.log('add track ');
        console.log(file);
        this.player.getEventEmitter().emit('newTrack', file)
    }

    set_volume(volume){
        this.player.getEventEmitter().emit('mastervolumechange', volume)
    }

    set_track_volume(volume, track){
        this.player.getEventEmitter('volumechange', volume, track)
    }

    play(){
        this.player.getEventEmitter().emit('play')
        // store.state.player_currentTime
    }

    pause(){
        this.player.getEventEmitter().emit('pause')
    }

    log(){
        console.log(this.volume)
    }

    get_Tracks(){
        return this.player.tracks
    }
}

export const player = new Player()