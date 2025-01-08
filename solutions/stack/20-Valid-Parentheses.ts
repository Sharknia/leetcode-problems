/*
https://leetcode.com/problems/valid-parentheses/
유서가 깊은 괄호 짝맞추기다. 
*/

const isValid = (s: string): boolean => {
    const stack: string[] = [];

    for (const c of s) {
        // push 하는 경우
        if (c === '[' || c === '{' || c === '(') {
            stack.push(c);
        }
        // pop 하는 경우
        else {
            const compare = stack.pop();
            if (c === ']' && compare !== '[') {
                return false;
            }
            if (c === '}' && compare !== '{') {
                return false;
            }
            if (c === ')' && compare !== '(') {
                return false;
            }
        }
    }
    // for문이 끝났는데 스택이 비어있다면 return true, 아니라면 return false
    if (stack.length > 0) return false;
    return true;
};

console.log(isValid('()')); // true
console.log(isValid('()[]{}')); // true
console.log(isValid('(]')); // false
console.log(isValid('([])')); // true
console.log(isValid('{[}]')); // false (잘못된 순서)
