export const parseRuleStringToAST = (ruleString: string) => {
    // Split ruleString based on operators like AND, OR
    const operators = ['AND', 'OR'];
    const tokens = ruleString.split(/\s+/);
  
    const createNode = (type: string, left: any, right: any, value?: any) => ({
      type, left, right, value
    });
  
    let stack : any = [];
    for (let token of tokens) {
      if (operators.includes(token)) {
        const right = stack.pop();
        const left = stack.pop();
        stack.push(createNode('operator', left, right, token));
      } else {
        // Assuming operand (e.g., age > 30)
        stack.push(createNode('operand', null, null, token));
      }
    }
  
    return stack.pop(); // The root of the AST
  };