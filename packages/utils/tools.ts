// 全大写命名
export function toCapitalCase(value: string) {
  return (
    value.charAt(0).toUpperCase() +
    value
      .slice(1)
      .replace(/-([a-z])/g, (_, char) => (char ? char.toUpperCase() : ''))
  )
}

// 驼峰命名
export function toCamelCase(value: string) {
  const capitalName = toCapitalCase(value)

  return capitalName.charAt(0).toLowerCase() + capitalName.slice(1)
}

// 短横线命名
export function toKebabCase(value: string) {
  return (
    value.charAt(0).toLowerCase() +
    value
      .slice(1)
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
  )
}

// 深拷贝 Clone an object or array
export function deepClone(object: any, recursion: boolean) {
  if (!object) return object
  const { parse, stringify } = JSON
  if (!recursion) return parse(stringify(object))
  const clonedObj: Record<string, any> = Array.isArray(object) ? [] : {}

  if (object && typeof object === 'object') {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        if (object[key] && typeof object[key] === 'object')
          clonedObj[key] = deepClone(object[key], true)
        else clonedObj[key] = object[key]
      }
    }
  }

  return clonedObj
}

export function deepMerge(target: any, merged: any) {
  for (const key in merged) {
    if (target[key] && typeof target[key] === 'object') {
      deepMerge(target[key], merged[key])

      continue
    }

    if (typeof merged[key] === 'object') {
      target[key] = deepClone(merged[key], true)

      continue
    }

    target[key] = merged[key]
  }

  return target
}

export default function isObject(obj: unknown) {
  return typeof obj === 'object' && obj !== null
}

export function observerDomResize(dom: HTMLElement, callback: () => void) {
  const MutationObserver = window.MutationObserver

  const observer = new MutationObserver(callback)

  observer.observe(dom, {
    attributes: true,
    attributeFilter: ['style'],
    attributeOldValue: true,
  })

  return observer
}
