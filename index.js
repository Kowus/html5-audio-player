(function () {
  class AudioPlayer {
    constructor(config) {
      // IE support
      if (!window.HTMLAudioElement) {
        console.debug('your browser does not support html5 audio');
        alert('this feature is not available on your device');
      } else {
        console.debug('browser supports html5 audio');
      }
      this.selector = config.selector;
      this.keyBindings = config.keyBindings;
      this.playlist = config.playlist || [];
      this.nowPlaying = config.nowPlaying;
      this.forwardDuration = config.forwardDuration || 5;
      this.backwardDuration = config.backwardDuration || 5;
    }

    get getAudioPlayerInstance() {
      return this;
    }

    init() {
      const selector = this.selector;
      const audioPlayer = document.getElementById(selector);
      this.domAudio = audioPlayer;
    }
    play(index) {
      var idx = index || 0;
      const audioPlayer = this.domAudio;
      if (window.HTMLAudioElement) {
        try {
          if (!this.playlist) {
            console.debug('Nothing to play');
            return;
          }
          console.debug('Triggered play...');
          if (this.nowPlaying !== this.playlist[idx].title) {
            this.nowPlaying = this.playlist[idx].title;
            audioPlayer.src = this.playlist[idx].src;
          }
          if (audioPlayer.paused) return audioPlayer.play();

          return audioPlayer.pause();
        } catch (e) {
          console.error(e);
        }
      }
    }
    pause() {
      const audioPlayer = this.domAudio;
      if (window.HTMLAudioElement) {
        try {
          if (audioPlayer.paused) return console.log('Already paused');
          return audioPlayer.pause();
        } catch (e) {
          console.error(e);
        }
      }
    }
    stop() {
      const audioPlayer = this.domAudio;
      if (window.HTMLAudioElement) {
        try {
          audioPlayer.currentTime = 0;
          audioPlayer.pause();
        } catch (e) {
          console.error(e);
        }
      }
    }
    changeVolume(value) {
      const audioPlayer = this.domAudio;
      if (window.HTMLAudioElement) {
        try {
          const volUpdate = Number(value);
          if (volUpdate < 0) {
            if (audioPlayer.volume < volUpdate) return (audioPlayer.volume = 0);
          } else {
            if (audioPlayer.volume > 1 - volUpdate)
              return (audioPlayer.volume = 1);
          }
          return (audioPlayer.volume += volUpdate);
        } catch (e) {
          console.error(e);
        }
      }
    }

    rewindAudio() {
      const audioPlayer = this.domAudio;
      if (window.HTMLAudioElement) {
        try {
          audioPlayer.currentTime -= this.backwardDuration;
        } catch (e) {
          console.error(e);
        }
      }
    }
    forwardAudio() {
      const audioPlayer = this.domAudio;
      if (window.HTMLAudioElement) {
        try {
          audioPlayer.currentTime += this.forwardDuration;
        } catch (e) {
          console.error(e);
        }
      }
    }

    updatePlaylist(playlistPayload) {
      /**
       * playlistPayload takes an action field which defaults to set
       * it also supports insertion at position and removing from a position
       * and a payload object
       */
      var myAudioObject = this;
      const updateOptions = {
        set(playlist) {
          myAudioObject.playlist = playlist;
        },
        add({ index, playlist }) {
          var plst = [];
          try {
            if (Array.isArray(playlist)) plst = playlist;
            else plst = Array.of(playlist);
            myAudioObject.playlist.splice(index, 0, plst);
          } catch (e) {
            console.log('add to playlist failed, use set() instead');
          }
        },
      };
      if (!playlistPayload.action) {
        return updateOptions.set(playlistPayload.payload);
      }
      return updateOptions[playlistPayload.action](playlistPayload.payload);
    }
    attachEvent(type, listener, optionsCapture) {
      this.domAudio.addEventListener(type, listener, optionsCapture);
    }
    removeEvent(type) {
      this.domAudio.removeEventListener(type, listener, optionsCapture);
    }
  }

  window.AudioPlayer = AudioPlayer;
})();
