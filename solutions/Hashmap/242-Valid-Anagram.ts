/*
https://leetcode.com/problems/valid-anagram/description/

해시맵에 넣어놓고 값을 비교하면 되겠다.
*/

const isAnagram = (s: string, t: string): boolean => {
    const countChar: { [key: string]: number } = {};

    // 먼저 s를 돌면서 해시맵을 기록한다.
    for (const i of s) {
        if (countChar[i] === undefined) {
            countChar[i] = 1;
        } else {
            countChar[i]++;
        }
    }

    // t를 돌면서 해시맵의 숫자를 -- 한다. 만약 키값이 존재하지 않으면 바로 return false
    for (const i of t) {
        if (countChar[i] === undefined) {
            return false;
        } else {
            countChar[i]--;
        }
    }

    // 다 돌았는데 맵의 카운트가 0이 아닌게 있다면 return false
    for (const i in countChar) {
        if (countChar[i] > 0) {
            return false;
        }
    }

    return true;
};

console.log(isAnagram('anagram', 'nagaram'));
console.log(isAnagram('anagram', 'nagaam'));
