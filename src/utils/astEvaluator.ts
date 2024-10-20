export const evaluateAST = (ast: any, userData: any): boolean => {
    const evaluateNode = (node: any): boolean => {
      if (node.type === 'operator') {
        const leftResult = evaluateNode(node.left);
        const rightResult = evaluateNode(node.right);
        if (node.value === 'AND') return leftResult && rightResult;
        if (node.value === 'OR') return leftResult || rightResult;
      } else if (node.type === 'operand') {
        // Process the operand (e.g., age > 30)
        const [attr, operator, val] = node.value.split(' '); // e.g., age > 30
        const attributeValue = userData[attr];
        switch (operator) {
          case '>': return attributeValue > parseFloat(val);
          case '<': return attributeValue < parseFloat(val);
          case '=': return attributeValue === val;
          default: return false;
        }
      }
      return false;
    };
  
    return evaluateNode(ast);
  };
  