/*
1의 계단을 오르는 방법은 1가지다. 

2의 계단을 오르는 방법은 1+1, 2계단 두가지다. 

3의 계단을 오르는 방법은 1계단을 오르고 나선 2의 계단을 오르는 방법의 가짓수(2)이다. 2계단을 한번에 오르고 나선 1계단 오르는 방법 (1)로 총 3가지다. 

4의 계단을 오르는 방법은 1의 계단을 오르고 나서는 3계단 오르는 방법 가짓수(3), 2계단 오르고 나서는 2의 계단을 오르는 방법 (2) 총 5가지다. 

이런식으로 숫자를 기록해서 n에 달할때까지 반복하자.
*/

const climbStairs = (n: number): number => {
    if (n < 3) {
        if (n === 1) return 1;
        if (n === 2) return 2;
    }
    // DP를 위해 저장할 map
    const saved: { [key: number]: number } = {};

    // 일단 1계단, 2계단 오르는 방법은 저장을 해놓자.
    saved[1] = 1;
    saved[2] = 2;

    // 따라서 3층부터 확인하면 된다.
    for (let s = 3; s <= n; s++) {
        let result = saved[s - 1] + saved[s - 2];
        saved[s] = result;
    }
    console.log(saved);
    return saved[n];
};

console.log(climbStairs(2)); // 2
console.log(climbStairs(3)); // 3
console.log(climbStairs(15)); // 987
