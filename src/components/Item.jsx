(function () {
	'use strict'

	const { PropTypes } = React

	const Item = React.createClass({
		displayName: 'Item',

		propTypes: {
			value: PropTypes.number.isRequired,
			length: PropTypes.number.isRequired,
			record: PropTypes.bool.isRequired,
			onClick: PropTypes.func.isRequired
		},

		render () {
			const { value, length, record } = this.props
			return (
				<li onClick={this.props.onClick}>
					{value} <span className={classNames({ record })}>({length})</span>
				</li>
			)
		}
	})

	window.bf = window.bf || {}
	window.bf.Item = Item
})()