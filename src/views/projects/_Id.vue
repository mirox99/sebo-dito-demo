<template>
    <div class="project-item-view" :class="{'route-from-parent':routeFromParent}">
        <img src="../../assets/fullproject6.svg" class="item-image" alt="">
        <Menu key="menu"/>
    </div>
</template>

<script>
    import Menu from '@/components/Menu'

    export default {
        props: {
            routeFromParent: {
                type: Boolean,
                default: false,
            }
        },
        components: {Menu},
        created() {
            console.log(this.routeFromParent, 'from parent')
        }
    }
</script>

<style lang="scss" scoped>
    $ease-out: cubic-bezier(0, .01, 0, 1);

    .project-item-view {
        background: white;
        overflow: hidden;
        width: 100%;
        height: 100vh;
        display: flex;
        z-index: 1;
        top: 0;
        position: absolute;

        .item-image {
            width: 90%;
            left: 0;
            height: 100%;
            object-fit: cover;
        }

        &.route-enter-active {
            transition: all 1.2s $ease-out;
            opacity: 1;
        }

        &.route-from-parent.route-enter-active {
            transition: all .1s $ease-out;
        }
    }
</style>