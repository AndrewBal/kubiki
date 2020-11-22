$(document).ready(function () {
  class Component {
    constructor(selector) {
      this.$el = document.querySelector(selector)
    }
    hide() {
      this.$el.style.display = 'none'
    }
    show() {
      this.$el.style.display = 'block'
    }
  }

  class Kubik extends Component {
    constructor(options) {
      super(options.selector)
      this.$el.style.width = this.$el.style.height = options.size + 'px'
      this.$el.style.background = options.color
      this.$el.style.left = options.left
      this.$el.style.top = options.top
    }
  }

  class Observable {
    constructor(exec) {
      this.listeners = new Set()
      exec({
        next: (value) =>
          this.listeners.forEach(({ next }) => next && next(value)),
        error: (err) =>
          this.listeners.forEach(({ error }) => error && error(err)),
        complete: () =>
          this.listeners.forEach(({ complete }) => complete && complete()),
      })
    }
    subscribe(listeners) {
      this.listeners.add(listeners)
      return { unsubscribe: () => this.listeners.delete(listeners) }
    }
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const kub1 = new Kubik({
    selector: '#kub1',
    size: getRandomIntInclusive(20, 120),
    color:
      '#' +
      (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase(),
    left: getRandomIntInclusive(80, $('.game-area').width() - 80) + 'px',
    top: getRandomIntInclusive(0, $('.game-area').height() - 80) + 'px',
  })
  const kub2 = new Kubik({
    selector: '#kub2',
    size: getRandomIntInclusive(20, 120),
    color:
      '#' +
      (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase(),
    left: getRandomIntInclusive(80, $('.game-area').width() - 80) + 'px',
    top: getRandomIntInclusive(0, $('.game-area').height() - 80) + 'px',
  })

  const kub3 = new Kubik({
    selector: '#kub3',
    size: getRandomIntInclusive(20, 120),
    color:
      '#' +
      (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase(),
    left: getRandomIntInclusive(80, $('.game-area').width() - 80) + 'px',
    top: getRandomIntInclusive(0, $('.game-area').height() - 80) + 'px',
  })

  const kub4 = new Kubik({
    selector: '#kub4',
    size: getRandomIntInclusive(20, 120),
    color:
      '#' +
      (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase(),
    left: getRandomIntInclusive(80, $('.game-area').width() - 80) + 'px',
    top: getRandomIntInclusive(0, $('.game-area').height() - 80) + 'px',
  })
  const kub5 = new Kubik({
    selector: '#kub5',
    size: getRandomIntInclusive(20, 120),
    color:
      '#' +
      (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase(),
    left: getRandomIntInclusive(80, $('.game-area').width() - 80) + 'px',
    top: getRandomIntInclusive(0, $('.game-area').height() - 80) + 'px',
  })
  const kub6 = new Kubik({
    selector: '#kub6',
    size: getRandomIntInclusive(20, 120),
    color:
      '#' +
      (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase(),
    left: getRandomIntInclusive(80, $('.game-area').width() - 80) + 'px',
    top: getRandomIntInclusive(0, $('.game-area').height() - 80) + 'px',
  })
  const kub7 = new Kubik({
    selector: '#kub6',
    size: getRandomIntInclusive(20, 120),
    color:
      '#' +
      (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase(),
    left: getRandomIntInclusive(80, $('.game-area').width() - 80) + 'px',
    top: getRandomIntInclusive(0, $('.game-area').height() - 80) + 'px',
  })
  //скываем все кубики
  function hideKub() {
    kub1.hide()
    kub2.hide()
    kub3.hide()
    kub4.hide()
    kub5.hide()
    kub6.hide()
    kub7.hide()
  }
  hideKub()
  //показываем кубики
  function genKub() {
    kub1.show()
    kub2.show()
    kub3.show()
    kub4.show()
    kub5.show()
    kub6.show()
    kub7.show()
  }

  //клик по кубику, его исчезновение и появление нового
  const kubs = document.getElementsByClassName('kub')
  let pts = 0
  Object.keys(kubs).forEach((key) => {
    $(kubs[key]).click(function (e) {
      $(this).hide()
      pts++
      document.getElementById('current_pts').innerHTML = pts
      size = getRandomIntInclusive(20, 100)

      $(this).css({
        height: size,
        width: size,
        top: getRandomIntInclusive(0, $('.game-area').height() - 80) + 'px',
        left: getRandomIntInclusive(80, $('.game-area').width() - 80) + 'px',
        'background-color':
          '#' +
          (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase(),
      })
      e.preventDefault()
    })
  })

  //сохраняем результат в localStorage
  const ul = document.querySelector('ul')
  const liMaker = (text) => {
    const li = document.createElement('li')
    li.textContent = text
    ul.appendChild(li)
  }
  let itemsArray = localStorage.getItem('items')
    ? JSON.parse(localStorage.getItem('items'))
    : []

  localStorage.setItem('items', JSON.stringify(itemsArray))
  const data = JSON.parse(localStorage.getItem('items'))
  data.forEach((item) => {
    liMaker(item)
  })

  // модальное окно в конце игры (добавление пользователя)
  $('#myModal .btn-primary').on('click', () => {
    $('#myModal').modal('hide')

    playerName = document.getElementById('player').value

    itemsArray.push(playerName + ' - ' + pts)
    localStorage.setItem('items', JSON.stringify(itemsArray))
    liMaker(playerName + ' - ' + pts)

    document.getElementById('current_time').innerHTML = 0
  })

  // новая игра (очистка поля)
  $('#new-game').on('click', () => {
    hideKub()
    document.getElementById('current_time').innerHTML = 60
    document.getElementById('current_pts').innerHTML = 0
  })

  // старт игры
  $('#start-btn').on('click', () => {
    tmr = document.getElementById('current_time').innerHTML = 60
    document.getElementById('current_pts').innerHTML = 0
    pts = 0

    function tmrF() {
      tmr--
      document.getElementById('current_time').innerHTML = tmr

      if (tmr == 0) {
        document.addEventListener('click', tmer.unsubscribe),
          document.addEventListener('click', generateKub.unsubscribe)

        $('#myModal').modal('show')
        document.getElementById('points').innerHTML = pts
      }
    }

    const interval = new Observable(({ next }) => {
      setInterval(() => next(), 1000)
    })
    const generateKub = interval.subscribe({ next: () => genKub() })
    const tmer = interval.subscribe({ next: () => tmrF() })
  })
})
