<template>
    <div ref="cursor" :class="{'show':showCursor,'menu-is-open':menuIsOpen}" class="cursor-container">
        <div class="circle-cursor circle-cursor--inner"></div>
        <div class="circle-cursor circle-cursor--outer">
            <img v-show="menuIsOpen" src="../assets/plus.png" class="plus-icon" alt="plus icon">
        </div>
    </div>
</template>

<script>
    import Cursor from '@/Cursor'
    import {mapGetters} from 'vuex'

    export default {
        name: 'customCursor',

        data() {
            return {
                cursorTimeOut: null,
            }
        },
        computed: {
            ...mapGetters('menu', {
                menuIsOpen: 'menuIsOpen',
            }),
            showCursor() {
                return this.$route.name !== 'Home'
            },
        },
        methods: {
            initCursor() {
                this.$nextTick(() => {
                    setTimeout(() => {
                        new Cursor(this)
                    }, 100)
                })
            }
        },
        mounted() {
            setTimeout(() => {
                this.$nextTick(() => {
                    this.initCursor()
                })
            }, 1500)
        },
        beforeDestroy() {
            clearTimeout(this.cursorTimeOut)
        }
    }
</script>

<style lang="scss" scoped>
    $ease-in-out: cubic-bezier(.18, .01, .76, 1);
    $ease-out: cubic-bezier(0, 0, .01, .99);
    $ease-in: cubic-bezier(.85, .01, .85, 1);

    .cursor-container {
        position: absolute;

        &.show {
            .circle-cursor {
                background: transparent;
            }
        }

        &.menu-is-open {
            .circle-cursor {
                border: 1px solid white;
            }
        }

        .circle-cursor {
            position: fixed;
            left: 0;
            top: 0;
            pointer-events: none;
            border-radius: 50%;
            transition: all .3s $ease-in-out, transform .7s $ease-out;
            background: white;
        }

        .circle-cursor--outer {
            width: 30px;
            height: 30px;
            z-index: 9;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .circle-cursor--inner {
            width: 5px;
            height: 5px;
            left: -2.5px;
            top: -2.5px;
            z-index: 8;
            opacity: 0;
            background: transparent;
        }

        .plus-icon {
            width: 20px;
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