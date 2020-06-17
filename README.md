# HTML5 Audio Player

## An html5 audio player module

### Installation

### Getting Started

Create an audio element in your html file and assign it an id.

```html
<audio id="sample_audio_player"></audio>
```

In your javascript file, reference it as such

```javascript
var myAudioPlayer = new AudioPlayer(config);
```

### Format for playlist

```javascript
[
  {
    title: String, // Title of track
    author: String, // Artist, author
    src: String, // Link to audio file
    img: String, // Artwork
  },
];
```
