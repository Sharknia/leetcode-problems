/*
79. Word Search - Medium
https://leetcode.com/problems/word-search/description/

완전탐색을 할 수 밖에 없다. 
모든 경우의 수를 다 따져봐야 하기 때문이다.

DFS로 풀었었지만 큐를 활용해 BFS로 다시 구현해봤습니다. 
*/
const solve = (board: string[][], word: string): boolean => {
    // 게임판의 크기
    const lx = board[0].length;
    const ly = board.length;

    for (let dy = 0; dy < ly; dy++) {
        for (let dx = 0; dx < lx; dx++) {
            // 낭비를 줄이기 위해 word의 첫글자와 현재 글자가 같은 경우에만 작업을 한다.
            if (board[dy][dx] === word[0]) {
                const queue: [number, number, string][] = []; //dx, dy, 검사할 word
                const visited: boolean[][] = Array.from({ length: ly }, () => Array.from({ length: lx }, () => false)); // 방문했으면 true
                queue.push([dx, dy, word]);
                while (queue.length > 0) {
                    const now: [number, number, string] = queue.shift()!;
                    const nowx = now[0];
                    const nowy = now[1];
                    const nowword = now[2];

                    // 게임판을 벗어났다면 패스
                    if (nowx < 0 || nowy < 0 || nowx >= lx || nowy >= ly) {
                        continue;
                    }
                    // 방문했다면 패스
                    else if (visited[nowy][nowx]) {
                        continue;
                    }
                    // 현재 글자가 검사해야 할 첫글자와 다르다면 패스
                    else if (board[nowy][nowx] !== nowword[0]) {
                        continue;
                    }
                    // 게임판 안에 있는데, 글자가 일치하고, 방문한 적도 없는 곳이라면!
                    else {
                        // 방문처리
                        visited[nowy][nowx] = true;
                        // nowword에서 앞글자를 하나 뗀다.
                        const nextword = nowword.slice(1);
                        // 만약 nextword가 비었다면 정답이다.
                        if (nextword.length == 0) {
                            return true;
                        }
                        queue.push([nowx + 1, nowy, nextword]);
                        queue.push([nowx, nowy + 1, nextword]);
                        queue.push([nowx - 1, nowy, nextword]);
                        queue.push([nowx, nowy - 1, nextword]);
                    }
                }
            }
        }
    }

    return false;
};

console.log(
    solve(
        [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E'],
        ],
        'ABCCED'
    )
);
