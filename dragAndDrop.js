import addGlobalEventListener from "./utils/addGlobalEventListener.js"

export default function setupDragAndDrop(){

    addGlobalEventListener('mousedown', '[data-draggable]', e => {
        const selectedItem = e.target
        const itemClone = selectedItem.cloneNode(true)
        itemClone.classList.add('dragging')
        positionClone(itemClone,e)
        document.body.append(itemClone)
        selectedItem.classList.add("hide")
        

        const mouseMoveFunction = e => {
            positionClone(itemClone,e)
        }

        document.addEventListener("mousemove", mouseMoveFunction)
        document.addEventListener("mouseup", ()=>{
            document.removeEventListener("mousemove", mouseMoveFunction)
            selectedItem.classList.remove("hide")
            itemClone.remove()
            console.log("up")
        },{once:true})
    
    })
}

function positionClone(itemClone, mousePosition){
    itemClone.style.top = `${mousePosition.clientY}px`
    itemClone.style.left = `${mousePosition.clientX}px`

}