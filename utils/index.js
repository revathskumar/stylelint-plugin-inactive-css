const isGridContainer = decl => {
  return (
    decl.prop === "display" && ["grid", "inline-grid"].indexOf(decl.value) >= 0
  );
};

const isFlexContainer = decl => {
  return (
    decl.prop === "display" && ["flex", "inline-flex"].indexOf(decl.value) >= 0
  );
};

const isFlexItem = decl => {
  return isFlexContainer(decl.parent);
};

const isGridItem = decl => {
  return isGridContainer(decl.parent);
};

module.exports = {
  isGridContainer,
  isGridItem,
  isFlexContainer,
  isFlexItem
};
