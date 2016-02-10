(function () {
	'use strict';

	const { PropTypes } = React

	const Ace = React.createClass({
		displayName: 'Ace',

		propTypes: {
			content: PropTypes.string
		},

		getDefaultProps () {
			return {
				content: ''
			}
		},

		getInitialState () {
			return {}
		},

		componentDidMount () {
			const editor = ace.edit('in-editor')
			editor.setTheme('ace/theme/github')
			editor.setFontSize(24)
			editor.on('input', () => { this.props.onChange(editor.getValue()) })
			editor.renderer.setShowGutter(false)
			editor.setOption('highlightActiveLine', false)
			editor.$blockScrolling = Infinity

			this.setState({ editor })
		},

		componentDidUpdate () {
			const { editor } = this.state
			const content = editor.getValue()

			if (content !== this.props.content) {
				editor.setValue(this.props.content, 1)
			}
		},

		componentWillUnmount () {
			this.state.editor.destroy()
		},

		render () {
			return <div id="in-editor"></div>
		}
	})

	window.bf = window.bf || {}
	window.bf.Ace = Ace
})();