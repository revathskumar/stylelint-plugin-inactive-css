// Abbreviated example
const stylelint = require('stylelint');
const declarationValueIndex = require('stylelint/lib/utils/declarationValueIndex');

const { isGridContainer } = require('../utils');

const ruleName = 'inactive-css/grid';
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: (propName) => `${propName} has no effect on this element
    since it’s not a grid container. Try adding display:grid`,
});

module.exports = stylelint.createPlugin(ruleName, function(primaryOption, secondaryOptionObject) {
  return function(root, result) {
    // const validOptions = stylelint.utils.validateOptions(
    //   postcssResult,
    //   ruleName,
    //   {
    //     /* .. */
    //   }
    // );

    // if (!validOptions) {
    //   return;
    // }

    root.walkRules((rule) => {
      const propResult = {};

      const props = [
        'grid-auto-columns',
        'grid-auto-flow',
        'grid-auto-rows',
        'grid-template',
        'justify-items',
      ];

      props.forEach((prop) => {
        propResult[prop] = {};
        rule.walkDecls((decl) => {
          if (decl.prop === prop) {
            propResult[prop].found = true;
            propResult[prop].decl = decl;
          }

          if (isGridContainer(decl)) {
            propResult[prop].isGridContainer = true;
          }
        });

        if (propResult[prop].found && !propResult[prop].isGridContainer) {
          stylelint.utils.report({
            message: messages.expected(prop),
            node: propResult[prop].decl,
            index: declarationValueIndex(propResult[prop].decl),
            result,
            ruleName,
          });
        }
      });
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
