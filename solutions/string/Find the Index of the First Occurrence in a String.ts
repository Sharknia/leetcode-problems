/*
코드가 복잡해 보이는데 한 바퀴에 해결하려다 보니 이렇게 됐다. 
*/

const strStr = (haystack: string, needle: string): number => {
    if (needle === '') return 0; // 빈 needle은 항상 매칭
    if (haystack.length < needle.length) return -1; // needle이 더 길면 매칭 불가

    let index = 0;
    let hi = 0;
    let ni = 0;
    for (const c of haystack) {
        if (c == needle[ni]) {
            if (ni == 0) {
                hi = index;
            }
            ni++;
        } else {
            ni = 0;
            if (c == needle[ni]) {
                hi = index;
                ni++;
            }
        }
        if (ni == needle.length) {
            return hi;
        }
        index++;
    }

    return -1;
};

console.log(strStr('sadbutsad', 'sad')); // 0
console.log(strStr('leetcode', 'leeto')); // -1
