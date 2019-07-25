(function() {
  class AudioPlayer {
    constructor(config) {
      if (!window.HTMLAudioElement) {
        console.debug('your browser does not support html5 audio');
        this.supportsAudio = false;
      } else {
        this.supportsAudio = true;
        console.debug('browser supports html5 audio');
      }
      this.selector = config.selector;
      this.keyBindings = config.keyBindings;
      this.playlist = config.playlist || [];
      this.nowPlaying = config.nowPlaying;
    }

    get getAudioPlayerInstance() {
      return this;
    }

    init() {
      const selector = this.selector;
      var audioPlayer = document.getElementById(selector);
      this.domAudio = audioPlayer;
    }
    play() {
      var audioPlayer = this.domAudio;
      if (!this.playlist && !this.supportsAudio) return;
    }
    updatePlaylist() {
      
    }
  }

  window.AudioPlayer = AudioPlayer;
})();
