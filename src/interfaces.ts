

export interface createElementReturnType {
    type: string,
    children: (createElementReturnType | createTextNodeReturnType)[]
    props: {
        [attrs: string]: string
    }
}
export interface createTextNodeReturnType {
    type: "TEXT_ELEMENT",
    children: []
    props: {
        nodeValue: string
    }
}

export function isTextNodeType(elem: createElementReturnType | createTextNodeReturnType): elem is createTextNodeReturnType {
    return elem.type === "TEXT_ELEMENT"
}
