var config = {
    apiKey: "AIzaSyBmnJMaeXYrf4ObV4Q5iiQ7nPmBihRXXgw",
    authDomain: "paris-with-love.firebaseapp.com",
    databaseURL: "https://paris-with-love.firebaseio.com",
    projectId: "Train-Scheduler",
    storageBucket: "paris-with-love.appspot.com",
    messagingSenderId: "209801458312"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "None Yet";
var destination = "None Yet";
var firstTrainTime = "dunno";
var frequency = 0;
var arrival = "03:45";



$("#click-button").on("click", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();
    
    // Get inputs
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#first-train-time").val().trim();
    frequency = $("#frequency").val().trim();
    console.log(frequency);

    //run the calculations


    var tFrequency = frequency;
    console.log(tFrequency);

    // Time is 3:30 AM
    var firstTime = firstTrainTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var arrival = moment(nextTrain).format("hh:mm")
    console.log("ARRIVAL TIME: " + arrival);

    // Change what is saved in firebase
    database.ref().set({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        arrival: arrival,
        tMinutesTillTrain: tMinutesTillTrain
    });
});

database.ref().on("value", function (snapshot) {
    // Print the initial data to the console.
    console.log(snapshot.val());

    var tFrequency = parseInt(frequency);
    console.log(tFrequency);

    // Log the value of the various properties
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrainTime);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().arrival);

    // Change the HTML
    $("#display-train").text(snapshot.val().trainName);
    $("#display-dest").text(snapshot.val().destination);
    $("#display-freq").text(snapshot.val().frequency);
    $("#display-arrive").text(snapshot.val().arrival);
    $("#display-away").text(snapshot.val().tMinutesTillTrain);
});