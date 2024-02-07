import addGlobalEventListener from "./utils/addGlobalEventListener.js"

export default function setupDragAndDrop(){

    addGlobalEventListener('mousedown', '[data-draggable]', e => {
        console.log("mouse is down")
    })
}