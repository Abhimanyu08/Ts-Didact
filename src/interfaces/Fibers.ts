import { PropsType } from "./utils"




export default interface Fiber {
    type: string,
    parent: Fiber | null,
    sibling: Fiber | null,
    child: Fiber | null
    props: PropsType,
    dom: HTMLElement | Text | null
}