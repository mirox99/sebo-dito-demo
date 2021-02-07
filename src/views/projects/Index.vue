<template>
  <div id="scene" :class="{active_menu:menuIsOpen,'before-child-route':clickedItemPosition}" class="project-view">
    <template>
      <div v-for="row in rows" :key="row.id" :id="'r'+row.id" class="images-row">
        <!--        <div class="image-container prev">-->
        <!--          <div v-for="item in row.projects"-->
        <!--               :key="row.id+item.id"-->
        <!--               :ref="row.id+item.id+'prev'"-->
        <!--               @click="itemClick(row.id+item.id+'prev',item)"-->
        <!--               class="project-item">-->
        <!--            <img :src="getImagePath(item.src)"-->
        <!--                 class="project-item-image"-->
        <!--                 :alt="item.name">-->
        <!--            <div class="item-content">-->
        <!--              <h2 class="item-name">{{ item.name }}</h2>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="image-container main">
          <div v-for="item in row.projects"
               :key="row.id+item.id+'item'"
               :id="'item'+row.id+item.id"
               :ref="row.id+item.id+'main'"
               @click="itemClick(row.id+item.id+'main',item)"
               class="project-item">
            <img :src="getImagePath(item.src,row.id+item.id+'item')"
                 class="project-item-image"
                 :alt="item.name">
            <div class="item-content">
              <h2 class="item-name">{{ item.name }}</h2>
            </div>
          </div>
        </div>
        <!--        <div class="image-container after">-->
        <!--          <div v-for="item in row.projects"-->
        <!--               :key="row.id+item.id"-->
        <!--               :ref="row.id+item.id+'after'"-->
        <!--               @click="itemClick(row.id+item.id+'after',item)"-->
        <!--               class="project-item">-->
        <!--            <img :src="getImagePath(item.src)" class="project-item-image" :alt="item.name">-->
        <!--            <div class="item-content">-->
        <!--              <h2 class="item-name">{{ item.name }}</h2>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </template>
    <transition name="fade">
      <div v-if="clickedItemPosition"
           :style="clickedElementStyles"
           :class="{animated:clickedItemPosition}"
           class="clicked-item">
      </div>
    </transition>
    <Menu key="menu"/>
  </div>
</template>

<script>
import projects from '../../projects'
import {mapGetters} from 'vuex'
import Menu from '@/components/Menu'
import gsap from 'gsap'
import LoopSlider from "@/LoopSlider";

export default {
  data() {
    return {
      rowInterval: null,
      mousewheelTimeOut: null,
      animationInitTimeout: null,
      clickedItemPosition: null,
      childRouteInterval: null,
      fullImages: [6, 7, 8, 9, 15],
      clickedImage: null,
      d: 0,
      temp_d: 0,
      t: 3,
      v: 0,
    }
  },
  components: {Menu},
  computed: {
    ...mapGetters('menu', {
      menuIsOpen: 'menuIsOpen',
    }),
    slidesPerRow() {
      return window.innerWidth > 1440 ? 3 : 4
    },
    rows() {
      let rowData = [];
      let oddSlide = projects % this.slidesPerRow;
      let rowLength = Math.floor(projects.length / this.slidesPerRow);
      for (let i = 0; i < rowLength; i++) {
        let quantity = oddSlide && i === this.slidesPerRow - 1 ? oddSlide + this.slidesPerRow : this.slidesPerRow;
        let row = {
          id: i,
          scenePosition: 0,
          speed: this.speedGenerator(i),
          projects: projects.slice(i * this.slidesPerRow, i * this.slidesPerRow + quantity)
        };

        rowData.push(row)
      }

      return rowData || []
    },
    clickedElementStyles() {
      return {
        backgroundImage: `url(${require(`../../assets/fullproject${this.clickedImage}.svg`)})`,
        top: `${this.clickedItemPosition.top}px`,
        left: `${this.clickedItemPosition.left}px`,
        width: `${this.clickedItemPosition.width}px`,
        height: `${this.clickedItemPosition.height}px`
      }
    }
  },
  methods: {
    getImagePath(path) {
      return require(`@/${path}`)
    },
    itemClick(ref, item) {
      this.clearWindow();
      this.clickedImage = this.fullImages.find(id => id === item.id) ? item.id : 15;
      let itemPosition = this.$refs[ref][0].getBoundingClientRect();
      this.$refs[ref][0].classList.add('clicked');
      const left = itemPosition.left;
      const top = itemPosition.top;
      const width = itemPosition.width;
      const height = itemPosition.height;
      this.clickedItemPosition = {top, left, width, height};

      this.childRouteInterval = setTimeout(() => {
        this.$router.push({
          name: 'project_id',
          params: {
            id: item.id,
            routeFromParent: true
          }
        }).then(e => console.log(e))
      }, 1600)
    },
    speedGenerator(index) {
      switch (index) {
        case 0:
          return 120;
        case 1:
          return 190;
        case 2:
          return 150;
        case 3:
          return 100;
        case 4:
          return 240;
      }
    },
    setAfterClonesPosition() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.rows.forEach((row) => {
            let mainGrid = document.getElementsByClassName('main')[row.id];
            let afterGrid = document.getElementsByClassName('after')[row.id];
            afterGrid.style.top = mainGrid.clientHeight + 15 + 'px'
          });
        }, 100)
      })
    },
    easeOutQuad(t) {
      return 1 + (--t) * t * t * t * t
    },
    rowAnimationHandler(row, speed, direction) {
      let sceneHeight = parseFloat(document.querySelector(`#r${row.id} .image-container`).style.height);

      gsap.to(`#r${row.id} .image-container .project-item`, {
        duration: speed,
        ease: "ease",
        y: direction,
        modifiers: {
          y: (y) => {
            return `${this.wrap(parseFloat(y), -0, sceneHeight)}px`
          }
        },
      });
    },
    wrap(value, min, max) {
      let v = value - min;
      let r = max - min;

      return ((r + v % r) % r) + min;
    },
    initRowAnimation() {
      this.rows.forEach((row) => {
        let sceneHeight = parseFloat(document.querySelector(`#r${row.id} .image-container`).style.height);

        gsap.to(`#r${row.id} .image-container .project-item`, {
          duration: row.speed,
          ease: "none",
          y: "-=" + sceneHeight,
          modifiers: {
            y: (y) => {
              return `${this.wrap(parseFloat(y), -0, sceneHeight)}px`
            }
          },
          repeat: -1,
        });
      })
    },
    onMouseWheel(event) {
      if (this.menuIsOpen) return
      clearInterval(this.rowInterval);
      clearTimeout(this.mousewheelTimeOut);
      gsap.globalTimeline.clear()
      if (event.deltaY < 0) {
        this.rows.forEach((row) => {
          this.rowAnimationHandler(row, .1 * row.speed / 10, '-=250')
        })
      } else if (event.deltaY > 0) {
        this.rows.forEach((row) => {
          this.rowAnimationHandler(row, .1 * row.speed / 10, '+=250')
        })
      }
      this.mousewheelTimeOut = setTimeout(() => {
        this.initRowAnimation()
      }, 500)
    },
    clearWindow() {
      window.removeEventListener(`wheel`, this.onMouseWheel);
      clearInterval(this.rowInterval);
      clearTimeout(this.mousewheelTimeOut);
      clearTimeout(this.animationInitTimeout);
      clearTimeout(this.childRouteInterval);
    },
    setItemPosition(rows) {
      let itemPadding = 15
      rows.forEach((row) => {
        let rowHeight = 0;
        let itemCloneCount = 0;
        let rowPadding = row.projects.length * itemPadding
        row.projects.forEach((item, index) => {
          try {
            let prevItem = row.projects[index - 1]
            let itemDom = document.querySelector(`#item${row.id}${item.id}`)
            let prevItemDom = prevItem ? document.querySelector(`#item${row.id}${prevItem.id}`) : null
            let prevItemHeight = prevItemDom ? prevItemDom.clientHeight : 0
            let prevItemTransformY = prevItem ? prevItemDom.style.transform.split(',')[1] : 0
            itemDom.style.transform = `translate(0,${parseFloat(prevItemTransformY) + prevItemHeight + itemPadding}px)`
            rowHeight += itemDom.clientHeight
          } catch (e) {
            console.log(e)
          }
        })
        itemCloneCount = Math.floor(innerHeight / (rowHeight + rowPadding))
        this.createItemsClones(row, itemCloneCount, (rowHeight + rowPadding))
      })
    },
    createItemsClones(row, itemCloneCount, rowHeight) {
      let newRowHeight = rowHeight
      let rowDom = document.querySelector(`#r${row.id} .image-container`);

      for (let cloneIndex = 1; cloneIndex <= itemCloneCount + 1; cloneIndex++) {
        row.projects.forEach((item) => {
          try {
            let itemsLength = row.projects.length;
            let itemDom = document.querySelector(`#item${row.id}${item.id}`)
            let itemClone = itemDom.cloneNode(true);
            itemClone.id = `item${row.id}${item.id + cloneIndex * itemsLength}`
            itemClone.style.transform = `translate(0,${parseFloat(newRowHeight) + 15}px)`

            rowDom.appendChild(itemClone)
            newRowHeight += itemDom.clientHeight + 15

          } catch (e) {
            console.log(e)
          }
        })
      }
      rowDom.style.height = `${newRowHeight}px`
    }
  },
  mounted() {
    this.$nextTick(() => {
      new LoopSlider(this.rows, 1550)
      // setTimeout(() => {
      //   this.setItemPosition(this.rows)
      // }, 100)
      // this.animationInitTimeout = setTimeout(() => {
      //   window.addEventListener(`wheel`, this.onMouseWheel);
      //   this.initRowAnimation()
      // }, 1550);
      // this.setAfterClonesPosition()
    })
  },
  updated() {
    this.$nextTick(function () {
      console.log('update')
    })
  },
  beforeDestroy() {
    this.clearWindow()
  }
}
</script>

<style lang="scss" scoped>
$ease-out: cubic-bezier(0, .01, 0, 1);
$ease-in: cubic-bezier(1, .01, 1, 1);
$ease-in-out: cubic-bezier(.64, .01, .65, .99);

.project-view {
  position: relative;
  padding: 0 100px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 20px;
  background-color: white;
  transition: background-color .7s .7s $ease-in-out;
  overflow: hidden;
  top: 0;
  min-height: 100vh;
  max-height: 100vh;

  &.active_menu {
    transition: background-color .7s .7s $ease-in-out;
    background-color: black;
  }

  .images-row {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .image-container {
      display: flex;
      flex-direction: column;
      grid-gap: 15px;
      width: 100%;
      min-height: 100vh;
      justify-content: space-between;
      transform: translateY(-20%);

      &.prev {
        left: 0;
        bottom: calc(100% + 15px);
        position: absolute;
      }

      &.after {
        left: 0;
        top: 100%;
        position: absolute;
      }

      .project-item {
        overflow: hidden;
        position: absolute;
        display: table;
        width: 100%;
        @for $i from 1 through 15 {
          &:nth-child(#{$i}) {
            top: $i*50px;
          }
        }
        @for $i from 1 through 15 {
          &:nth-child(#{$i}) {
            animation: slideUp .7s $i*.07s $ease-out forwards;
          }
        }

        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 1;
          transform: translateY(100%);
          background-color: rgba(0, 99, 106, 0.61);
          transition: transform .7s $ease-in;
        }

        &:hover {
          &::after {
            transform: translateY(0);
            transition: transform .7s $ease-out;
          }

          .item-name {
            transform: translateY(0) !important;
            transition: transform .4s .25s $ease-out !important;
          }
        }

        &.clicked {
          opacity: 1;
          animation: bounce .5s $ease-in-out, fade .1ms .7s ease forwards !important;

          &::after {
            opacity: 0;
            transition: opacity .2s $ease-in;
          }

          .item-content {
            .item-name {
              animation: bounce_fade .5s $ease-in-out forwards;
              transform: unset !important;
            }
          }
        }

        .project-item-image {
          display: table-row;
          width: 100%;
        }

        .item-content {
          overflow: hidden;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;

          .item-name {
            color: white;
            font-size: 18px;
            transition: transform .4s .2s $ease-in;
            margin: 0;
            transform: translateY(100%) perspective(1px) translateZ(0);
            backface-visibility: hidden;
            will-change: transform;
          }
        }
      }

    }
  }

  @keyframes slideUp {
    100% {
      top: 0;
    }
  }

  .clicked-item {
    position: absolute;
    z-index: 3;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    &.animated {
      animation: scaleImage 1s .6s $ease-in-out forwards !important;
    }

    &.fade-enter-active {
      transition: all .1ms .6s $ease-in;
      opacity: 1;
    }

    &.fade-enter {
      opacity: 0;
    }
  }

  &.route-enter-active {
    transition: all 1.55s, transform .7s $ease-out;
    transform: translateY(0);
    z-index: 100 !important;

    .images-row {
      transform: translateY(0);
      transition: transform .7s $ease-out;

      &:nth-child(1) {
        transition-delay: .2s !important;
      }

      &:nth-child(2) {
        transition-delay: .3s !important;
      }

      &:nth-child(3) {
        transition-delay: .35s !important;
      }

      &:nth-child(4) {
        transition-delay: .6s !important;
      }

      &:nth-child(5) {
        transition-delay: .5s !important;
      }

      .image-container {
        &.prev {
          opacity: 1;
          transition: opacity .1ms 1.55s $ease-out !important;
        }
      }

      //
      //.project-item {
      //  opacity: 1;
      //  top: 0;
      //  @for $i from 1 through 15 {
      //    &:nth-child(#{$i}) {
      //      transition: top .7s $i*.2s $ease-out !important;
      //    }
      //  }
      //}
    }

  }

  &.route-enter {
    transform: translateY(100%);
    z-index: 100 !important;

    .images-row {
      transform: translateY(100%);

      .image-container {
        &.prev {
          opacity: 0;
        }
      }

      //.project-item {
      //  opacity: 0;
      //  @for $i from 1 through 15 {
      //    &:nth-child(#{$i}) {
      //      top: ($i*300px);
      //    }
      //  }
      //}
    }
  }

  &.route-leave-active, &.before-child-route {
    transition: all .4s .7s $ease-in-out !important;

    .images-row {
      &:nth-child(1) {
        .project-item {
          transition-delay: .1s !important;
        }
      }

      &:nth-child(2) {
        .project-item {
          transition-delay: .2s !important;
        }
      }

      &:nth-child(3) {
        .project-item {
          transition-delay: .3s !important;
        }
      }

      &:nth-child(4) {
        .project-item {
          transition-delay: .35s !important;
        }
      }

      &:nth-child(5) {
        .project-item {
          transition-delay: .25s !important;
        }
      }


      .project-item {
        transition: opacity .7s $ease-in-out !important;
        opacity: 0;
      }
    }

  }

  @keyframes scaleImage {
    100% {
      height: 100vh;
      width: 90%;
      left: 0;
      top: 0;
    }
  }
  @keyframes bounce {
    0% {
      transform: scale(.9);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes fade {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes bounce_fade {
    0% {
      transform: scale(.9);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
}
</style>
