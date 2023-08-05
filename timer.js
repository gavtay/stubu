// timer.js
// Changing the start / stop button status which tracks if timer is
// running or not
document.addEventListener('DOMContentLoaded', function() {
    const hrDisplayValue = document.getElementById('hr-display');
    const minDisplayValue = document.getElementById('min-display');
    const secDisplayValue = document.getElementById('sec-display');

    const startStopStatus = document.querySelector('#start-stop-button');
    startStopStatus.addEventListener('click', toggleTimer);

    // default is running to false
    let isRunning = false;
    let intervalId, intervalId2, intervalId3;

    function toggleTimer() {
        // timer is default on pause
        
        // if the timer is running and STOP button is pressed change
        // text content to start since timer was paused
        if (isRunning) {
            clearInterval(intervalId);
            startStopStatus.textContent = 'START';
        } else {
            // if the timer is not running and the START button is
            // pressed then change text content to STOP since timer
            // was started
            let totalElapsedSeconds = ((parseInt(hrDisplayValue.textContent) * 60 * 60) + parseInt(minDisplayValue.textContent)) * 60 + parseInt(secDisplayValue.textContent);
            intervalId = setInterval(function() {
                updateTimer();
                reminderNotif(totalElapsedSeconds);
                totalElapsedSeconds++;
            }, 1000);
            startStopStatus.textContent = 'STOP';
        } 

        isRunning = !isRunning;
    }





    // Decrement time function, alert user when timer is through
    function updateTimer() {
        let hours = parseInt(hrDisplayValue.textContent);
        let minutes = parseInt(minDisplayValue.textContent);
        let seconds = parseInt(secDisplayValue.textContent);
        if (hours === 0 && minutes === 0 && seconds === 0) {
            // If timer is at 0, change pause button to start, set
            clearInterval(intervalId);
            startStopStatus.textContent = 'START';
            isRunning = false;

            // plays audio when timer appears for 10 seconds, pauses when ok is pressed
            var audioElement = document.getElementById('timer-audio');
            audioElement.play();
            
            if (confirm('Break time!')) {
                document.getElementById('timer-audio').pause();
            }
        } 
        else { 
            // else decrement timer
            if (seconds > 0) {
                seconds--;
            } 
            else if (minutes > 0) {
                minutes--;
                seconds = 59;
            } 
            else if (hours > 0) {
                hours--;
                minutes = 59;
                seconds = 59;
            }

        }

        // format integer values of time to strings
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        // decrement timer
        hrDisplayValue.textContent = formattedHours;
        minDisplayValue.textContent = formattedMinutes;
        secDisplayValue.textContent = formattedSeconds;

    }





    function reminderNotif(totalElapsedSeconds) {
        // water and posture notification implementation
        const waterInput = document.getElementById('water-input');
        const postureInput = document.getElementById('posture-input');
    
        // Get the specified notification intervals (in seconds)
        let waterIntervalSeconds = parseInt(waterInput.value) * 60;
        let postureIntervalSeconds = parseInt(postureInput.value) * 60;
    
        // Check if it's time for water notification
        if (totalElapsedSeconds > 0 && totalElapsedSeconds % waterIntervalSeconds === 0) {
            // make element visible to show drink water for x seconds
            document.getElementById('noti-audio').play();
        }
    
        // Check if it's time for posture notification
        if (totalElapsedSeconds > 0 && totalElapsedSeconds % postureIntervalSeconds === 0) {
            // make element visible to show sit up for x seconds
            document.getElementById('noti-audio').play();
        }
    }   
    
     



    // Reset timer, call the function when reset button is clicked
    const resetTimer = document.getElementById('reset-button');
    resetTimer.addEventListener('click', resetButton);

    function resetButton() {
        // grab the inputs in settings and id's of clock
        const setHr = document.getElementById('set-hr');
        const setMin = document.getElementById('set-min');
        const setSec = document.getElementById('set-sec');
        const hrDisplayVal = document.getElementById('hr-display');
        const minDisplayVal = document.getElementById('min-display');
        const secDisplayVal = document.getElementById('sec-display');

        // get value of each input or set to '00'
        const formattedHrs = setHr.value || '00';
        const formattedMin = setMin.value || '00';
        const formattedSec = setSec.value || '00';

        // Reset timer to inputted time with proper pad formatting
        hrDisplayVal.textContent = formattedHrs.padStart(2, '0');
        minDisplayVal.textContent = formattedMin.padStart(2, '0');
        secDisplayVal.textContent = formattedSec.padStart(2, '0');
    }

});




