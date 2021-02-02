import TweenMax from "gsap";


class Cursor {
    constructor(self) {
        this.initCursor();
        this.initHovers(self);
    }

    initCursor() {
        this.outerCursor = document.querySelector(".circle-cursor--outer");
        this.innerCursor = document.querySelector(".circle-cursor--inner");
        this.outerCursorBox = this.outerCursor.getBoundingClientRect();
        this.outerCursorSpeed = 0;
        this.clientX = 30;
        this.clientY = 30;
        this.showCursor = false;

        const unveilCursor = () => {
            TweenMax.set(this.innerCursor, {
                x: this.clientX,
                y: this.clientY
            });
            TweenMax.set(this.outerCursor, {
                x: this.clientX - this.outerCursorBox.width / 2,
                y: this.clientY - this.outerCursorBox.height / 2
            });
            setTimeout(() => {
                this.outerCursorSpeed = 0.2;
            }, 100);
            this.showCursor = true;
        };

        document.addEventListener("mousemove", unveilCursor);

        document.addEventListener("mousemove", e => {
            this.clientX = e.clientX;
            this.clientY = e.clientY;
        });

        const render = () => {
            TweenMax.set(this.innerCursor, {
                x: this.clientX,
                y: this.clientY
            });
            if (!this.isStuck) {
                TweenMax.to(this.outerCursor, this.outerCursorSpeed, {
                    x: this.clientX - this.outerCursorBox.width / 2,
                    y: this.clientY - this.outerCursorBox.height / 2
                });
            }
            if (this.showCursor) {
                document.removeEventListener("mousemove", unveilCursor);
            }
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
    }

    initHovers(self) {
        const menuIcons = document.querySelectorAll(".icon-container");

        const menuContent = document.querySelectorAll(".content");

        const iconsHandleMouseEnter = e => {
            this.isStuck = true;
            const target = e.currentTarget;
            const box = target.getBoundingClientRect();

            this.outerCursorOriginals = {
                width: this.outerCursorBox.width,
                height: this.outerCursorBox.height
            };
            TweenMax.to(this.outerCursor, 0.2, {
                x: box.left,
                y: box.top,
                width: box.width,
                height: box.height,
                backgroundColor: "#ffffff",
            });
        };

        const iconHandleMouseLeave = () => {
            this.isStuck = false;
            TweenMax.to(this.outerCursor, 0.2, {
                width: this.outerCursorOriginals.width,
                height: this.outerCursorOriginals.height,
            });
        };

        const MenuContentMouseEnter = () => {
            this.outerCursorOriginals = {
                width: this.outerCursorBox.width,
                height: this.outerCursorBox.height
            };
            TweenMax.to(this.outerCursor, 0.2, {
                width: 100,
                height: 100,
                background: 'transparent'
            });
        };

        const MenuContentMouseLeave = () => {
            TweenMax.to(this.outerCursor, 0.2, {
                width: this.outerCursorOriginals.width,
                height: this.outerCursorOriginals.height,
            });
        };


        menuContent.forEach(item => {
            item.addEventListener("mouseenter", MenuContentMouseEnter);
            item.addEventListener("mouseleave", MenuContentMouseLeave);
        });

        if (self.$route.name === 'Home') {
            menuIcons.forEach(item => {
                item.addEventListener("mouseenter", iconsHandleMouseEnter);
                item.addEventListener("mouseleave", iconHandleMouseLeave);
            });
        }


    }
}

export default Cursor;