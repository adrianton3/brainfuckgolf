(function () {
	'use strict'

	const { PropTypes } = React

	const Result = React.createClass({
		displayName: 'Result',

		propTypes: {
			result: PropTypes.number,
			length: PropTypes.number,
			error: PropTypes.string
		},

		render () {
			const { result, length, error } = this.props

			return typeof result === 'number' ? (
				<div className="result">
					<span className="fade">mem[0]:&nbsp;</span>
					{result}&nbsp;
					<span className="fade">length:&nbsp;</span>
					{length}
				</div>
			) : (
				<div className="result">
					{error}
				</div>
			)
		}
	})

	window.bf = window.bf || {}
	window.bf.Result = Result
})()