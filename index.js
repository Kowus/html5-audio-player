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
      if (!this.playlist && !this.supportsAudio) {console.debug("Nothing to play");return;}
      console.debug("Playing...");
      this.domAudio.src = this.playlist[0].src;
      this.domAudio.title = this.playlist[0].title;
    }
    updatePlaylist(playlistPayload) {
      /** 
        * playlistPayload takes an action field which defaults to set
        * it also supports insertion at position and removing from a position
      */
      var myAudioObject = this;
      const updateOptions = {
        set(playlist){
          myAudioObject.playlist = playlist
        } 
      }
      if(!playlistPayload.action){
       updateOptions.set(playlistPayload.content)
      }
    }
  }

  window.AudioPlayer = AudioPlayer;
})();
