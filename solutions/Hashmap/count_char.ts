/*

해당 사이트의 문제는 아닌데 그냥 혼자 풀어봤습니다.

*/

const countString = (input: string) => {
    const charCount: { [key: string]: number } = {};

    let answer = '';

    for (const i of input) {
        if (charCount[i] !== undefined) {
            charCount[i] = charCount[i] + 1;
        } else {
            charCount[i] = 1;
        }
    }

    for (const i in charCount) {
        // 타입 일치시키도록 하자.
        answer += i + String(charCount[i]);
    }

    return answer;
};

console.log(countString('aaaabbcddd'));
