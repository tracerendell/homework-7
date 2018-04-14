/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyAPLBmPlmcoXtEewQRiiUc7E7U_CXwroYI",
  authDomain: "homework-7-f16a4.firebaseapp.com",
  databaseURL: "https://homework-7-f16a4.firebaseio.com",
  storageBucket: "homework-7-f16a4.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainTime = $("#time-input").val().trim();
  var trainFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    time: trainTime,
    frequency: trainFreq
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  // Alert
  alert("New Train Successfully Scheduled");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(trainFreq);

  // Maaaaath
   var firstTimeFormatted = moment(trainTime, 'hh:mm').subtract(1, 'years');

    console.log ("first time formatted " + firstTimeFormatted);
    console.log("this is the train time: " + trainTime);
            // crete new variable storing the difference between the times?
            var timeDifference = moment().diff(moment(trainTime),'minutes');
            console.log(timeDifference);
            // store only the remainder of timeDifference divided by frequency in variable
            var remainingTime = timeDifference % trainFreq;
            console.log(remainingTime);
            //store minutes until next arrival in new variable
            var minutesUntilArrival = trainFreq - remainingTime;
            //add minutes Until arrival to current time to get New arrival time in hh:mm; store in new var
            var nextArrival = moment().add(minutesUntilArrival, "minutes").format('hh:mm');
            console.log("this is the arrival", nextArrival);
    //Dynamically append user input to table in DOM
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextArrival + "</td><td>" + minutesUntilArrival + "</td></tr>");
});



