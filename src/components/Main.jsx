(function () {
	'use strict'

	const { PropTypes } = React
	const { Input, Result, List } = bf

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
					<div className="input-container">
						<span className="description">
							For every number from 0 to 255 find the shortest brainfuck program that generates it
							in the first memory cell.
						</span>
						<Input content={source} onChange={this._change} />
					</div>

					<Result
						result={result}
						length={source.length}
						error={error}
					/>

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