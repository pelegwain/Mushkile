const VIDEOS_PER_ROUND = 3;
const VIDEO_LOCATION = String.raw`file://c:\code\kami-project\rotating-vid\vids`;
const VIDEOS_PER_CATEGORY = 3;
const AMOUNT_OF_CATEGORIES = 5;

function getVideoNumber(index) {
    // Videos start from 1 to VIDEOS_PER_CATEGORY
    // NOTE - temporarily, only 2 videos supported...
    return (selected_vids[index] % 2) + 1;
}

function getVideoPath(index) {
    return VIDEO_LOCATION + "\\" + index + "-" + getVideoNumber(index) + ".mp4";
}

function resetSelectedVids() {
    // Random: See https://www.w3schools.com/js/js_random.asp
    for (let index = 0; index < selected_vids.length; index++) {
        selected_vids[index] = Math.floor(Math.random() * VIDEOS_PER_CATEGORY);
    }
}

function toggleDivDisplay(div_id, hidden = true) {
    document.getElementById(div_id).style.display = hidden ? "none" : "block";
}

function setupVideos() {
    resetSelectedVids();
    for (let vid_index = 0; vid_index < AMOUNT_OF_CATEGORIES; vid_index++) {
        toggleDivDisplay("vid"+vid_index, hidden=true);
        let vid = document.getElementById("vid"+vid_index);
        let selected_video = getVideoPath(vid_index);
        console.log("index is " + vid_index)
        console.log("setting video from path " + selected_video);
        vid.src = selected_video;
        vid.onended = onVideoEnds;
        vid.preload = "auto";
    }
}

function onVideoEnds(event) {
    index = event.srcElement.id[3];
    console.log('video ' + index + ' ended.');
    toggleDivDisplay("vid"+index, hidden=true);
    index++;
    if (index < AMOUNT_OF_CATEGORIES) {
        toggleDivDisplay("vid"+index, hidden=false);
        document.getElementById("vid"+index).play();
    } else {
        console.log("done");
    }
}

function mainVideo() {
    console.log("main started");
    // set all vids
    // add listener on stop to hide and show next
    // preload all vids
    // show first
    toggleDivDisplay('vid0', hidden=false);
    video = document.getElementById('vid0');
    video.muted = false;
    video.play();
}

function stopVideo() {
    var video = document.getElementById("vid1")
    video.pause();
    video.currentTime = 0;
}

let selected_vids = [0, 0, 0, 0, 0];
//toggleDivDisplay("vid", true);
setupVideos();
mainVideo();
