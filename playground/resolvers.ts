function resolveComponent(name: string) {
  if (!name.match(/^El[A-Z]/)) return
  return {
    name,
    from: `@snowball/components`,
  }
}
export function snowballResolver(): any {
  return {
    type: 'component',
    resolve: (name: string) => {
      return resolveComponent(name)
    },
  }
}
