<template>
    <div class="home">
        <div class="home-content">
            <div class="slider-container">
                <img class="swiper-image"
                     :alt="slide.name"
                     v-for="slide in slides"
                     :id="'slide'+slide.id"
                     :ref="`slide${slide.id}`"
                     :class="{active:activeSlideId===slide.id}"
                     :src="slide.src"
                     :key="slide.id">
            </div>
            <transition name="slide">
                <h2 v-if="!menuIsOpen" class="home-header">
                    <span :class='{active: activeSlide.id===0}' class="title">Sebo</span>
                    <span :class='{active: activeSlide.id===1}' class="title">dito</span>
                    <span class="title">&</span>
                    <span class="title">Partners</span>
                </h2>
            </transition>
        </div>
        <Menu key="menu"/>
    </div>
</template>

<script>
    import debounce from 'lodash/debounce'
    import {mapGetters} from 'vuex'
    import Menu from '@/components/Menu'

    export default {
        name: 'Home',
        data() {
            return {
                slides: [
                    {
                        id: 0,
                        src: require('../assets/dito.svg'),
                        name: 'sebo'
                    },
                    {
                        id: 1,
                        src: require('../assets/sebo.svg'),
                        name: 'dito'
                    },
                ],
                activeSlideId: 0,
                prevCursorPositionX: 0,
                cursorPosition: {x: 0, y: 0},
                slideMoveInterval: null,
                eventTimeouts: [],
                debounceMouseMove: null
            }
        },
        components: {Menu},
        computed: {
            ...mapGetters('menu', {
                menuIsOpen: 'menuIsOpen',
            }),
            activeSlide() {
                return this.slides.find((slide) => slide.id === this.activeSlideId)
            },
            inActiveSlide() {
                return this.slides.find((slide) => slide.id !== this.activeSlideId)
            },
        },
        methods: {
            slideMoveUp(slide, timeout) {
                let top = -90;
                let inActiveSlideDom = this.$refs[`slide${this.inActiveSlide.id}`][0];

                this.eventTimeouts[2] = setTimeout(() => {
                    clearInterval(this.slideMoveInterval);
                    inActiveSlideDom.style.transform = `translateY(0px)`;

                    this.slideMoveInterval = setInterval(() => {
                        top < -120 ? clearInterval(this.slideMoveInterval) : top -= .015;
                        slide.style.transform = `translateY(${top}px)`
                    }, 1)
                }, timeout)
            },
            slideAnimationHandler(slide) {
                this.activeSlideId = slide.id;
                let slideX = this.cursorPosition.x / window.innerWidth * 100;
                let slideY = this.cursorPosition.y / window.innerHeight * 100;
                const slideDom = this.$refs[`slide${slide.id}`][0];

                slideDom.animate(
                    [
                        {clipPath: `circle(0% at ${slideX}% ${slideY}%)`},
                        {clipPath: `circle(141% at ${slideX}% ${slideY}%)`}
                    ], {
                        easing: 'cubic-bezier(.63,0,.36,1)',
                        duration: 1000,
                    });

                this.slideMoveUp(slideDom, 580)
            },
            mouseMoveHandler(e) {
                const [firstSlide, secondSlide] = this.slides;

                if (this.menuIsOpen) return;
                const halfWindowWidth = window.innerWidth / 2;

                this.cursorPosition = {x: e.x, y: e.y};

                if (e.x > halfWindowWidth && this.prevCursorPositionX < halfWindowWidth) {
                    this.eventTimeouts[0] = setTimeout(() => {
                        this.slideAnimationHandler(secondSlide)
                    }, 100)
                }
                if (e.x < halfWindowWidth && this.prevCursorPositionX > halfWindowWidth) {
                    this.eventTimeouts[1] = setTimeout(() => {
                        this.slideAnimationHandler(firstSlide)
                    }, 100)
                }
                this.prevCursorPositionX = e.x
            },
            windowEventHandler() {
                this.debounceMouseMove = debounce(this.mouseMoveHandler, 400);
                document.addEventListener('mousemove', this.debounceMouseMove, false)
            }
        },
        mounted() {
            this.$nextTick(() => {
                let firsSlide = this.$refs[`slide${this.slides[0].id}`][0];
                this.windowEventHandler();
                this.slideMoveUp(firsSlide, 1030)
            })
        },
        beforeDestroy() {
            document.removeEventListener('mousemove', this.debounceMouseMove, false);
            this.eventTimeouts.forEach(timeout => {
                clearTimeout(timeout)
            })
        }
    }
</script>

<style lang="scss">
    $ease-in-out: cubic-bezier(.63, 0, .36, 1);
    $ease-in: cubic-bezier(1, 0, .53, 1.01);
    $ease-out: cubic-bezier(.47, .01, .01, 1);


    .home {
        position: absolute;
        overflow: hidden;
        width: 100%;
        height: 100vh;
        background-color: black;
        cursor: none;
        z-index: 1;
        top: 0;

        .home-content {
            position: absolute;
            width: 100%;
            height: 100%;
            top: -120px;
            display: flex;
            align-items: center;
            justify-content: center;

            .slider-container {
                top: 120px;
                position: absolute;
                height: 100%;
                width: 100%;

                .swiper-image {
                    position: absolute;
                    left: 0;
                    opacity: 0;
                    width: 100%;
                    height: 135%;
                    object-fit: cover;
                    transition: opacity .1s .6s ease, transform .1s .6s;

                    &.active {
                        opacity: 1;
                        transition: opacity .1ms .100ms ease;
                        z-index: 1;
                        animation: slideUp 0.4s 0.25s cubic-bezier(0, 0, 0, 1);
                    }
                }
            }

            .home-header {
                z-index: 2;
                top: 120px;
                color: white;
                position: relative;
                font-size: 40px;
                font-weight: lighter;
                display: flex;
                grid-gap: 5px;

                &.slide-enter-active {
                    opacity: 1;
                    transform: translateY(0);
                    transition: opacity .25s .75s $ease-out, transform .25s .75s $ease-out;
                }

                &.slide-enter {
                    opacity: 0;
                    transform: translateY(10px);
                }

                &.slide-leave-active {
                    opacity: 1;
                    transform: translateY(0);
                    transition: opacity .1s 50ms $ease-in, transform .1s 50ms $ease-in;
                }


                &.slide-leave-to {
                    transform: translateY(-10px);
                }

                .title {
                    opacity: .4;
                    transition: opacity .5s .4s $ease-in-out;


                    &.active {
                        opacity: 1;
                        transition: opacity .5s .3s $ease-in-out;
                    }
                }
            }
        }


        &.route-enter-active {
            transition: all 1070ms, opacity .4s .3s $ease-in-out;
            opacity: 1;

            .swiper-image {
                animation: slideUp 0.6s .47s cubic-bezier(0, 0, 0, 1) forwards !important;
            }

            .home-header {
                transition: all .6s .47s cubic-bezier(0, 0, 0, 1);

                .title {
                    opacity: 1;
                }
            }

        }

        &.route-enter {
            opacity: 0;

            .home-header {
                transform: translateY(-20px);
            }
        }

        &.route-leave-to, .route-leave-active {
            transition: opacity .7s $ease-in;
            opacity: 1;
        }

    }


    @keyframes slideUp {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-90px);
        }
    }
</style>