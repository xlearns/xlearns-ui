import { withInstall } from "@element3/utils";

import Container from "./src/container.vue";
import Aside from "./src/aside.vue";
import Footer from "./src/footer.vue";
import Header from "./src/header.vue";
import Main from "./src/main.vue";

export const ElContainer = withInstall(Container, {
	Aside,
	Footer,
	Header,
	Main,
});

export const ElAside = withInstall(Aside);
export const ElFooter = withInstall(Footer);
export const ElHeader = withInstall(Header);
export const ElMain = withInstall(Main);
export default ElContainer;
