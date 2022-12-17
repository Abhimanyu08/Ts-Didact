import Fiber from "../interfaces/Fibers"
import { PropsType } from "../interfaces/utils"

export function performUnitOfWork(unitOfWork: Fiber): Fiber | null {

    // -------------Add a child to the dom---------------
    if (!unitOfWork.dom) {
        unitOfWork.dom = unitOfWork.type === "TEXT_ELEMENT" ? document.createTextNode(unitOfWork.props.nodeValue) : document.createElement(unitOfWork.type)
    }

    if (unitOfWork.parent) {
        unitOfWork.parent.dom.appendChild(unitOfWork.dom)
    }

    //------------Make fibers out of all children-------------
    let prevFiber: Fiber | null = null
    unitOfWork.props.children.forEach((child, idx) => {

        let newFiber: Fiber = {
            dom: null,
            parent: unitOfWork,
            props: child.props as PropsType,
            sibling: null,
            type: child.type,
            child: null
        }
        if (idx === 0) {
            unitOfWork.child = newFiber
        } else {
            prevFiber.sibling = newFiber
        }
        prevFiber = newFiber
    })


    if (unitOfWork.child) {
        return unitOfWork.child
    }

    let fiberToReturn = unitOfWork
    while (fiberToReturn) {
        if (fiberToReturn.sibling) {
            return fiberToReturn.sibling
        }
        fiberToReturn = fiberToReturn.parent
    }

}