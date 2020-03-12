'use strict';

const rule = require('../grid');
const { messages, ruleName } = rule;

testRule(rule, {
  ruleName,
  config: ['always'],
  // fix: true,

  accept: [
    {
      code: 'a { display: grid; grid-auto-columns: auto }',
      description: 'grid-auto-columns with grid',
    },
    {
      code: 'a { display: inline-grid; grid-auto-columns: auto }',
      description: 'grid-auto-columns with inline-grid',
    },
    {
      code: 'a { display: grid; grid-auto-rows:auto }',
      description: 'grid-auto-rows with grid',
    },
    {
      code: 'a { display: grid; grid-template: 1fr; }',
      description: 'grid-template with grid',
    },
    {
      code: 'a { display: grid; grid-auto-flow:auto }',
      description: 'grid-auto-flow with grid',
    },
    {
      code: 'a { display: grid; justify-items: auto  }',
      description: 'justify-items with grid',
    },
    {
      code: 'a { grid-auto-columns: auto; display: grid; }',
      description: 'grid-auto-columns with grid defined later',
    },
  ],

  reject: [
    {
      code: 'a { grid-auto-columns: auto }',
      message: messages.expected('grid-auto-columns'),
      line: 1,
      column: 24,
    },
    {
      code: 'a { grid-auto-rows: auto }',
      message: messages.expected('grid-auto-rows'),
      line: 1,
      column: 21,
    },
    {
      code: 'a { grid-template: 1fr; }',
      message: messages.expected('grid-template'),
      line: 1,
      column: 20,
    },
    {
      code: 'a { justify-items: auto; }',
      message: messages.expected('justify-items'),
      line: 1,
      column: 20,
    },
  ],
});
