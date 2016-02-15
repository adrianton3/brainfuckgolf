(function () {
	'use strict'

	const { PropTypes } = React
	const { Item } = bf

	const List = React.createClass({
		displayName: 'List',

		propTypes: {
			items: PropTypes.array.isRequired,
			records: PropTypes.array.isRequired,
			onClick: PropTypes.func.isRequired
		},

		render () {
			const records = new Set(this.props.records)

			return (
				<ul>
					{this.props.items.map(({ length, record }, index) =>
						<Item
							key={index}
							value={index}
							length={length}
							record={records.has(index)}
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