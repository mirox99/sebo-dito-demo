<template>
    <div id="app">
        <transition name="route">
            <router-view key="route "/>
        </transition>
        <customCursor/>
    </div>
</template>

<script>
    import customCursor from '@/components/cursor'

    export default {
        components: {customCursor}
    }
</script>

<style>
    body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: black;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }


</style>
