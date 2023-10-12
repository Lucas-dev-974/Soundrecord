class SimplePlayerAudio {
  onPlay() {
    const event = new Event('spl-play',{bubbles: true});
    document.dispatchEvent(event);
            // ...dispatch on elem!
            // let event = new Event("hello", {bubbles: true}); // (2)
            // document.dispatchEvent(event);
  }

  onPause() {
    const event = new Event('spl-pause', {bubbles: true});
    document.dispatchEvent(event);
  }

  onResume() {
    const event = new Event('resume');
    document.dispatchEvent(event);
  }

  constructor() {
    this.initalised = false
    this.currentUrl = ""
    this.audioList = [];
    this.currentIndex = 0;
    this.audioElement = new Audio();
    this.audioElement.onended = () => this.handleAudioEnd();
    this.paused = false
    this.currentAudio = {};
  }

  async fetchAudioBuffer(audioUrl) {
    try {
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      return arrayBuffer;
    } catch (error) {
      console.error("Error fetching audio buffer:", error);
      return null;
    }
  }

  async createAudioBlobUrl(audioBuffer) {
    if (audioBuffer) {
      const audioBlob = new Blob([audioBuffer], { type: "audio/mpeg" });
      const audioUrlObject = URL.createObjectURL(audioBlob);

      this.audioElement.src = audioUrlObject;
    }
  }
  getCurrentTime() {
    if (this.audioElement) {
      return this.audioElement.currentTime;
    }
    return 0; // Si aucun élément audio n'est en cours de lecture, renvoyer 0
  }

  setCurrentTime(time) {
    if (this.audioElement) {
      return this.audioElement.currentTime = time;
    }
  }


  getDuration(){
    return this.audioElement.duration
  }

  async play(url = null) {
    // If no url params & is not in pause & the current url is not empty
    // lets play the current url
    if (!this.paused && url == null && this.currentUrl != "") {
      this.audioElement.pause();
      this.onPause()
      this.paused = true;
      return;
    }else{
      this.onPlay()
    }
    
    // If current url params is not null & current url is not = url params or current url is empty
    // lets define current url on url params
    if (url != null && this.currentUrl !== url || this.currentUrl == "") {
      this.currentUrl = url;
    }   

    // If is in pause & not params url & is index of playlist 
    if (this.paused && url == null && this.currentUrl == this.audioList[this.currentIndex]) {
      console.log("play audio");
      this.audioElement.play();
      this.paused = false;
      return;
    }

    if (this.paused && url == null) {
      console.log("pause audio");
      this.audioElement.play();
      this.paused = false;
      return
    }

    if (this.audioList[this.currentIndex] && this.currentUrl != "" && url == null) {
      url = this.audioList[this.currentIndex]
      this.currentUrl = url;
    }
  
    const audioBuffer = await this.fetchAudioBuffer(this.currentUrl);
    await this.createAudioBlobUrl(audioBuffer);
  
    this.audioElement.play();
  }

  pause() {
    this.onPause()
    this.audioElement.pause();
    this.paused = true;
  }

  async setAudioList(audiosList) {
    this.audioList = audiosList;
  }

  getAudioList() {
    return this.audioList;
  }

  playNext() {
    this.currentIndex = (this.currentIndex + 1) % this.audioList.length;
    this.play();
  }

  setVolume(volume) {
    this.audioElement.volume = volume;
  }

  setFallback(callback, interval = 100) {
    this.fallbackInterval = setInterval(() => {
      callback()
    }, interval);
  }

  clearFallback() {
    clearInterval(this.fallbackInterval);
  }

  handleAudioEnd() {
    this.playNext();
  }

  static getInstance() {
    if (!SimplePlayerAudio.instance) {
      SimplePlayerAudio.instance = new SimplePlayerAudio();
    }
    return SimplePlayerAudio.instance;
  }
}

export default SimplePlayerAudio.getInstance();
