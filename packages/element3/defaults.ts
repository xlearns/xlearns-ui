import Components from "./components";
import Plugins from "./plugin";
import { makeInstaller } from "./install";

export default makeInstaller([...(Components as any[]), ...Plugins]);
