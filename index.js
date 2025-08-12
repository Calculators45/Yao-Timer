var TotalHours = 0;
var TotalMinutes = 0;
var TotalSeconds = 0;

const Hours = document.getElementById('Hours');
const Minutes = document.getElementById('Minutes');
const Seconds = document.getElementById('Seconds');

Seconds.innerHTML = `00`;

// const AddHours = document.getElementById('AddHours');
// const MinusHours = document.getElementById('MinusHours');

// const AddMinutes = document.getElementById('AddMinutes');
// const MinusMinutes = document.getElementById('MinusMinutes');

// const AddSeconds = document.getElementById('AddSeconds');
// const MinusSeconds = document.getElementById('MinusSeconds');

const StartButton = document.getElementById('StartTimer');

// Function to add an hour
function Add_Hours() {
    TotalHours++;

    if (TotalHours < 10) {
        Hours.innerHTML = '0' + TotalHours;
    } else {
        Hours.innerHTML = TotalHours;
    }
}

// Function to subtract an hour
function Minus_Hours() {
    if (TotalHours > 0) {
        TotalHours--;  // Subtract one hour only if it's greater than 0
    }

    if (TotalHours < 10) {
        Hours.innerHTML = '0' + TotalHours;
    } else {
        Hours.innerHTML = TotalHours;
    }
}

// Function to add minutes and handle minute overflow
function Add_Minutes() {
    TotalMinutes++;

    if (TotalMinutes > 59) {
        TotalMinutes = 0;
        Add_Hours();  // Automatically increment hours if minutes overflow
    }

    if (TotalMinutes < 10) {
        Minutes.innerHTML = '0' + TotalMinutes;
    } else {
        Minutes.innerHTML = TotalMinutes;
    }
}

// Function to subtract minutes and handle minute underflow
function Minus_Minutes() {
    if (TotalMinutes > 0) {
        TotalMinutes--;
    } else if (TotalHours > 0) {
        TotalMinutes = 59;
        Minus_Hours();  // Automatically decrement hours if minutes underflow
    }

    if (TotalMinutes < 10) {
        Minutes.innerHTML = '0' + TotalMinutes;
    } else {
        Minutes.innerHTML = TotalMinutes;
    }
}

// Function to add seconds and handle second overflow
function Add_Seconds() {
    TotalSeconds++;

    if (TotalSeconds > 59) {
        TotalSeconds = 0;
        Add_Minutes();  // Automatically increment minutes if seconds overflow
    }

    if (TotalSeconds < 10) {
        Seconds.innerHTML = '0' + TotalSeconds;
    } else {
        Seconds.innerHTML = TotalSeconds;
    }
}

// Function to subtract seconds and handle second underflow
function Minus_Seconds() {
    if (TotalSeconds > 0) {
        TotalSeconds--;
    } else if (TotalMinutes > 0) {
        TotalSeconds = 59;
        Minus_Minutes();  // Automatically decrement minutes if seconds underflow
    }

    if (TotalSeconds < 10) {
        Seconds.innerHTML = '0' + TotalSeconds;
    } else {
        Seconds.innerHTML = TotalSeconds;
    }
}

// Function to clear the timer
function ClearTimer() {
    TotalHours = 0;
    TotalMinutes = 0;
    TotalSeconds = 0;

    Hours.innerHTML = '00';
    Minutes.innerHTML = '00';
    Seconds.innerHTML = '00';
}












let timerInterval;
let isRunning = false; // To keep track of the timer state (running or paused)

function Start_Timer() {
    // Store the initial time settings so they can be reset later
    var Set_Hours = TotalHours;
    var Set_Minutes = TotalMinutes;
    var Set_Seconds = TotalSeconds;

    // Check if the timer is running or paused
    if (!isRunning) {
        // Start the countdown timer
        isRunning = true;
        StartButton.innerHTML = `<button id="StartTimer" onclick="Pause_Timer()"><i class="fa-solid fa-pause"></i></button>`;

        // Start the interval for countdown
        timerInterval = setInterval(() => {
            CountDown();
        }, 1000);
    } else {
        // If the timer is already running, we should pause it
        Pause_Timer();
    }

    // Store the initial time so it can be reset when paused
    function Pause_Timer() {
        clearInterval(timerInterval); // Stop the countdown
        isRunning = false;

        // Update the button to show play icon, so user can resume
        StartButton.innerHTML = `<button id="StartTimer" onclick="Start_Timer()"><i class="fa-solid fa-play"></i></button>`;

        // Reset the time to the last set time when paused
        TotalHours = Set_Hours;
        TotalMinutes = Set_Minutes;
        TotalSeconds = Set_Seconds;

        // Update the display to reflect the paused time
        Hours.innerHTML = TotalHours < 10 ? `0${TotalHours}` : TotalHours;
        Minutes.innerHTML = TotalMinutes < 10 ? `0${TotalMinutes}` : TotalMinutes;
        Seconds.innerHTML = TotalSeconds < 10 ? `0${TotalSeconds}` : TotalSeconds;
    }
}

function CountDown() {
    TotalSeconds--;

    // Check if seconds have gone below 0
    if (TotalSeconds < 0) {
        TotalSeconds = 59;  // Reset seconds to 59
        TotalMinutes--;     // Decrease minute by 1

        // If minutes are below 0, reset them and decrease the hours
        if (TotalMinutes < 0) {
            TotalMinutes = 59;  // Reset minutes to 59
            TotalHours--;       // Decrease hour by 1

            // If hours are below 0, stop the countdown and show a message
            if (TotalHours < 0) {
                clearInterval(timerInterval); // Stop the countdown
                console.log('Time is up! ⏰'); // Or display this in the UI instead of logging
                
let alarm = document.getElementById('Alarm');

if (alarm) {
    alarm.play();
} else {
    console.log("No alarm element found.");
}


Notification.requestPermission().then(Permission => {
    if (Permission === "granted") {
        new Notification("You're time is up!");
    }
});

StartButton.innerHTML = `<button id="StartTimer" onclick="Start_Timer()"><i class="fa-solid fa-play"></i></button>`;
                return;
            }
        }
    }

    // Update the UI with the new time values
    Hours.innerHTML = TotalHours < 10 ? `0${TotalHours}` : TotalHours;
    Minutes.innerHTML = TotalMinutes < 10 ? `0${TotalMinutes}` : TotalMinutes;
    Seconds.innerHTML = TotalSeconds < 10 ? `0${TotalSeconds}` : TotalSeconds;
}
