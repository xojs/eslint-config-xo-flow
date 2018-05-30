import test from 'ava';
import tempWrite from 'temp-write';
import eslint from 'eslint';
import config from '..';

const hasRule = (errors, ruleId) => errors.some(x => x.ruleId === ruleId);

function runEslint(string, config) {
	const linter = new eslint.CLIEngine({
		useEslintrc: false,
		configFile: tempWrite.sync(JSON.stringify(config))
	});

	return linter.executeOnText(string).results[0].messages;
}

test('main', t => {
	const errors = runEslint('// @flow\nconst foo: Array<number> = [];', config);
	t.true(hasRule(errors, 'flowtype/array-style-simple-type'));
});
