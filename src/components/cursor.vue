<template>
    <div ref="cursor" v-if="showCursor" :class="{'menu-cursor':targetIsMenu}" class="cursor">
        <img src="../assets/plus.png" class="plus-icon" alt="plus icon">
    </div>
</template>

<script>
    import Worker from "worker-loader!../Worker.js";

    let worker = new Worker();

    export default {
        name: 'customCursor',

        data() {
            return {
                cursorPosition: {x: 0, y: 0},
                targetIsMenu: false,
            }
        },
        computed: {
            showCursor() {
                return this.$route.name === 'Home'
            }
        },
        methods: {
            CursorWorkerInit() {
                worker.onmessage = (event) => {
                    let {clientX, clientY} = event.data;
                    let cursorStyle = this.$refs.cursor || {};

                    document.documentElement.style.setProperty('--cursorX', clientX - (cursorStyle.clientHeight / 2) + 'px');
                    document.documentElement.style.setProperty('--cursorY', clientY - (cursorStyle.clientWidth / 2) + 'px')
                };
            },
            mouseMoveHandler() {
                self.addEventListener('mousemove', ({clientX, clientY, target}) => {
                    let targetAttr = target.attributes.data_cursor || {}

                    this.targetIsMenu = targetAttr.value === 'menu'

                    worker.postMessage({clientX, clientY})
                });
            },
        },
        mounted() {
            this.mouseMoveHandler();
            this.CursorWorkerInit()
        }
    }
</script>

<style lang="scss" scoped>
    $ease-in-out: cubic-bezier(.18, .01, .76, 1);
    $ease-out: cubic-bezier(0, 0, .01, .99);
    $ease-in: cubic-bezier(.85, .01, .85, 1);

    .cursor {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        z-index: 10;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: white;
        transition: all .3s $ease-in-out, transform .5s $ease-out;
        transform: translate(var(--cursorX), var(--cursorY));
        pointer-events: none;
        border: 1px solid white;
        opacity: 0;
        animation: fade .2s .9s $ease-in forwards;

        .plus-icon {
            width: 20px;
            opacity: 0;
        }

        &.menu-cursor {
            width: 120px;
            height: 120px;
            background-color: transparent;

            .plus-icon {
                opacity: 1;
            }
        }
    }

    @keyframes fade {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>