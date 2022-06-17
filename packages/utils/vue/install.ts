export function withInstall(com) {
	com.install = function (app) {
		app.component(com.name, com);
	};
	return com;
}
