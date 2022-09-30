import type { AppContext } from "vue";

export type SFCWithInstall<T> = T & any; // T & Plugin gen dts error ts2742

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
	_context: AppContext | null;
};
