/*
417. Pacific Atlantic Water Flow
https://leetcode.com/problems/pacific-atlantic-water-flow/description/

이 문제는 언뜻 봤을 때 높은 곳에서 낮은 곳으로 흐를 수 있는지를 찾는 문제라고 생각하기 쉽지만
사실은 낮은곳에서 찾아가는게 더 좋을거 같다.
바다에 접한 면부터 이 면이 어디까지 거슬러 올라갈 수 있는지, 즉 그럼 그 거슬러 올라간 면들은 그 바다로 나갈 수 있다.
그래서 테두리만 돌면서 거슬러 올라가서 봉우리마다 어느 바로 흘러갈 수 있는지 체크를 하자.
그리고 완성된 지도를 보면서 좌표를 만들자
*/

const solution = (heights: number[][]): number[][] => {
    // 지도의 크기
    const lx = heights[0].length;
    const ly = heights.length;
    // 같은 크기의 지도를 만들자. 이 곳에 어느 바다로 흘러갈 수 있는지 체크할 것이다.
    const ableMap: string[][] = [];
    for (let y = 0; y < ly; y++) {
        let row: string[] = [];
        for (let x = 0; x < lx; x++) {
            row.push('');
        }
        ableMap.push(row);
    }
    //테두리에서 시작한다.
    for (let dy = 0; dy < ly; dy++) {
        for (let dx = 0; dx < lx; dx++) {
            // 테두리일때만
            if (dx === 0 || dy === 0 || dx === lx - 1 || dy === ly - 1) {
                const visited: Set<string> = new Set();
                const stack: [number, number, number][] = [];
                let sea = '';
                // 닿아있는 바다의 종류를 정의한다.
                if (dx === 0 || dy === 0) sea += 'P';
                if (dx === lx - 1 || dy === ly - 1) sea += 'A';

                stack.push([dx, dy, heights[dy][dx]]);

                while (stack.length > 0) {
                    const now = stack.pop()!;

                    const nowx = now[0]; // 현재 x좌표
                    const nowy = now[1]; // 현재 y좌표
                    const lastHeight = now[2]; // 이전 좌표의 높이

                    // 지도에서 벗어났다면
                    if (nowx < 0 || nowx >= lx || nowy < 0 || nowy >= ly) {
                        continue;
                    }
                    // 이미 방문한 곳이라면
                    else if (visited.has(`${nowx}, ${nowy}`)) {
                        continue;
                    } else {
                        // 방문 표시
                        visited.add(`${nowx}, ${nowy}`);
                        const nowHeight = heights[nowy][nowx];
                        // 현재 위치가 이전보다 더 높거나 같다면 지도를 갱신하고 다음 좌표로 흐르자.
                        if (nowHeight >= lastHeight) {
                            const tempAble = ableMap[nowy][nowx];
                            // 내가 두 면과 모두 닿은 봉우리라면 볼 것 없이 PA로 덮어씌운다.
                            // 만약 지금까지 마킹된 적이 없는 봉우리라면 내 바다로 덮어씌운다.
                            if (sea === 'PA' || tempAble.length === 0) ableMap[nowy][nowx] = sea;
                            // 마킹된 적이 있는데, 지금 내 바다랑 닿은게 아니라면 두 바다 모두 가능하다.
                            else if (tempAble !== sea) {
                                ableMap[nowy][nowx] = 'PA';
                            }
                            stack.push([nowx + 1, nowy, nowHeight]);
                            stack.push([nowx, nowy + 1, nowHeight]);
                            stack.push([nowx - 1, nowy, nowHeight]);
                            stack.push([nowx, nowy - 1, nowHeight]);
                        }
                    }
                }
            }
        }
    }
    const answer: [number, number][] = [];
    for (let dx = 0; dx < lx; dx++) {
        for (let dy = 0; dy < ly; dy++) {
            if (ableMap[dy][dx] == 'PA') {
                answer.push([dx, dy]);
            }
        }
    }
    return answer;
};

console.log(
    solution([
        [1, 2, 2, 3, 5],
        [3, 2, 3, 4, 4],
        [2, 4, 5, 3, 1],
        [6, 7, 1, 4, 5],
        [5, 1, 1, 2, 4],
    ])
);
