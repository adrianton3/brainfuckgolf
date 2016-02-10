(function () {
	'use strict'

	const simple = {
		header: 'var m = new Uint8Array(256); var p = 0;',
		footer: 'return { result: m[p] };',
		mapping: new Map([
			['+', 'm[p]++;'],
			['-', 'm[p]--;'],
			['>', 'p++;'],
			['<', 'p--;'],
			['[', 'while (m[p]) {'],
			[']', '}']
		])
	}

	const safe = {
		header: 'var m = new Uint8Array(256); var p = 0; var s = 0;',
		footer: 'return { result: m[p] };',
		mapping: new Map([
			['+', 'm[p]++;'],
			['-', 'm[p]--;'],
			['>', 'p++;'],
			['<', 'p--;'],
			['[', 'while (m[p]) { s++; if (s > 1000) { return { error: "timeout" }; }'],
			[']', '}']
		])
	}

	function compile (source) {
		const { mapping, header, footer } = safe

		const commands = source.split('')
		const translated = commands.map((char) => mapping.get(char))
		const body = translated.join(' ')

		const jsSource = `${header}${body}${footer}`

		return new Function(jsSource)
	}

	window.bf = window.bf || {}
	window.bf.compile = compile
})();