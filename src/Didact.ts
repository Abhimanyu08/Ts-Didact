import { createElementReturnType } from "./interfaces/createElementReturnType"
import { createTextNodeReturnType } from "./interfaces/createTextNodeReturnType"
import Fiber from "./interfaces/Fibers"
import { ChildrenType, PropsType } from "./interfaces/utils"
import { performUnitOfWork } from "./utils/performUnitOfWork"

const createTextNode = (text: string): createTextNodeReturnType => {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}

export const createElement = (type: string, attrs: Record<string, string>, ...children: (string | createElementReturnType)[]): createElementReturnType => {

    return {
        type,
        props: {
            ...{
                children: children.map((child) => {
                    if (typeof child ===
                        "string") return createTextNode(child)

                    return child
                })
            } as PropsType,
            ...attrs,
        }
    }
}

export const render = (root: HTMLElement, element: createElementReturnType | createTextNodeReturnType) => {

    // let htmlElem: Text | HTMLElement
    // if (isTextNodeType(element)) {
    //     htmlElem = document.createTextNode(element.props.nodeValue)
    // } else {

    //     htmlElem = document.createElement(element.type)
    //     Object.entries(element.props).forEach(([k, v]) => htmlElem[k] = v)
    //     element.children.map((child) => render(htmlElem as HTMLElement, child))
    // }

    // root.appendChild(htmlElem)

    // The problem with above code is that it won't stop till it has rendered full DOM. This will halt the main thread
    // of browser for too long which isn't good. We need to do the work when browser is idle.
    // Let a unit of work be defined as 
    // we need to write a function which takes in a deadline parameter, and while there is work to be done && time remaining
    // should do the work

    // A unit of work - adding a child to the parent going depth first, 
    //

    let nextUnitOfWork: Fiber | null = {
        type: root.tagName,
        dom: root,
        child: null,
        parent: null,
        props: {
            children: [element]
        } as PropsType,
        sibling: null
    }

    const workLoop: IdleRequestCallback = (deadline) => {

        let shouldStop = false
        while (!shouldStop && nextUnitOfWork) {
            nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
            shouldStop = deadline.timeRemaining() < 1
        }

        requestIdleCallback(workLoop)
    }

    requestIdleCallback(workLoop)

}

