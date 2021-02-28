const linearCategories = (categories, options = []) => {
  for (let cate of categories) {
    options.push({
      value: cate._id,
      name: cate.name,
      parentId: cate.parentId,
      type: cate.type,
    });
    if (cate.children.length > 0) {
      linearCategories(cate.children, options);
    }
  }
  return options;
};

export default linearCategories;
