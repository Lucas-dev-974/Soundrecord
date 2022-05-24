import  WaveformPlaylist from 'waveform-playlist'
import store from '../Store/store'
import {saveAs} from 'file-saver'

class Player{
    constructor(){
        this.player = null
        this.time   = 0
        this.volume = this.player ? this.player.masterGain : 0,
        this.track_on_move = false
        this.on_selection  = false
        this.userMediaStream = null
    }

    init_player(){
        this.player =  WaveformPlaylist({
            ac: new (window.AudioContext || window.webkitAudioContext)(),
            samplesPerPixel: 5000,
            timescale: true,
            mono: true,
            waveHeight: 80,
            container: document.getElementById("pists-container"),
            state: "select",
            seekStyle: "fill",
            colors: {
                waveOutlineColor: "#0f1013",
                timeColor: "red",
                fadeColor: "red",
            },
            zoomLevels: [500, 1000, 3000, 5000, 10000],
        })
    }

    load_tracks(pists = null){
        return new Promise((resolve, reject) => {
            this.player.load(pists != null ? pists : store.state.pists).then(() => {

                this.player.initExporter();

                // .then(() => {
                //     console.log('okok');
                // })
                resolve()
            }).catch(() => reject())
        })
    }

    remove_track(track){
        this.player.getEventEmitter().emit('removeTrack', track)
    }

    add_track(file){
        this.player.getEventEmitter().emit('newtrack', file)
    }

    set_volume(volume){
        this.player.getEventEmitter().emit('mastervolumechange', volume)
    }

    set_track_volume(volume, track){
        this.player.getEventEmitter().emit('volumechange', volume, track)
    }

    mute_unmute_track(track){
        if(track.api_options.muted) this.player('volumechange', 1, track)
        else this.player('volumechange', 0, track)
        return !track.api_options.muted
    }

    play(){
        this.player.getEventEmitter().emit('play')
    }

    pause(){
        this.player.getEventEmitter().emit('pause')
    }

    get_Tracks(){
        return this.player.tracks
    }

    get_track(trackid){
        return this.player.tracks.filter(track => track.api_options.id == trackid)
    }

    set_state(state){
        if(state == 'shift') this.track_on_move = true
        else this.track_on_move = false
        
        if(state == 'select'){
            this.on_selection = true
        }
        this.player.getEventEmitter().emit('statechange', state)
    }

    set_duration(){
        console.log(this.player);
    }

    download(name = 'undefined pist'){
        this.player.ee.on('audiorenderingfinished', (type, data) => {
            saveAs(data, name)
        })

        this.player.getEventEmitter().emit('startaudiorendering', 'wav')
        saveAs
    }

    gotStream(stream) {
        this.userMediaStream = stream;
        this.player.initRecorder(this.userMediaStream);
    }


}

export const player = new Player()