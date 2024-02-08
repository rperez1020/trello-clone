import addGlobalEventListener from "./utils/addGlobalEventListener.js"

export default function setupDragAndDrop(){

    addGlobalEventListener('mousedown', '[data-draggable]', e => {
        const selectedItem = e.target
        const itemClone = selectedItem.cloneNode(true)
        const offset = setupDragItems(selectedItem, itemClone,e)
        setupDragEvents(selectedItem, itemClone, offset)

    })
}

function setupDragItems(selectedItem, itemClone, e){
    const originalRect = selectedItem.getBoundingClientRect()
    const offset = {
        x: e.clientX - originalRect.left,
        y: e.clientY - originalRect.top
    }

    selectedItem.classList.add("hide")

    itemClone.style.width = `${originalRect.width}px`
    itemClone.classList.add('dragging')
    positionClone(itemClone,e, offset)
    document.body.append(itemClone)

    return offset
}

function setupDragEvents(selectedItem, itemClone, offset){
    const mouseMoveFunction = e => {
        positionClone(itemClone,e, offset)
    }

    document.addEventListener("mousemove", mouseMoveFunction)
    document.addEventListener("mouseup", ()=>{
        document.removeEventListener("mousemove", mouseMoveFunction)
        selectedItem.classList.remove("hide")
        itemClone.remove()
    },{once:true})
}

function positionClone(itemClone, mousePosition, offset){
    itemClone.style.top = `${mousePosition.clientY - offset.y}px`
    itemClone.style.left = `${mousePosition.clientX - offset.x}px`

}

// 28:57