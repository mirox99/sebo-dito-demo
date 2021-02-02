<template>
    <div id="app">
        <transition name="route">
            <router-view key="route "/>
        </transition>
    </div>
</template>


<style>
    body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: black;
        height: 100vh;
        width: 100vw;
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

        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
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
