/*
https://leetcode.com/problems/reverse-string/description/

절반까지만 돌면서 자리 바꿔주면 된다. 
(.reverse 쓰면 한 방이다)
*/
const reverseString = (s: string[]): string[] => {
    let rIndex: number = s.length - 1;

    for (const i in s) {
        const index = Number(i);
        if (index >= rIndex) {
            break;
        }
        const tempChar = s[index];
        // 자리 바꾸기 시작
        s[index] = s[rIndex];
        s[rIndex] = tempChar;
        rIndex--;
    }

    console.log(rIndex);
    return s;
};

console.log(reverseString(['h', 'e', 'l', 'l', 'o'])); // ["o","l","l","e","h"]
console.log(reverseString(['H', 'a', 'n', 'n', 'a', 'h'])); // ["h","a","n","n","a","H"]
