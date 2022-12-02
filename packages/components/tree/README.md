# target

- 节点可以无限延伸
- 可以展开 or 收起子节点
- 选中父节点，它的所有子节点也全部被选中,反选同理
- 同一级所有子节点选中时，它的父级也自动选中，一直递归判断到根节点

# api

- label
  - 节点标题
- expand
  - 是否展开直子节点
- checked
  - 是否选中该节点
- children
  - 子节点

```js
;[
  {
    label: 'parent 1',
    expand: true,
    children: [
      {
        label: 'parent 1-1',
        expand: true,
        children: [
          {
            label: 'leaf 1-1-1',
          },
          {
            label: 'leaf 1-1-2',
          },
        ],
      },
      {
        label: 'parent 1-2',
        children: [
          {
            label: 'leaf 1-2-1',
          },
          {
            label: 'leaf 1-2-1',
          },
        ],
      },
    ],
  },
]
```
