(function () {
	'use strict'

	const { PropTypes } = React
	const { List, Input } = bf

	const RECORDS_MAX_LENGTH = 3

	const Main = React.createClass({
		displayName: 'Main',

		propTypes: {
			items: PropTypes.array
		},

		getDefaultProps () {
			return {
				items: []
			}
		},

		getInitialState () {
			return {
				source: '',
				items: this.props.items || [],
				records: [],
				value: 0,
				error: null
			}
		},

		_change (source) {
			this.setState({ source })

			try {
				const program = bf.compile(source)
				const { result, error } = program()

				if (!error) {
					const { items, records } = this.state
					const { length } = source

					if (!items[result] || length < items[result].length) {
						items[result] = { result, length, source }

						if (records.length >= RECORDS_MAX_LENGTH) {
							records.shift()
						}
						records.push(result)

						localStorage.setItem('items', JSON.stringify(items))
					}
				}

				this.setState({ result, error })
			} catch (ex) {
				this.setState({ result: null, error: 'bad program' })
			}
		},

		componentDidMount () {
			this._change('')
		},

		_setSource (index) {
			const { source } = this.state.items[index]
			this.setState({
				source,
				result: index
			})
		},

		render () {
			const { source, result, error, items, records } = this.state

			return (
				<div>
					<Input content={source} onChange={this._change} />

					{
						typeof result === 'number' ? (
							<div className="result">
								<span className="fade">mem[0]:&nbsp;</span>
								{result}&nbsp;
								<span className="fade">chars:&nbsp;</span>
								{source.length}
							</div>
						) : (
							<div className="result">
								{error}
							</div>
						)
					}

					<List
						items={items}
						records={records}
						onClick={this._setSource}
					/>
				</div>
			)
		}
	})

	window.bf = window.bf || {}
	window.bf.Main = Main
})()