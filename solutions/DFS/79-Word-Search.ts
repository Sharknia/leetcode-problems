/*
79. Word Search - Medium
https://leetcode.com/problems/word-search/description/

완전탐색을 할 수 밖에 없다. 
모든 경우의 수를 다 따져봐야 하기 때문이다.
*/

const exits = (board: string[][], word: string): boolean => {
    const nx = board[0].length;
    const ny = board.length;
    for (let dy = 0; dy < ny; dy++) {
        for (let dx = 0; dx < nx; dx++) {
            const visited: Set<string> = new Set();
            const stack: [number, number, string][] = [];
            stack.push([dx, dy, word]);
            while (stack.length > 0) {
                const now: [number, number, string] = stack.pop()!;
                const nowx: number = now[0];
                const nowy: number = now[1];
                const nowWord: string = now[2];

                // 이미 방문했거나, 좌표에서 벗어났거나 지금 문자열과 일치하지 않는다면 무효
                if (nowx < 0 || nowx >= nx || nowy < 0 || nowy >= ny || visited.has(`${nowx}, ${nowy}`)) {
                    continue;
                } else {
                    const nowChar = board[nowy][nowx];
                    if (nowChar !== nowWord[0]) {
                        continue;
                    } else {
                        // 방문처리
                        visited.add(`${nowx}, ${nowy}`);
                        // 다음칸 방문
                        const nextWord = nowWord.slice(1, nowWord.length + 1);

                        if (nextWord.length === 0) {
                            return true;
                        }
                        stack.push([nowx + 1, nowy, nextWord]);
                        stack.push([nowx, nowy + 1, nextWord]);
                        stack.push([nowx - 1, nowy, nextWord]);
                        stack.push([nowx, nowy - 1, nextWord]);
                    }
                }
            }
        }
    }
    return false;
};

console.log(
    exits(
        [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E'],
        ],
        'ABCCED'
    )
); // true
console.log(
    exits(
        [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E'],
        ],
        'SEE'
    )
); //true
console.log(
    exits(
        [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E'],
        ],
        'ABCB'
    )
); //false
console.log(
    exits(
        [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E'],
        ],
        'Z'
    )
); //false

/*
  [
    ["A","B","C","E"],
    ["S","F","C","S"],
    ["A","D","E","E"]
  ]
  */
