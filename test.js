import test from 'ava';
import zut from './';
import messages from './messages.js';

test('say something random', t => {
	t.plan(2);
	t.is(typeof zut(), 'String');
	t.not(zut(), zut());
});

test('say "Hello World!"', t => {
	t.plan(2);
	t.is(zut({messages: 'Hello World!'}), 'Hello World!');
	t.is(zut('Hello World!'), 'Hello World!');
});

test('say an error message', t => {
	t.plan(1);
	t.true(messages.errors.indexOf(zut({filter: 'errors'})) >= 0);
});
