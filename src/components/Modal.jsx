(function () {
	'use strict'

	const { PropTypes } = React

	// top-level modal; nothing special
	const Modal = React.createClass({
		displayName: 'Modal',

		propTypes: {
			isOpen: PropTypes.bool.isRequired,
			onClose: PropTypes.func.isRequired
		},

		_handleClose () {
			this.props.onClose()
		},

		render () {
			const { isOpen } = this.props

			return (
				<div className={classNames({ hidden: !isOpen })}>
					<div className="overlay" onClick={this._handleClose}></div>
					<div className="modal">{this.props.children}</div>
				</div>
			)
		}
	})

	window.bf = window.bf || {}
	window.bf.Modal = Modal
})()