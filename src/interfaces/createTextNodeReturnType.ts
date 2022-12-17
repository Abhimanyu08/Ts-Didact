import { ChildrenType } from "./utils"

export interface createTextNodeReturnType {
    type: "TEXT_ELEMENT",
    props: {
        children: ChildrenType["children"],
        nodeValue: string
    }
}