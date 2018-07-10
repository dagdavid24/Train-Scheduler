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
  var firstTrainTime = 0;
  var frequency = 0;

  $("#click-button").on("click", function(event) {
    // Prevent the page from refreshing
    event.preventDefault();

    // Get inputs
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#first-train-time").val().trim();
    frequency = $("#frequency").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    // Change what is saved in firebase
    database.ref().set({
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
    });
  });

  database.ref().on("value", function(snapshot) {

    // Print the initial data to the console.
    console.log(snapshot.val());

    // Log the value of the various properties
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrainTime);
    console.log(snapshot.val().frequency);

    // Change the HTML
    $("#display-train").text(snapshot.val().trainName);
    $("#display-dest").text(snapshot.val().destination);
    $("#display-freq").text(snapshot.val().frequency);

    // If any errors are experienced, log them to console.
  //}, function(errorObject) {
    //console.log("The read failed: " + errorObject.code);
  });