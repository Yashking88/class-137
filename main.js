status = "";
video = "";
object = [];

function preload()
{
    video = createVideo('video.mp4');
    video.hide();
}

function setup()
{
    canvas = createCanvas(480,380);
    canvas.center();
    video.hide();
}

function start()
{
    objectDector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting object";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed();
    video.volume(0);
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}

function draw()
{
    image(video, 0, 0, 480,380);
        if(status != "")
        {
            objectDector.detect(video, gotResult);
            for (i = 0; i < object.length; i++) {
                document.getElementById("status").innerHTML = "Status : object Detected";
                document.getElementById("number_of_objects").innerHTML = "Number of object detected are : " + object.length;

                fill("#FF0000");
                percent = floor(object[i].confidence * 100);
                text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
                noFill();
                stroke("#FF0000");
                rect(object[i].x, object[i].y, object[i].width, object[i].height); 
            }
        }
}
