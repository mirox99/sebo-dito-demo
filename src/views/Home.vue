<template>
  <div class="home">
    <img class="swiper-image"
         :alt="slide.name"
         v-for="slide in slides"
         :ref="`slide${slide.id}`"
         :class="{active:activeSlideId===slide.id}"
         :src="slide.src"
         :key="slide.id">

  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  name: 'Home',
  data() {
    return {
      slides: [
        {
          id: 0,
          src: 'https://wi-images.condecdn.net/image/jgov7eBrRvb/crop/2040/f/6-facial-recognition-hero.jpg',
          name: 'sebo'
        }, {
          id: 1,
          src: 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_946971500_417532.jpg',
          name: 'dito'
        }],
      activeSlideId: 0,
      prevCursorPositionX: 0,
      cursorPosition: {x: 0, y: 0},
      slideInterval: null,
    }
  },
  components: {},
  methods: {
    slideAnimation(e, slide) {
      clearInterval(this.slideInterval)
      let slideX, slideY, timer = 0;
      slideX = e.x / window.innerWidth * 100;
      slideY = e.y / window.innerHeight * 100;
      this.slideInterval = setInterval(() => {
        if (timer > 140) {
          clearInterval(this.slideInterval)
          this.$refs[`slide${slide.id}`][0].style.clipPath = ''
        } else {
          this.$refs[`slide${slide.id}`][0].style.clipPath = `circle(${timer}% at ${slideX}% ${slideY}%)`
        }
        timer += .7
      }, 1)
    },
    slideAnimationHandler(e, slide, side) {
      this.activeSlideId = slide.id
      this.slideAnimation(e, slide, side)
    },
    mouseMoveHandler() {
      const [firstSlide, secondSlide] = this.slides
      document.addEventListener('mousemove', debounce((e) => {
        const halfWindowWidth = window.innerWidth / 2
        this.cursorPosition = {x: e.x, y: e.y}

        if (e.x > halfWindowWidth && this.prevCursorPositionX < halfWindowWidth) {
          setTimeout(() => {
            this.slideAnimationHandler(this.cursorPosition, secondSlide, 1)
          }, 200)
        }
        if (e.x < halfWindowWidth && this.prevCursorPositionX > halfWindowWidth) {
          setTimeout(() => {
            this.slideAnimationHandler(this.cursorPosition, firstSlide
                , -1)
          }, 200)
        }
        this.prevCursorPositionX = e.x
      }, 300), false);
    },
  },
  created() {
    this.mouseMoveHandler()
  }
}
</script>

<style lang="scss" scoped>
.home {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100vh;

  .swiper-image {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity .1s 1s ease-in;

    &.active {
      opacity: 1;
      transition: opacity .1000ms .1000ms ease-in;
      z-index: 1;
    }
  }

}
</style>