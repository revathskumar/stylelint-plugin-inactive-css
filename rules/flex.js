// Abbreviated example
const stylelint = require("stylelint");
const declarationValueIndex = require("stylelint/lib/utils/declarationValueIndex");

const ruleName = "inactive-css/flex";
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: propName => `${propName} will be inactive`
});

module.exports = stylelint.createPlugin(ruleName, function(
  primaryOption,
  secondaryOptionObject
) {
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

    const isFlexParent = decl => {
      return (
        decl.prop === "display" &&
        ["flex", "inline-flex"].indexOf(decl.value) >= 0
      );
    };

    root.walkRules(rule => {
      const propResult = {};

      const props = [
        "flex-wrap",
        "align-content",
        "align-items",
        "gap",
        "flex-direction",
        "flex-flow"
      ];

      props.forEach(prop => {
        propResult[prop] = {};
        rule.walkDecls(decl => {
          if (decl.prop === prop) {
            propResult[prop].found = true;
            propResult[prop].decl = decl;
          }

          propResult[prop].isFlexFound = isFlexParent(decl);
        });

        if (propResult[prop].found && !propResult[prop].isFlexFound) {
          stylelint.utils.report({
            message: messages.expected(prop),
            node: propResult[prop].decl,
            index: declarationValueIndex(propResult[prop].decl),
            result,
            ruleName
          });
        }
      });
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
