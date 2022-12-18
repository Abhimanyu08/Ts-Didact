import Fiber from "../interfaces/Fibers";



export function commitWork(fiber: Fiber | null) {
    if (!fiber) {
        return
    }
    const parentDom = fiber.parent.dom
    parentDom.appendChild(fiber.dom)

    commitWork(fiber.child)
    commitWork(fiber.sibling)
}