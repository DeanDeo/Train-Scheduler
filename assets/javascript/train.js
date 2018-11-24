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
        destination: trainDestination,
        start: trainTime,
        frequency: trainFreq,
    };

    //uploads train data to the database
    database.ref().push(newTrain);

    //logs to console
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    //clears all of the text boxes
    $("#train-name-input").val("");
    $("#place-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");

});

    //create firebase event for adding train to database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());

        //store everything into a variable
        var trainName = childSnapshot.val().train;
        var trainDestination = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().start;
        var trainFreq = childSnapshot.val().frequency;

        //employee info
        console.log(trainName);
        console.log(trainDestination);
        console.log(trainTime);
        console.log(trainFreq);

        //prettify first train time so users on different machines can view
        var empStartPretty = moment.unix(trainTime).format("HH:mm")


        //calculate when the next train will arrive
        var nextArrival = moment().diff(moment(trainTime, "X"),"HH:mm");
        console.log(nextArrival);

        //calculate how many minutes the train is away
        var minAway = nextArrival - trainTime;
        console.log(minAway);

        //creat new row

        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainFreq),
            $("<td>").text(nextArrival),
            $("<td>").text(minAway),
        );

        //append the new row to the table
        $("Train-table > tbody").append(newRow);

    });
  