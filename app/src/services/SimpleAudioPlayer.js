class SimplePlayerAudio {
  constructor() {
    this.audioList = [];
    this.currentIndex = 0;
    this.audioElement = new Audio();
    this.audioElement.onended = () => this.handleAudioEnd();

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
      this.audioElement.play();
    }
  }
  async play(url = null) {
    if (url != null && url != this.audioList[this.currentIndex]) {
      await this.fetchAudioBuffer(url);
    } else if (this.audioList[this.currentIndex]) {
      const audioUrl = this.audioList[this.currentIndex];
      const audioBuffer = await this.fetchAudioBuffer(audioUrl);
      await this.createAudioBlobUrl(audioBuffer);

      if (this.paused) {
        this.audioElement.play();
        this.paused = false;
      }
    }
  }

  pause() {
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

  setFallback(callback, interval = 1000) {
    this.fallbackInterval = setInterval(() => {
      if (this.audioElement.currentTime >= 0) {
        callback(this.audioList[this.currentIndex]);
      }
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
