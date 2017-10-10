var playlist = [
    {
        name: "Pt. 2",
        by: "Kanye West",
        src: "03 Pt. 2.mp3"
    },
    {
        name: "Man's Not Hot",
        by: "Big Shaq",
        src: "mans-not-hot.mp3"
    }, {
        name: "Mercy",
        by: "Darko Vibes",
        src: "Mercy (Prod.by Vacs).mp3"
    }
];


var currentFile = 0;
var volChg = .02;

function progressBar() {
    var oAudio = document.getElementById('myaudio');
    var elapsedTime = Math.round(oAudio.currentTime);
    var prog = document.getElementById("progress");
    var pWidth = (elapsedTime / oAudio.duration) * 100;
    prog.style.width = pWidth + "%"
    var elapsedShow = document.getElementById('elapsed');
    var hourstr = 0,
        minutestr = 0, secondstr = 0, durh = 0, durm = 0, durs = 0;

    durs = Math.floor(oAudio.duration % 60);
    durs = Number(durs) < 10 ? "0" + durs : durs;
    durm = Math.floor((oAudio.duration / 60) % 60);
    durm = Math.floor(durm) < 10 ? "0" + durm : durm;

    if (Math.round((oAudio.currentTime / 60) % 59) < 10) {
        minutestr = `0${Math.floor((oAudio.currentTime / 60) % 60)}`;
    } else minutestr = Math.floor((oAudio.currentTime / 60) % 60)

    // Build second string
    if (Math.round(oAudio.currentTime % 60) < 10) {
        secondstr = `0${Math.round(oAudio.currentTime % 60)}`
    } else if ((oAudio.currentTime % 60) > 59) {
        secondstr = "00";
    } else secondstr = Math.round(oAudio.currentTime % 60)
    elapsedShow.innerHTML = `${minutestr}:${secondstr}`;
    document.getElementById('duration').innerHTML = `${durm}:${durs}`;

}
function volumeBar() {
    var oAudio = document.getElementById('myaudio');
    var disVol = document.getElementById('volume');
    var volbar = document.getElementById('volbar');
    var currVol = Math.round(oAudio.volume * 100) + "%";
    volbar.style.height = currVol;
    disVol.innerHTML = currVol;

}

function playAudio() {
    // Check for audio element support
    if (window.HTMLAudioElement) {
        try {
            var oAudio = document.getElementById('myaudio');
            var btn = document.getElementById('play');
            var audioUrl = document.getElementById('audiofile');

            // Skip Load if current file hasn't changed
            if (audioUrl.value !== playlist[currentFile].name) {
                oAudio.src = playlist[currentFile].src;
                document.getElementsByClassName('playlist-item')[currentFile].classList.add('active');
                document.getElementById('by').innerHTML = playlist[currentFile].by;
                audioUrl.value = playlist[currentFile].name;
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
    if (window.HTMLAudioElement) {
        try {
            var oAudio = document.getElementById('myaudio');
            if (oAudio.playbackRate < 1) {
                oAudio.playbackRate *= 2;
            } else
                oAudio.playbackRate += .5;
        } catch (e) {
            catcher(e);
        }
    }
}

function decreaseSpeed() {
    var oAudio = document.getElementById('myaudio');
    if (window.HTMLAudioElement) {
        try {
            if (oAudio.playbackRate <= 1) {
                var temp = oAudio.playbackRate;
                oAudio.playbackRate = (temp / 2);
            } else {
                oAudio.playbackRate -= .5;
            }
        } catch (e) {
            catcher(e)
        }
    }
}
function nextSong() {
    var oAudio = document.getElementById('myaudio');
    if (window.HTMLAudioElement) {
        try {
            if (currentFile >= 0 && currentFile < playlist.length - 1) {
                document.getElementsByClassName('playlist-item')[currentFile].classList.remove('active');
                currentFile += 1;
                playAudio();
            } else {
                alert("End of playlist!");
            }
        } catch (e) {
            catcher(e);
        }
    }
}
function previousSong() {
    var oAudio = document.getElementById('myaudio');
    if (window.HTMLAudioElement) {
        try {
            if (currentFile > 0) {
                document.getElementsByClassName('playlist-item')[currentFile].classList.remove('active');
                currentFile -= 1;
                playAudio();
            } else {
                restartAudio();
            }
        } catch (e) {
            catcher(e);
        }
    }
}
function handleKey(e) {
    if (!e) {
        e = window.event;
    }
    try {
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
            // n key
            case 78:
                nextSong();
                e.preventDefault();
                break;
            // p key
            case 80:
                previousSong();
                e.preventDefault();
                break;
            default:
                console.log(e.keyCode);
                e.preventDefault();
                break;
        }
    } catch (err) {
        catcher(err);
    }
}


function initEvents() {
    showPlaylist();
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
        volumeBar();
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
        document.getElementsByClassName('playlist-item')[currentFile].classList.remove('active');
        if (currentFile >= 0 && currentFile < playlist.length - 1) {
            currentFile += 1;
            playAudio();
        } else {
            alert("Source code available at: https://github.com/Kowus/html5-audio-player.git");
        }
    }, true);

    oAudio.addEventListener("volumechange", volumeBar, true);

    volbox.addEventListener("input", function (e) {
        var oAudio = document.getElementById('myaudio');
        var volbox = document.getElementById('volbox');
        if (!e) {
            e = window.event;
        } try {
            oAudio.volume = (e.offsetY / volbox.offsetHeight)
        } catch (err) {
            catcher(err);
        }
    }, false);

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
    }, false);

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

    [].forEach.call(document.getElementsByClassName('playlist-item'), function (el) {
        el.addEventListener('click', function (e) {
            if (!e) {
                e = window.event;
            } try {
                var selected = Number(el.innerHTML.split('.')[0]) - 1;
                if (selected !== currentFile) {
                    document.getElementsByClassName('playlist-item')[currentFile].classList.remove('active');
                    el.classList.add('active');
                    currentFile = selected;
                    playAudio();
                }
            } catch (err) {
                catcher(err);
            }
        })
    })

}

window.addEventListener("DOMContentLoaded", initEvents, false);




function catcher(e) {
    if (window.console && console.error("Error: " + e));
}


function showPlaylist() {
    var theParent = document.getElementById('playlist');
    playlist.forEach((item, index, array) => {
        var kid = document.createElement("li");
        kid.classList.add('list-group-item');
        kid.classList.add('playlist-item');
        kid.innerHTML = `${index + 1}. ${item.name} by ${item.by}`;
        theParent.appendChild(kid);
    });
}

/* 
    Todo: 
        * add slide/drag event to volume and progress
        * toggle loop
        * add JSON Playlist [done]
        * switch to track on click [done]
*/