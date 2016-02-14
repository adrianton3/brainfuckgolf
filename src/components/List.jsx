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
					{this.props.items.filter(Boolean)
						.map(({ result, length, record }) =>
							<Item
								key={result}
								value={result}
								length={length}
								record={records.has(result)}
								onClick={() => { this.props.onClick(result) }}
							/>
					)}
				</ul>
			)
		}
	})

	window.bf = window.bf || {}
	window.bf.List = List
})()