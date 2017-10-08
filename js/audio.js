var currentFile = "";



function progressBar() {
    var oAudio = document.getElementById('myaudio');
    var elapsedTime = Math.round(oAudio.currentTime);



    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        ctx.fillStyle = "rgb(255, 0, 0)";
        var fWidth = (elapsedTime / oAudio.duration) * canvas.clientWidth;
        if (fWidth > 0) {
            ctx.fillRect(0, 0, fWidth, canvas.clientHeight);
        }
    }

}
function volumeBar() {
    var oAudio = document.getElementById('myaudio');
    console.log(oAudio.volume);
    var canvas2 = document.getElementById("canvas2");
    if (canvas2.getContext) {
        var ctx2 = canvas2.getContext('2d');
        ctx2.clearRect(0, 0, canvas2.clientWidth, canvas2.clientHeight);
        ctx2.fillStyle = "rgb(200, 10, 84)";
        var vol = (oAudio.volume / 1) * canvas2.clientHeight;
        if (vol > 0) {
            ctx2.fillRect(0, 0, canvas2.clientWidth, vol);
        }
    }
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
                btn.textContent = "Pause";
            }
            else {
                oAudio.pause();
                btn.textContent = "Play"
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
            var audio = document.getElementById('myaudio');
            oAudio.currentTime -= 30.0;
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
            oAudio.currentTime += 30.0;
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
        } catch (e) {
            catcher(e);
        }
    }
}


function initEvents() {
    var canvas = document.getElementById('canvas');
    var oAudio = document.getElementById('myaudio');
    var canvas2 = document.getElementById('canvas2');

    // Toggle play button text while playing/paused
    oAudio.addEventListener("playing", function () {
        document.getElementById('play').textContent = "Pause";
    }, true);
    oAudio.addEventListener("pause", function () {
        document.getElementById("play").textContent = "Play";
    }, true);


    // update progress bar
    oAudio.addEventListener("timeupdate", progressBar, true);

    oAudio.addEventListener("timeupdate", volumeBar, true);
    oAudio.addEventListener("playing", volumeBar, true);
    oAudio.addEventListener("paused", volumeBar, true);
    oAudio.addEventListener("volumechange", volumeBar, true);
    canvas2.addEventListener("click", function (e) {
        var oAudio = document.getElementById('myaudio');
        var canvas2 = document.getElementById('canvas2');

        if (!e) {
            e = window.event;
        } try {
            oAudio.volume = (e.offsetY / canvas2.clientHeight);
        } catch (err) {
            catcher(err);
        }
    })
    // control audio on mouse click
    canvas.addEventListener("click", function (e) {
        var oAudio = document.getElementById('myaudio');
        var canvas = document.getElementById('canvas');

        if (!e) {
            e = window.event;
        } try {
            // Get current time based on position of mouse in the canvas box
            oAudio.currentTime = oAudio.duration * (e.offsetX / canvas.clientWidth);
        } catch (err) {
            catcher(err);
        }
    }, true);


}

window.addEventListener("DOMContentLoaded", initEvents, false);




function catcher(e) {
    if (window.console && console.error("Error: " + e));
}
