import type { DirectiveBinding, ObjectDirective } from 'vue'

const vDrag: ObjectDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    let n = 0
    el.addEventListener('click', () => {
      let _c
      if (++n % 2) {
        _c = 'red'
      } else {
        _c = '#000'
      }
      el.style.color = _c
    })
  },
}

export default vDrag
