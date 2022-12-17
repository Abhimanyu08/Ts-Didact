import { createElementReturnType } from "./createElementReturnType";
import { createTextNodeReturnType } from "./createTextNodeReturnType";

export type StringDictionary = { [key: string]: string };

export type ChildrenType = {
    children: (createElementReturnType | createTextNodeReturnType)[];
}
export type PropsType = ChildrenType & StringDictionary;


export function isTextNodeType(elem: createElementReturnType | createTextNodeReturnType): elem is createTextNodeReturnType {
    return elem.type === "TEXT_ELEMENT"
}
