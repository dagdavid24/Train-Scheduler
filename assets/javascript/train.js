var config = {
    apiKey: "AIzaSyBmnJMaeXYrf4ObV4Q5iiQ7nPmBihRXXgw",
    authDomain: "paris-with-love.firebaseapp.com",
    databaseURL: "https://paris-with-love.firebaseio.com",
    projectId: "paris-with-love",
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

    // For user to put in all details
    if (trainName == "" || destination == "" || firstTime == "" || frequency == "" ) {
        alert('Please fill in all the boxes.');
        return false;
    }

    //run the calculations
    // First Train Departure
    var firstTime = firstTrainTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var remainder = diffTime % frequency;
    console.log(remainder);

    // Minute Until Train
    var minutes = frequency - remainder;
    console.log("MINUTES TILL TRAIN: " + minutes);

    // Next Train
    var arrival = moment().add(minutes, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + arrival);

    // Change what is saved in firebase
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        arrival: arrival,
        minutes: minutes
    });
});

database.ref().on("value", function (snapshot) {
    // Print the initial data to the console.
    console.log(snapshot.val());

    // Log the value of the various properties
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrainTime);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().arrival);
    console.log(snapshot.val().minutes);

    // append the trains and change html
    $("#table").append("<tr class='table-light'><td>" + snapshot.val().trainName + "</td>" + 
    "<td>" + snapshot.val().destination + "</td>" + "<td>" + snapshot.val().frequency + "</td>" 
    + "<td>" + snapshot.val().arrival + "</td>" + "<td>" + snapshot.val().minutes + "</td></tr>");

});