/*
https://leetcode.com/problems/longest-palindromic-substring/description/

가장 먼저 생각나는건 
첫글자부터 시작, 2, 3, 4... n 길이의 글자를 전부 확인해서 회문인지 아닌지 확인, 회문이라면 max 길이를 기록
그 다음 두 번째 글자부터 시작 3, 4,... n 길이의 글자를 확인해서 회문인지 아닌지 확인, 회문이라면 max 길이를 기록
시간 복잡도는 최소 n^2 인데, 이거 1000글자밖에 안돼서 아마 이대로 완전 탐색 해도 충분히 가능할듯.

. 점화식
문자열 s[i...j]가 회문인지 확인하려면:
양쪽 끝 문자가 같아야 함: s[i] === s[j].
그 안쪽 문자열 s[i+1...j-1]도 회문이어야 함: dp[i+1][j-1] = true.
*/

const longestPalindrome = (s: string): string => {
    const l = s.length;
    // i~j 까지의 회문 여부를 저장하기 위한 배열을 초기화한다.
    const saved: boolean[][] = Array.from({ length: l }, () => Array.from({ length: l }, () => false));
    let answer = '';
    let min = 1;
    for (let length = 1; length <= l; length++) {
        for (let start = 0; start < l; start++) {
            const i = start;
            const j = start + length;
            if (j > l) {
                break;
            }
            const nowWord = s.slice(i, j);
            // 길이가 1이라면 반드시 회문이다.
            if (length === 1) {
                saved[i][j] = true;
                answer = nowWord;
            } else {
                // 길이가 2이상이라면, 일단 양 끝 글자가 같아야 한다.
                if (s[i] === s[j - 1] && s[i] !== undefined) {
                    // 길이가 2라면 그대로 회문이다.
                    if (length === 2) {
                        saved[i][j] = true;
                        answer = nowWord;
                    }
                    // 그리고 saved[i+1][j-1]이 true라면 회문이다.
                    else if (saved[i + 1][j - 1] === true) {
                        saved[i][j] = true;
                        answer = nowWord;
                    }
                }
            }
        }
    }
    return answer;
};

console.log(longestPalindrome('abcddcba')); // bab or aba
console.log(longestPalindrome('babad')); // bab or aba
console.log(longestPalindrome('cbbd')); // bb
console.log(longestPalindrome('a')); // a
