export const combineASTs = (astList: any[]) => {
    const createNode = (type: string, left: any, right: any, value?: any) => ({
      type, left, right, value
    });
  
    // Combining ASTs using AND operator
    let combinedAST = astList[0];
    for (let i = 1; i < astList.length; i++) {
      combinedAST = createNode('operator', combinedAST, astList[i], 'AND');
    }
  
    return combinedAST;
  };
  