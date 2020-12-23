export default {
  name: 'TableExpand',
  functional: true,
  props: {
    item: Object,
    head: String,
    value: {
      type: [Boolean, Object, String, Number]
    },
    render: Function,
    index: Number
  },
  render: (h, ctx) => {
    return ctx.props.render(h, ctx.props)
  }
}
