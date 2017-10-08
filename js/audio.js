var currentFile = "";
var volChg = .02;

function progressBar() {
    var oAudio = document.getElementById('myaudio');
    var elapsedTime = Math.round(oAudio.currentTime);
    var prog = document.getElementById("progress");
    var pWidth = (elapsedTime / oAudio.duration) * 100;
    // prog.value = pWidth;
    prog.style.width = pWidth + "%"

    /*
    
        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
            ctx.fillStyle = "rgb(255, 0, 0)";
            var fWidth = (elapsedTime / oAudio.duration) * canvas.clientWidth;
            if (fWidth > 0) {
                ctx.fillRect(0, 0, fWidth, canvas.clientHeight);
            }
        }
    */
}
function volumeBar() {
    var oAudio = document.getElementById('myaudio');
    var disVol = document.getElementById('volume');
    var volbar = document.getElementById('volbar');
    var currVol = Math.round(oAudio.volume * 100) + "%";
    volbar.style.height = currVol;
    disVol.innerHTML = currVol;
    // console.log(oAudio.volume);
    /*
        var canvas2 = document.getElementById("canvas2");
        if (canvas2.getContext) {
            var ctx2 = canvas2.getContext('2d');
            ctx2.clearRect(0, 0, canvas2.clientWidth, canvas2.clientHeight);
            ctx2.fillStyle = "rgb(200, 10, 84)";
            var vol = Math.round(100 - ((oAudio.volume / 1) * (1 / canvas2.clientHeight)) * 10000) - 5;
            if (vol > 0) {
                ctx2.fillRect(0, vol, canvas2.clientWidth, canvas2.clientHeight);
            }
        }
    */
}

function playAudio() {
    // Check for audio element support
    if (window.HTMLAudioElement) {
        try {
            var oAudio = document.getElementById('myaudio');
            var btn = document.getElementById('play');
            var audioUrl = document.getElementById('audiofile');

            // Skip Load if current file hasn't changed
            if (audioUrl.value !== currentFile) {
                oAudio.src = audioUrl.value;
                currentFile = audioUrl.value;
            }

            // Tests the paused attribute and set state.
            if (oAudio.paused) {
                oAudio.play();
                btn.innerHTML = '<i class="glyphicon glyphicon-pause"></i>';
            }
            else {
                oAudio.pause();
                btn.innerHTML = '<i class="fa fa-play"></i> Play';
            }
        } catch (e) {
            catcher(e)
        }
    }
}

// Rewind by 30 seconds
function rewindAudio() {
    // Check audio element support
    if (window.HTMLAudioElement) {
        try {
            var oAudio = document.getElementById('myaudio');
            oAudio.currentTime -= 10.0;
        } catch (e) {
            catcher(e);
        }
    }
}

function forwardAudio() {
    // Check audio element support
    if (window.HTMLAudioElement) {
        try {
            var oAudio = document.getElementById('myaudio');
            oAudio.currentTime += 10.0;
        } catch (e) {
            catcher(e);
        }
    }
}

function restartAudio() {
    // check for audio element support.
    if (window.HTMLAudioElement) {
        try {
            var oAudio = document.getElementById('myaudio');
            oAudio.currentTime = 0;
            if (!oAudio.playing) {
                oAudio.play();
            }
        } catch (e) {
            catcher(e);
        }
    }
}

function stopAudio() {
    // Check for audio element support
    if (window.HTMLAudioElement) {
        try {
            var oAudio = document.getElementById('myaudio');
            oAudio.currentTime = 0;
            oAudio.pause();
        } catch (e) {
            catcher(e);
        }
    }
}

function decreaseVolume() {
    if (window.HTMLAudioElement) {
        try {
            var oAudio = document.getElementById('myaudio');
            if (oAudio.volume < volChg) {
                oAudio.volume = 0;
            } else {
                oAudio.volume -= volChg;
            }
        } catch (e) {
            catcher(e);
        }
    }
}

function increaseVolume() {
    if (window.HTMLAudioElement) {
        try {
            var oAudio = document.getElementById('myaudio');
            if (oAudio.volume > (1 - volChg)) {
                oAudio.volume = 1;
            } else {
                oAudio.volume += volChg;
            }
        } catch (e) {
            catcher(e);
        }
    }
}

function increaseSpeed() {
    var oAudio = document.getElementById('myaudio');
    if (oAudio.playbackRate < 1) {
        oAudio.playbackRate *= 2;
    } else
        oAudio.playbackRate += .5;
}

function decreaseSpeed() {
    var oAudio = document.getElementById('myaudio');
    if (oAudio.playbackRate <= 1) {
        var temp = oAudio.playbackRate;
        oAudio.playbackRate = (temp / 2);
    } else {
        oAudio.playbackRate -= .5;
    }
}

function handleKey(e) {
    switch (e.keyCode) {
        // Spacebar
        case 32:
            playAudio();
            e.preventDefault();
            break;
        // Left Arrow
        case 37:
            rewindAudio();
            e.preventDefault();
            break;
        // Right Arrow
        case 39:
            forwardAudio();
            e.preventDefault();
            break;
        // Up Arrow
        case 38:
            increaseVolume();
            e.preventDefault();
            break;
        // Down Arrow
        case 40:
            decreaseVolume();
            e.preventDefault();
            break;
        // r key
        case 82:
            restartAudio();
            e.preventDefault()
            break;
        // s key
        case 83:
            stopAudio();
            e.preventDefault()
            break;
        // > key
        case 190:
            increaseSpeed();
            e.preventDefault()
            break;
        // < key
        case 188:
            decreaseSpeed();
            e.preventDefault()
            break;
        default:
            console.log(e.keyCode);
            e.preventDefault();
            break;
    }

}


function initEvents() {
    var oAudio = document.getElementById('myaudio');
    var rateDisplay = document.getElementById("rate");
    var prog = document.getElementById("progress");
    var progsive = document.getElementById("progsive");
    var volbox = document.getElementById('volbox');

    // oAudio.loop = true;

    oAudio.addEventListener("ratechange", function () {
        rateDisplay.innerHTML = oAudio.playbackRate;
    }, false);

    var wasPlaying; // set this to true sometime if playing 
    var leaving = false;

    window.addEventListener("keydown", handleKey, false);
    window.addEventListener("blur", function () {
        leaving = true;
        if (wasPlaying) {
            oAudio.pause();
        }
    }, false);

    window.addEventListener("focus", function () {
        if (wasPlaying == true) {
            oAudio.play();
        }
        leaving = false;
    }, false);

    oAudio.addEventListener("play", function () {
        wasPlaying = true;
    }, false);

    oAudio.addEventListener("pause", function () {
        if (!leaving) {
            wasPlaying = false;
        }
    }, false);


    // Toggle play button text while playing/paused
    oAudio.addEventListener("playing", function () {
        document.getElementById('play').innerHTML = '<i class="glyphicon glyphicon-pause"></i>';
    }, true);
    oAudio.addEventListener("pause", function () {
        document.getElementById("play").innerHTML = '<i class="glyphicon glyphicon-play"></i>';
    }, true);


    // update progress bar
    oAudio.addEventListener("timeupdate", progressBar, true);
    oAudio.addEventListener("ended", function () {
        alert("The thing goes SKRRRAA");
    }, true);
    oAudio.addEventListener("timeupdate", volumeBar, true);
    oAudio.addEventListener("playing", volumeBar, true);
    oAudio.addEventListener("paused", volumeBar, true);
    oAudio.addEventListener("volumechange", volumeBar, true);

    volbox.addEventListener("click", function (e) {
        var oAudio = document.getElementById('myaudio');
        var volbox = document.getElementById('volbox');
        if (!e) {
            e = window.event;
        } try {
            oAudio.volume = (e.offsetY / volbox.offsetHeight)
        } catch (err) {
            catcher(err);
        }
    });

    progsive.addEventListener("click", function (e) {
        var oAudio = document.getElementById('myaudio');
        var progsive = document.getElementById('progsive');
        if (!e) {
            e = window.event;
        } try {
            oAudio.currentTime = oAudio.duration * (e.offsetX / progsive.offsetWidth)
        } catch (err) {
            catcher(err);
        }
    }, true);


}

window.addEventListener("DOMContentLoaded", initEvents, false);




function catcher(e) {
    if (window.console && console.error("Error: " + e));
}

/* 
    Todo: 
        * add slide/drag event to volume and progress
        * toggle loop
        * add JSON Playlist
*/