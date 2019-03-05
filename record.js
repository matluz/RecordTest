//toda vez que clicar em recordButton toggleRecording() será acionada
var recorder, gumStream;
var recordButton = document.getElementById("recordButton");
var chunks = [];
recordButton.addEventListener("click", toggleRecording); 


function toggleRecording() {
  
  if (recorder && recorder.state=="recording"){
    recorder.stop();
    gumStream.getAudioTracks()[0].stop();
    
    recorder.onstop = function(e) {
        var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
        chunks = [];
        console.log(blob);
    }
  }else{
    navigator.mediaDevices.getUserMedia({audio: true}).then(function(stream) {
      gumStream = stream;
      recorder = new MediaRecorder(stream);
      recorder.ondataavailable = function(e){
        chunks.push(e.data);
        var url = URL.createObjectURL(e.data);
        console.log(url);
        var preview = document.createElement('audio');
        preview.controls = true;
        preview.src = url;
        document.body.appendChild(preview);
      };
      recorder.start();
    });
  }
}