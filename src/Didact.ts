import { REPL_MODE_SLOPPY } from "repl"
import { createElementReturnType, createTextNodeReturnType, isTextNodeType } from "./interfaces"

const createTextNode = (text: string): createTextNodeReturnType => {
    return {
        type: "TEXT_ELEMENT",
        children: [],
        props: {
            nodeValue: text,
        }
    }
}

export const createElement = (type: string, attrs: Record<string, string>, ...children: (string | createElementReturnType)[]): createElementReturnType => {

    return {
        type,
        children: children.map((child) => {
            if (typeof child ===
                "string") return createTextNode(child)

            return child
        }),
        props: {
            ...attrs,
        }
    }
}

export const render = (root: HTMLElement, element: createElementReturnType | createTextNodeReturnType) => {

    let htmlElem: Text | HTMLElement
    if (isTextNodeType(element)) {
        htmlElem = document.createTextNode(element.props.nodeValue)
    } else {

        htmlElem = document.createElement(element.type)
        Object.entries(element.props).forEach(([k, v]) => htmlElem[k] = v)
        element.children.map((child) => render(htmlElem as HTMLElement, child))
    }

    root.appendChild(htmlElem)

}

