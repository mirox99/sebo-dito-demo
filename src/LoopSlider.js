import gsap from "gsap";

class LoopSlider {
    constructor(projectsRows, animationInitTimeout) {
        this.itemPadding = 15
        this.rows = projectsRows
        this.mousewheelTimeOut = null

        setTimeout(() => {
            this.setItemPosition(this.rows)
        }, 100)
        this.animationInitTimeout = setTimeout(() => {
            window.addEventListener(`wheel`, (e) => {
                this.onMouseWheel(e)
            });
            this.initRowAnimation()
        }, animationInitTimeout);
    }

    setItemPosition(rows) {
        rows.forEach((row) => {
            let rowHeight = 0;
            let itemCloneCount = 0;
            let rowPadding = row.projects.length * this.itemPadding
            row.projects.forEach((item, index) => {
                try {
                    let prevItem = row.projects[index - 1]
                    let itemDom = document.querySelector(`#item${row.id}${item.id}`)
                    let prevItemDom = prevItem ? document.querySelector(`#item${row.id}${prevItem.id}`) : null
                    let prevItemHeight = prevItemDom ? prevItemDom.clientHeight : 0
                    let prevItemTransformY = prevItem ? prevItemDom.style.transform.split(',')[1] : 0
                    itemDom.style.transform = `translate(0,${parseFloat(prevItemTransformY) + prevItemHeight + this.itemPadding}px)`
                    rowHeight += itemDom.clientHeight
                } catch (e) {
                    console.log(e)
                }
            })

            itemCloneCount = Math.floor(innerHeight / (rowHeight + rowPadding))
            this.createItemsClones(row, itemCloneCount, (rowHeight + rowPadding))
        })
    }

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
                    itemClone.style.transform = `translate(0,${parseFloat(newRowHeight) + this.itemPadding}px)`

                    rowDom.appendChild(itemClone)
                    newRowHeight += itemDom.clientHeight + 15

                } catch (e) {
                    console.log(e)
                }
            })
        }
        rowDom.style.height = `${newRowHeight}px`
        this.setRowTransform(row, row.projects)
    }

    setRowTransform(row, projects) {
        try {
            let [firstItem, secondItem] = projects
            let rowDom = document.querySelector(`#r${row.id} .image-container`);
            let firstItemDomHeight = document.querySelector(`#item${row.id}${firstItem.id}`).clientHeight
            let secondItemDomHeight = document.querySelector(`#item${row.id}${secondItem.id}`).clientHeight

            rowDom.style.transform = `translate(0,${-(firstItemDomHeight + secondItemDomHeight + 30)}px)`
        } catch (e) {
            console.log(e)
        }

    }

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
    }

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
    }

    onMouseWheel(event) {
        clearTimeout(this.mousewheelTimeOut);
        gsap.globalTimeline.clear()
        if (event.deltaY < 0) {
            this.rows.forEach((row) => {
                this.rowAnimationHandler(row, .1 * row.speed / 30, '-=250')
            })
        } else if (event.deltaY > 0) {
            this.rows.forEach((row) => {
                this.rowAnimationHandler(row, .1 * row.speed / 30, '+=250')
            })
        }
        this.mousewheelTimeOut = setTimeout(() => {
            this.initRowAnimation()
        }, 500)
    }

    wrap(value, min, max) {
        let v = value - min;
        let r = max - min;

        return ((r + v % r) % r) + min;
    }

}

export default LoopSlider