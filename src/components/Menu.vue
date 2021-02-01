<template>
    <div :class="{active: menuIsOpen,black:whiteBlank}" class="menu">
        <div @click="toggleMenu" class="icon-container">
            <img v-show="whiteBlank" src="../assets/search.svg" class="search" alt="search-icon">
            <div class="burger-icon">
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="cross">
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
        <transition name="slide">
            <div v-if="menuIsOpen" :style="{background:hoverColor}" data_cursor="menu" class="content">
                <ul class="menu-list" data_cursor="menu">
                    <li @mouseover="listItemMouseHover(item)" v-for="item in menuList"
                        :key="item.id"
                        data_cursor="menu"
                        class="list-item">
                        <div data_cursor="menu" @click="routePush(item.to)">
                            <span data_cursor="menu" class="title">{{ item.title }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'Menu',
        data() {
            return {
                menuList: [
                    {title: 'Home', color: 'rgba(0, 49, 106, 0.61)', id: 1, to: '/'},
                    {title: 'About', color: 'rgba(106, 0, 71, 0.61)', id: 2, to: ''},
                    {title: 'projects', color: 'rgba(106, 0, 71, 0.61)', id: 3, to: '/projects'},
                    {title: 'Contacts', color: 'rgba(106, 0, 71, 0.61)', id: 4, to: ''},
                ],
                hoverColor: 'rgba(106, 0, 71, 0.61)',
            }
        },
        computed: {
            ...mapGetters('menu', {
                menuIsOpen: 'menuIsOpen',
            }),
            whiteBlank() {
                return this.$route.name !== 'Home'
            }
        },
        methods: {
            ...mapActions('menu', {
                toggleMenuHandler: 'toggleMenu',
            }),
            toggleMenu() {
                if (this.menuIsOpen) this.hoverColor = 'rgba(106, 0, 71, 0.61)'
                this.toggleMenuHandler()
            },
            listItemMouseHover(item) {
                this.hoverColor = item.color
            },
            routePush(path) {
                this.toggleMenu();
                this.$router.push({path: path}).then(e => console.log(e))
            }
        }
    }
</script>

<style lang="scss" scoped>
    $ease-out: cubic-bezier(0, .01, 0, 1.01);
    $ease-in: cubic-bezier(.85, .01, .85, 1);
    $ease-in-out: cubic-bezier(.63, 0, .36, 1);

    .menu {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        background-color: transparent;
        pointer-events: none;

        &.active {
            pointer-events: auto;

            .icon-container {
                .burger-icon {
                    .hamburger {
                        span {
                            width: 0;
                            transition: .1ms 0s !important;
                        }
                    }

                    .cross {
                        span {
                            &:nth-child(1) {
                                height: 100%;
                                transition-delay: .325s;

                            }
                        }

                        span {
                            &:nth-child(2) {
                                width: 100%;
                                transition-delay: .125s;
                            }
                        }
                    }
                }
            }
        }

        &.black {
            .icon-container {
                animation: slideLeft .7s .7s $ease-out;
                background: black;

                .search {
                    animation: bounce .3s 1.2s $ease-out;
                }
            }
        }

        .icon-container {
            position: absolute;
            top: 50%;
            left: 0;
            pointer-events: auto;
            width: 80px;
            z-index: 3;
            transform: translateY(-50%);
            display: flex;
            justify-content: space-between;
            padding: 15px 10px 15px 15px;

            span {
                display: block;
                background: white;
                transition: all .3s cubic-bezier(0, .01, .55, .99);

            }

            .search {
                width: 20px;
            }

            .burger-icon {
                position: relative;
                width: 25px;
                height: 25px;

                .hamburger {
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    grid-gap: 8px;

                    span {
                        width: 25px;
                        height: 2px;
                        position: relative;

                        &:nth-child(1) {
                            transition-delay: .6s;
                        }

                        &:nth-child(2) {
                            transition-delay: .5s;
                        }

                        &:nth-child(3) {
                            transition-delay: .7s;
                        }
                    }
                }

                .cross {
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    transform: rotate(45deg);

                    span {
                        &:nth-child(1) {
                            height: 0%;
                            width: 2px;
                            position: absolute;
                            left: 10.5px;
                            transition-delay: 0s;
                        }

                        &:nth-child(2) {
                            width: 0%;
                            height: 2px;
                            position: absolute;
                            top: 10.5px;
                            transition-delay: .25s;
                        }
                    }
                }
            }

        }

        .content {
            position: absolute;
            width: 100%;
            height: 100vh;
            transition: background-color .6s cubic-bezier(.13, 0, .8, 1);

            &.slide-enter-active {
                transform: translateY(0);
                transition: transform .7s $ease-out;

                .menu-list {
                    .title {
                        transform: translateY(0);
                        transition: transform .4s cubic-bezier(0, 0, .38, .99);
                    }
                }
            }

            &.slide-enter {
                transform: translateY(100%);

                .menu-list {
                    .title {
                        transform: translateY(100%);
                    }
                }
            }


            &.slide-leave-active {
                transform: translateY(0);
                transition: transform .7s .35s $ease-in;

                .menu-list {
                    .title {
                        transition: transform .3s $ease-in;
                        transform: translateY(0);
                    }

                }
            }


            &.slide-leave-to {
                transform: translateY(-100%);

                .menu-list {
                    .title {
                        transform: translateY(-100%);
                    }

                    .list-item {
                        &:nth-child(1) {
                            .title {
                                transition-delay: 0s !important;
                            }
                        }

                        &:nth-child(2) {
                            .title {
                                transition-delay: .100s !important;
                            }
                        }

                        &:nth-child(3) {
                            .title {
                                transition-delay: .125s !important;
                            }
                        }

                        &:nth-child(4) {
                            .title {
                                transition-delay: .15s !important;
                            }
                        }
                    }
                }
            }

            .menu-list {
                display: flex;
                flex-direction: column;
                grid-gap: 15px;
                position: absolute;
                top: 200px;
                left: 200px;
                text-align: left;
                margin: 0;
                padding: 0;

                .list-item {
                    overflow: hidden;
                    position: relative;
                    transition: opacity .3s $ease-in-out;

                    &:nth-child(1) {
                        .title {
                            transition-delay: .250s;
                        }
                    }

                    &:nth-child(2) {
                        .title {
                            transition-delay: .350s;
                        }
                    }

                    &:nth-child(3) {
                        .title {
                            transition-delay: .355s;
                        }
                    }

                    &:nth-child(4) {
                        .title {
                            transition-delay: .425s;
                        }
                    }

                    &:hover {
                        opacity: .5;
                    }

                    a {
                        all: initial;
                    }

                    .title {
                        display: block;
                        color: white;
                        font-size: 60px;
                    }
                }
            }

        }


    }

    .route-leave-active {
        .black {
            .icon-container {
                opacity: 0;
                transition: opacity .3s $ease-in;
            }
        }

        .menu {
            .content {
                transform: translateY(0%) !important;
            }
        }
    }

    .route-enter-active {

        .menu {
            opacity: 1;
            transition: opacity .2s .4s $ease-in, width .4s 1s $ease-in;

            &.black {
                .icon-container {
                    opacity: 1;
                    transition: opacity .1ms .7s;

                    .search {
                        opacity: 1;
                        transform: scale(1);
                        transition: opacity .1ms 1.2s $ease-out,
                    }

                    .hamburger {
                        span {
                            &:nth-child(1) {
                                transition-delay: 1.4s;
                            }

                            &:nth-child(2) {
                                transition-delay: 1.5s;
                            }

                            &:nth-child(3) {
                                transition-delay: 1.7s;
                            }
                        }
                    }
                }
            }

            .icon-container {
                .hamburger {
                    span {
                        width: 25px;
                    }
                }
            }
        }

    }

    .route-enter {
        .menu {
            opacity: 0;

            &.black {
                .icon-container {
                    opacity: 0;

                    .search {
                        opacity: 0;
                    }
                }
            }

            .icon-container {
                .hamburger {
                    span {
                        width: 0;
                    }
                }
            }
        }
    }

    .before-child-route {
        .black {
            .icon-container {
                opacity: 1 !important;

                .search {
                    opacity: 1 !important;
                }
            }
        }
    }

    .route-from-parent.route-enter {
        .black {
            .icon-container {
                .hamburger {
                    span {
                        width: 25px !important;
                    }
                }
            }
        }
    }

    .route-from-parent {
        .black {
            .icon-container {
                animation: unset !important;

                .search {
                    animation: unset !important;
                }
            }
        }
    }

    @keyframes slideLeft {
        0% {
            transform: translate(-100%, -50%);
        }
        100% {
            transform: translate(0%, -50%);
        }
    }

    @keyframes bounce {
        0% {
            opacity: 0;
            transform: scale(.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

</style>
