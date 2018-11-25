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

    console.log(trainName);
	console.log(trainDestination);
	console.log(trainTime);
    console.log(trainFreq);
    



            //calculate when the next train will arrive, start 1 year back to ensure it comes before current time
            var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
            console.log(trainTimeConverted);
    
            // current time
            var currentTime = moment();
            console.log("Current Time: " + moment(currentTime).format("hh:mm"));
    
            // difference between times
            var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
            console.log("Difference in time: " + diffTime);
    
            //time apart
            var tRemainder = diffTime % trainFreq;
            console.log(tRemainder)
    
            //mins until next train
            var minAway = trainFreq - tRemainder;
            console.log("Minutes until train: " + minAway);
    
            //next train
            var nextArrival = moment().add(minAway, "minutes").format("hh:mm A");
            console.log("Arrival Time: " + moment(nextArrival).format("hh:mm")); 

    //creates "temporary" object for holding train data
    var newTrain = {
        train: trainName,
        destination: trainDestination,
        start: trainTime,
        frequency: trainFreq,
        arrival: nextArrival,
        minutes: minAway,
        current: currentTime.format("hh:mm")

    };

    //uploads train data to the database
    database.ref().push(newTrain);

    //logs to console
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
    console.log(newTrain.arrival);
    console.log(newTrain.minutes);
    console.log(newTrain.current);

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
        var nextArrival = childSnapshot.val().arrival;
        var minAway = childSnapshot.val().minutes;
        var currentTime = childSnapshot.val().current;


        //train info
        console.log(trainName);
        console.log(trainDestination);
        console.log(trainTime);
        console.log(trainFreq);
        console.log(nextArrival);
        console.log(minAway);
        console.log(currentTime);


        //creat new row

        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainFreq),
            $("<td>").text(nextArrival),
            $("<td>").text(minAway)
        );

        //append the new row to the table
        $("#Train-table > tbody").append(newRow);

    });
  