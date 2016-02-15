(function () {
	'use strict'

	const { Main } = bf

	const items = JSON.parse(localStorage.getItem('solutions'))

	React.render(
		<Main items={items} />,
		document.getElementById('app')
	)
})()
