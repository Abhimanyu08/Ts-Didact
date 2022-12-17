import * as Didact from "./Didact";

/**
 @jsx Didact.createElement
 */

const elem: ReturnType<typeof Didact.createElement> = (
	<div foo="bar">
		<p foo1="bar1">hi</p>
		<span>bye</span>
	</div>
);

const root = document.getElementById("root");
Didact.render(root, elem);
