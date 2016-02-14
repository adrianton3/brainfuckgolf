(function () {
	'use strict'

	const { PropTypes } = React

	const Input = React.createClass({
		displayName: 'Input',

		propTypes: {
			content: PropTypes.string.isRequired,
			onChange: PropTypes.func.isRequired
		},

		_handleChange (event) {
			this.props.onChange(event.target.value)
		},

		render () {
			return (
				<input
					type="text"
					placeholder="Your brainfuck program here"
					value={this.props.content}
					onChange={this._handleChange}
				/>
			)
		}
	})

	window.bf = window.bf || {}
	window.bf.Input = Input
})()
