<template>
	<div class="content">
		<ElContainer style="height: 100%">
			<ElHeader style="background: red">Header</ElHeader>
			<ElContainer>
				<ElAside width="200px" style="background: blue">Aside</ElAside>
				<ElMain style="background: black">
					<ElButton>hello world</ElButton>
				</ElMain>
			</ElContainer>
			<ElFooter style="background: pink">Footer</ElFooter>
		</ElContainer>
	</div>
</template>

<style scoped>
.content {
	width: 100%;
	height: 100%;
	background: #000;
}
</style>
