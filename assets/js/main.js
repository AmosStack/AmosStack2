/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Light / Dark theme toggle
   */
  const themeToggle = select('#theme-toggle')
  const themeStorageKey = 'portfolio-theme'

  const updateThemeToggleUi = (isDarkMode) => {
    if (!themeToggle) {
      return
    }

    const icon = themeToggle.querySelector('i')
    const label = themeToggle.querySelector('span')

    if (icon) {
      icon.className = isDarkMode ? 'bx bx-sun' : 'bx bx-moon'
    }

    if (label) {
      label.textContent = isDarkMode ? 'Light mode' : 'Dark mode'
    }

    themeToggle.setAttribute('aria-label', isDarkMode ? 'Switch to light mode' : 'Switch to dark mode')
  }

  const applyTheme = (theme) => {
    const isDarkMode = theme === 'dark'
    document.body.classList.toggle('dark-mode', isDarkMode)
    document.body.classList.toggle('light-mode', !isDarkMode)
    updateThemeToggleUi(isDarkMode)
  }

  const savedTheme = localStorage.getItem(themeStorageKey)
  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  applyTheme(savedTheme || preferredTheme)

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isCurrentlyDark = document.body.classList.contains('dark-mode')
      const nextTheme = isCurrentlyDark ? 'light' : 'dark'
      applyTheme(nextTheme)
      localStorage.setItem(themeStorageKey, nextTheme)
    })
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Hero animated nodes network
   */
  const initHeroNetwork = () => {
    const canvas = select('#hero-network')

    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let points = []
    let animationFrame = null

    const createPoints = (count) => {
      points = Array.from({ length: count }, () => {
        const speed = 0.35 + Math.random() * 0.45
        const direction = Math.random() * Math.PI * 2

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(direction) * speed,
          vy: Math.sin(direction) * speed,
          radius: 1 + Math.random() * 1.8
        }
      })
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.max(35, Math.min(90, Math.floor((width * height) / 18000)))
      createPoints(count)
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)

      points.forEach((point, index) => {
        point.x += point.vx
        point.y += point.vy

        if (point.x <= 0 || point.x >= width) {
          point.vx *= -1
        }
        if (point.y <= 0 || point.y >= height) {
          point.vy *= -1
        }

        context.beginPath()
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        context.fillStyle = 'rgba(191, 219, 254, 0.9)'
        context.fill()

        for (let nextIndex = index + 1; nextIndex < points.length; nextIndex++) {
          const nextPoint = points[nextIndex]
          const distanceX = point.x - nextPoint.x
          const distanceY = point.y - nextPoint.y
          const distance = Math.hypot(distanceX, distanceY)

          if (distance < 125) {
            const opacity = 1 - distance / 125
            context.beginPath()
            context.moveTo(point.x, point.y)
            context.lineTo(nextPoint.x, nextPoint.y)
            context.strokeStyle = `rgba(147, 197, 253, ${opacity * 0.45})`
            context.lineWidth = 1
            context.stroke()
          }
        }
      })

      animationFrame = requestAnimationFrame(draw)
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrame)
      } else {
        cancelAnimationFrame(animationFrame)
        animationFrame = requestAnimationFrame(draw)
      }
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibilityChange)
  }

  window.addEventListener('load', initHeroNetwork)

  /**
   * Skills orbit movement
   */
  const initSkillsOrbit = () => {
    const orbit = select('.skills-orbit')
    if (!orbit) {
      return
    }

    const nodes = [...orbit.querySelectorAll('.skill-node')]
    if (!nodes.length) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let items = []
    let frameId = null
    let orbitWidth = 0
    let orbitHeight = 0

    const randomBetween = (min, max) => min + Math.random() * (max - min)

    const applyPosition = (item) => {
      item.element.style.setProperty('--x', `${item.x}px`)
      item.element.style.setProperty('--y', `${item.y}px`)
    }

    const intersects = (first, second) => {
      return !(
        first.x + first.width < second.x ||
        first.x > second.x + second.width ||
        first.y + first.height < second.y ||
        first.y > second.y + second.height
      )
    }

    const createItem = (element) => {
      const angle = Math.random() * Math.PI * 2
      const speed = randomBetween(0.35, 0.7)
      const width = element.offsetWidth
      const height = element.offsetHeight

      return {
        element,
        width,
        height,
        x: 0,
        y: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed
      }
    }

    const placeItems = () => {
      items.forEach((item, index) => {
        let attempts = 0
        let placed = false

        while (!placed && attempts < 160) {
          item.x = randomBetween(0, Math.max(orbitWidth - item.width, 1))
          item.y = randomBetween(0, Math.max(orbitHeight - item.height, 1))
          placed = items.slice(0, index).every((otherItem) => !intersects(item, otherItem))
          attempts += 1
        }

        if (!placed) {
          item.x = Math.max((orbitWidth - item.width) / 2 + randomBetween(-24, 24), 0)
          item.y = Math.max((orbitHeight - item.height) / 2 + randomBetween(-24, 24), 0)
        }

        applyPosition(item)
      })
    }

    const resize = () => {
      orbitWidth = orbit.clientWidth
      orbitHeight = orbit.clientHeight
      items = nodes.map((node) => createItem(node))
      placeItems()
    }

    const keepInBounds = (item) => {
      if (item.x <= 0) {
        item.x = 0
        item.vx = Math.abs(item.vx)
      }

      if (item.x + item.width >= orbitWidth) {
        item.x = Math.max(orbitWidth - item.width, 0)
        item.vx = -Math.abs(item.vx)
      }

      if (item.y <= 0) {
        item.y = 0
        item.vy = Math.abs(item.vy)
      }

      if (item.y + item.height >= orbitHeight) {
        item.y = Math.max(orbitHeight - item.height, 0)
        item.vy = -Math.abs(item.vy)
      }
    }

    const resolveCollision = (first, second) => {
      const firstCenterX = first.x + first.width / 2
      const firstCenterY = first.y + first.height / 2
      const secondCenterX = second.x + second.width / 2
      const secondCenterY = second.y + second.height / 2

      let deltaX = secondCenterX - firstCenterX
      let deltaY = secondCenterY - firstCenterY
      const distance = Math.hypot(deltaX, deltaY) || 1
      const firstRadius = Math.max(first.width, first.height) / 2
      const secondRadius = Math.max(second.width, second.height) / 2
      const minDistance = firstRadius + secondRadius

      if (distance >= minDistance) {
        return
      }

      deltaX /= distance
      deltaY /= distance

      const overlap = minDistance - distance
      first.x -= deltaX * overlap * 0.5
      first.y -= deltaY * overlap * 0.5
      second.x += deltaX * overlap * 0.5
      second.y += deltaY * overlap * 0.5

      const firstNormalVelocity = first.vx * deltaX + first.vy * deltaY
      const secondNormalVelocity = second.vx * deltaX + second.vy * deltaY
      const firstTangentX = first.vx - firstNormalVelocity * deltaX
      const firstTangentY = first.vy - firstNormalVelocity * deltaY
      const secondTangentX = second.vx - secondNormalVelocity * deltaX
      const secondTangentY = second.vy - secondNormalVelocity * deltaY

      first.vx = firstTangentX + secondNormalVelocity * deltaX
      first.vy = firstTangentY + secondNormalVelocity * deltaY
      second.vx = secondTangentX + firstNormalVelocity * deltaX
      second.vy = secondTangentY + firstNormalVelocity * deltaY

      keepInBounds(first)
      keepInBounds(second)
    }

    const tick = () => {
      items.forEach((item) => {
        item.x += item.vx
        item.y += item.vy
        keepInBounds(item)
      })

      for (let index = 0; index < items.length; index += 1) {
        for (let nextIndex = index + 1; nextIndex < items.length; nextIndex += 1) {
          resolveCollision(items[index], items[nextIndex])
        }
      }

      items.forEach((item) => applyPosition(item))
      frameId = window.requestAnimationFrame(tick)
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frameId)
        frameId = null
      } else if (!prefersReducedMotion && !frameId) {
        frameId = window.requestAnimationFrame(tick)
      }
    }

    resize()

    if (!prefersReducedMotion) {
      frameId = window.requestAnimationFrame(tick)
      document.addEventListener('visibilitychange', handleVisibilityChange)
      window.addEventListener('resize', resize)
    }
  }

  window.addEventListener('load', initSkillsOrbit)

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()