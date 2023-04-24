const renderMessage = (productName: string, mess: string): string => {
  return `${productName} - ${mess}`;
};

const MESSAGE = {
  ADD: 'add to cart successfully',
  REMOVE: 'remove from cart successfully',
};

export { renderMessage, MESSAGE };
