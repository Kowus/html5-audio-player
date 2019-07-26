(function() {
  class AudioPlayer {
    constructor(config) {
      if (!window.HTMLAudioElement) {
        console.debug('your browser does not support html5 audio');
      } else {
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
    play(index) {
      var audioPlayer = this.domAudio;
      if(window.HTMLAudioElement){
        try {
      if (!this.playlist) {console.debug("Nothing to play");return;}
      console.debug("Triggered play...");
      if(this.nowPlaying !== this.playlist[index].title){
        this.nowPlaying = this.playlist[index].title
        audioPlayer.src = this.playlist[index].src;
      }
      if(audioPlayer.paused) return audioPlayer.play()
      return audioPlayer.pause()
      } catch(e){
        console.error(e)
      }
      }
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
