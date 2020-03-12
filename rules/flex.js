// Abbreviated example
const stylelint = require('stylelint');
const declarationValueIndex = require('stylelint/lib/utils/declarationValueIndex');

const { isFlexContainer } = require('../utils');

const ruleName = 'inactive-css/flex';
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: (propName) => `${propName} has no effect on this element
  since it’s neither a flex container nor a grid container.
  Try adding display:grid or display:flex.`,
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
        'flex-wrap',
        'align-content',
        'align-items',
        'gap',
        'flex-direction',
        'flex-flow',
      ];

      props.forEach((prop) => {
        propResult[prop] = {};
        rule.walkDecls((decl) => {
          if (decl.prop === prop) {
            propResult[prop].found = true;
            propResult[prop].decl = decl;
          }

          if (isFlexContainer(decl)) {
            propResult[prop].isFlexContainer = true;
          }
        });

        if (propResult[prop].found && !propResult[prop].isFlexContainer) {
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
