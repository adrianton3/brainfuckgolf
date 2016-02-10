(function () {
	'use strict'

	const { PropTypes } = React
	const { Item } = bf

	const List = React.createClass({
		displayName: 'List',

		propTypes: {
			items: PropTypes.array.isRequired,
			onClick: PropTypes.func.isRequired
		},

		render () {
			return (
				<ul>
					{this.props.items.filter(Boolean)
						.map(({ length, record }, index) =>
							<Item
								key={index}
								value={index}
								length={length}
								record={record}
								onClick={() => { this.props.onClick(index) }}
							/>
					)}
				</ul>
			)
		}
	})

	window.bf = window.bf || {}
	window.bf.List = List
})()