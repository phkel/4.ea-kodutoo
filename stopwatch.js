function Stopwatch (elem) {
  var time = 0
  var offset
  var interval

  function update () {
    if (this.isOn) {
      time += delta()
    }

    if (elem) {
      elem.textContent = timeFormatter(time)
    }
  }

  function delta () {
    var now = Date.now()
    var timePassed = now - offset

    offset = now

    return timePassed
  }

  function save (activity) {
    let t = Number(time) + Number(localStorage.getItem(activity))
    console.log(activity)
    localStorage.setItem(activity, t)
  }

  function timeFormatter (time) {
    time = new Date(time)

    var minutes = time.getMinutes().toString()
    var seconds = time.getSeconds().toString()
    var milliseconds = time.getMilliseconds().toString()

    if (minutes.length < 2) {
      minutes = '0' + minutes
    }

    if (seconds.length < 2) {
      seconds = '0' + seconds
    }

    while (milliseconds.length < 3) {
      milliseconds = '0' + milliseconds
    }

    return minutes + ' : ' + seconds + ' . ' + milliseconds
  }

  this.start = function () {
    interval = setInterval(update.bind(this), 10)
    offset = Date.now()
    this.isOn = true
  }

  this.stop = function (activity) {
    if (!elem && activity) {
      save(activity)
    }
    clearInterval(interval)
    interval = null
    this.isOn = false
  }

  this.isOn = false
}
