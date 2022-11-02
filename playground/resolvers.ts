function resolveComponent(name: string) {
  if (!name.match(/^El[A-Z]/)) return
  return {
    name,
    from: `@element3/components`,
  }
}
export function Element3Resolver(): any {
  return {
    type: 'component',
    resolve: (name: string) => {
      return resolveComponent(name)
    },
  }
}
