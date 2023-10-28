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
    this.currentAudio = undefined;

    this.globalFallack = undefined;
    this.playNext = false;
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

  async play(audio = undefined) {
    // If no url params & is not in pause & the current url is not empty
    // lets play the current url
    if (!this.paused && this.currentAudio) {
      if (
        (audio && this.currentAudio.src == audio.src) ||
        (!audio && this.pause)
      ) {
        this.audioElement.pause();
        this.paused = true;
        this.onPause();
        return;
      }
    }

    if (
      (!this.currentAudio && !audio) ||
      (audio != undefined && !this.currentAudio) ||
      (audio != undefined &&
        this.currentAudio != undefined &&
        this.currentAudio.src != audio.src)
    ) {
      if (!this.currentAudio && !audio && this.audioList.length > 0) {
        console.log(this.audioList);
        this.currentAudio = this.audioList[this.currentIndex];
      } else {
        this.currentAudio = audio;
      }

      this.currentIndex = this.audioList.findIndex(
        (item) => item.id == this.currentAudio.id
      );
      const audioBuffer = await this.fetchAudioBuffer(this.currentAudio.src);
      await this.createAudioBlobUrl(audioBuffer);
    }

    if (!audio && this.paused && this.currentAudio) {
      this.paused = false;
      this.audioElement.play();
      this.onPlay();
      return;
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

  next() {
    this.audioElement.pause();
    if (this.currentIndex + 1 < this.audioList.length)
      this.currentIndex = this.currentIndex + 1;
    else if (this.currentIndex + 1 == this.audioList.length)
      this.currentIndex = 0;

    this.play(this.audioList[this.currentIndex]);
  }

  previous() {
    this.audioElement.pause();
    if (this.currentIndex > 0) this.currentIndex = this.currentIndex - 1;
    else if (this.currentIndex == 0) {
      this.currentIndex = this.audioList.length - 1;
    }
    this.play(this.audioList[this.currentIndex]);
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
    this.next();
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
