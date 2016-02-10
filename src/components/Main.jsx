(function () {
	'use strict'

	const { PropTypes } = React
	const { Ace, List } = bf

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
					const { items } = this.state
					const { length } = source

					if (!items[result] || length < items[result].length) {
						items[result] = { record: true, length, source }

						localStorage.setItem('items', JSON.stringify(items))
					} else {
						items[result].record = false
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
			const { source, result, error, items } = this.state

			return (
				<div>
					<Ace content={source} onChange={this._change} />

					<div className="result">
					{
						typeof result === 'number' ?
						`${result} (${source.length})` :
						error
					}
					</div>

					<List items={items} onClick={this._setSource}/>
				</div>
			)
		}
	})

	window.bf = window.bf || {}
	window.bf.Main = Main
})()