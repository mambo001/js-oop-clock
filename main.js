// TODOS:
// Show standard clock formatting (00:00:01++)

class Stopwatch{
    constructor(timerTextElement, buttonsElement){
        this.timerTextElement = timerTextElement
        this.buttonsElement = buttonsElement
        this.currentTimerInterval = ''
        this.clear()
    }

    doFormatTime(timer) {
        let seconds,
            minutes,
            hours,
            formattedDate
        timer = timer * 1000
        hours = Math.floor((((timer/1000)/60)/60)%60)
        minutes = Math.floor(((timer/1000)/60)%60)
        seconds = Math.floor((timer/1000)%60)
        
        console.log(formattedDate = `${hours}:${minutes}:${seconds}:::${timer}`)
        return formattedDate = `${hours}:${minutes}:${seconds}`
    }

    doIncrementTime(currentTime) {
        let timer = currentTime || 0;
        this.currentTimerInterval = setInterval(() => {
            if (!this.isPaused){
                timer++;
                this.timerTextElement.innerText = this.doFormatTime(timer)
            }

        }, 1000)
    }

    doTogglePrimaryButtons() {
        this.buttonsElement.forEach(button => {
            button.classList.contains('primary') ? button.classList.toggle('hide') : ''
        });
    }

    doToggleSecondaryButtons() {
        this.buttonsElement.forEach(button => {
            button.classList.contains('secondary') ? button.classList.toggle('hide') : ''
        });
    }

    doResetSecondaryButtons() {
        this.buttonsElement.forEach(button => {
            if (button.classList.contains('secondary')){
                button.classList.add('hide')
            }
        });
    }

    doGetTimeDifference(startTime, endTime){
        if (Object.prototype.toString.call(startTime) !== '[object Date]' &&
            Object.prototype.toString.call(endTime) !== '[object Date]'
        ) return

        let differenceInSeconds
        let startTimeInMilliseconds = startTime.getTime()
        let endTimeInMilliseconds = endTime.getTime()

        differenceInSeconds = Math.abs(startTimeInMilliseconds - endTimeInMilliseconds);
        console.log(differenceInSeconds)
        return differenceInSeconds
    }

    start() {
        this.startTime = new Date();
        this.doIncrementTime();
        this.doTogglePrimaryButtons();
    }

    pause() {
        if (this.isPaused) return
        this.doToggleSecondaryButtons()
        this.isPaused = true
        this.endTime = new Date()
        this.doGetTimeDifference(this.startTime, this.endTime)
        // clearInterval(this.currentTimerInterval)
    }

    resume(){
        if (!this.isPaused) return
        this.isPaused = false
        this.doToggleSecondaryButtons();
        // this.doIncrementTime(this.differenceInSeconds)
    }

    stop() {
        clearInterval(this.currentTimerInterval)
        this.clear()
        this.doTogglePrimaryButtons()
        this.doResetSecondaryButtons()
    }

    clear() {
        this.startTime = ''
        this.endTime = ''
        this.isPaused = false
        this.currentTimerInterval = ''
        this.timerTextElement.innerText = '00:00:00'
    }
}

const timerTextElement = document.querySelector('.timer');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const stopButton = document.querySelector('#stop');
const resumeButton = document.querySelector('#resume');
const actionButtons = document.querySelectorAll('.actions > button');

const stopwatch = new Stopwatch(timerTextElement, actionButtons);


startButton.addEventListener('click', () => {
    stopwatch.start()
});

pauseButton.addEventListener('click', () => {
    stopwatch.pause()
});

resumeButton.addEventListener('click', () => {
    stopwatch.resume()
})

stopButton.addEventListener('click', () => {
    stopwatch.stop()
});




