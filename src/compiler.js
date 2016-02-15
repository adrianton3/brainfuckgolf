(function () {
	'use strict'

	const MEMORY_SIZE = 256
	const ITERATIONS_MAX = 1000

	const simple = {
		header: `var m = new Uint8Array(${MEMORY_SIZE});\nvar p = 0;`,
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
		header: `var m = new Uint8Array(${MEMORY_SIZE});\nvar p = 0;\nvar s = 0;`,
		footer: 'return { result: m[p], pointer: p };',
		mapping: new Map([
			['+', 'm[p]++;'],
			['-', 'm[p]--;'],
			['>', `p++;\nif (p >= ${MEMORY_SIZE}) { return { error: "pointer out of bounds" }; }`],
			['<', 'p--;\nif (p < 0) { return { error: "pointer out of bounds" }; }'],
			['[', `while (m[p]) {\ns++;\nif (s > ${ITERATIONS_MAX}) {\nreturn { error: "timeout" };\n}`],
			[']', '}']
		])
	}

	function compile (source) {
		const { mapping, header, footer } = safe

		const commands = source.split('')
		const translated = commands.map((char) => mapping.get(char))
		const body = translated.join('\n')

		const jsSource = `${header}${body}${footer}`

		return new Function(jsSource)
	}

	window.bf = window.bf || {}
	window.bf.compile = compile
})();