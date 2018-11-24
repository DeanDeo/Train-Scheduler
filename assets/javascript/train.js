var config = {
    apiKey: "AIzaSyCPxvYSPcwDXS_TCfGLnTMGiGMEvm6_XUA",
    authDomain: "train-schedule-25207.firebaseapp.com",
    databaseURL: "https://train-schedule-25207.firebaseio.com",
    projectId: "train-schedule-25207",
    storageBucket: "",
    messagingSenderId: "611926972151"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  //button for adding trains
  $("#add-train-btn").on("click", function(event) {
      event.preventDefault();

    
    //grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#place-input").val().trim();
    var trainTime = $("#start-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();

    //creates "temporary" object for holding train data
    var newTrain = {
        train: trainName,
        Destination: trainDestination,
        start: trainTime,
        Frequency: trainFreq,
    };

    //uploads train data to the database
    database.ref().push(newTrain);

    //logs to console
    console.log(newTrain.trainName);
    console.log(newTrain.trainDestination);
    console.log(newTrain.trainTime);
    console.log(newTrain.trainFreq);

    
  }