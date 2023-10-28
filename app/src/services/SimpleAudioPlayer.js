class SimplePlayerAudio {
  onPlay() {
    const event = new Event("spl-play", { bubbles: true });
    document.dispatchEvent(event);
  }

  onPause() {
    const event = new Event("spl-pause", { bubbles: true });
    document.dispatchEvent(event);
  }

  onResume() {
    const event = new Event("resume");
    document.dispatchEvent(event);
  }

  constructor() {
    this.initalised = false;
    this.currentUrl = undefined;
    this.audioList = [];

    this.currentIndex = 0;
    this.audioElement = new Audio();
    this.audioElement.onended = () => this.handleAudioEnd();
    this.paused = false;
    this.currentAudio = {};

    this.globalFallack = undefined;
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
      return (this.audioElement.currentTime = time);
    }
  }

  getDuration() {
    return this.audioElement.duration;
  }

  getPlayingMinutes() {
    return this.audioElement.currentTime;
  }

  async play(url = undefined, audio = undefined) {
    // If no url params & is not in pause & the current url is not empty
    // lets play the current url
    if (!this.paused && this.currentUrl) {
      console.log("okok");
      this.audioElement.pause();
      this.paused = true;
      this.onPause();
      return;
    }
    if (audio != undefined) this.currentAudio = audio;

    if (!url && !this.currentUrl && this.audioList.length > 0) {
      this.currentUrl = this.audioList[this.currentIndex];
    }

    console.log(!url && this.paused && this.currentUrl);
    if (!url && this.paused && this.currentUrl) {
      console.log("okokok");
      this.paused = false;
      this.audioElement.play();
      this.onPlay();
      return;
    }

    if (this.currentUrl != url || !this.currentUrl) {
      this.currentUrl = url != undefined ? url : this.currentUrl;
      console.log("current url:", this.currentUrl);
      const audioBuffer = await this.fetchAudioBuffer(this.currentUrl);
      await this.createAudioBlobUrl(audioBuffer);
    }

    this.paused = false;
    this.audioElement.play();
    this.onPlay();
  }

  isPaused() {
    return this.paused;
  }

  pause() {
    this.onPause();
    this.audioElement.pause();
    this.paused = true;
  }

  setAudioList(audiosList) {
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

  // TODO review the fallback logic to have multiple fallback with an auto generated id
  setFallback(callback, interval = 100) {
    this.fallbackInterval = setInterval(() => {
      callback(this.getCurrentTime());
    }, interval);
  }

  setGlobalFallback(callback, interval = 100) {
    this.globalFallack = setInterval(() => {
      callback(this.getCurrentTime());
    }, interval);
  }

  clearFallback() {
    clearInterval(this.fallbackInterval);
  }

  clearGlobalFallback() {
    clearInterval(this.globalFallack);
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

  getCurrentAudio() {
    return this.currentAudio;
  }

  getCurrentUrl() {
    return this.currentUrl;
  }
}

export default SimplePlayerAudio.getInstance();
