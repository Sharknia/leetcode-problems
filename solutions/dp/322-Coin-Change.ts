const coinChange = (coins: number[], amount: number): number => {
    if (amount === 0) return 0;
    // 금액에 따른 동전 최소 동전 갯수를 저장하기 위한 map
    // 0원을 위해서는 동전이 0개가 필요하다.
    const coinMap: { [key: number]: number } = { 0: 0 };
    // 동전을 작은것부터 집어넣자. coins를 정렬해주자.
    coins = coins.sort((a, b) => a - b);
    for (let a = 1; a <= amount; a++) {
        let min: number = Infinity;
        for (let c of coins) {
            // 동전을 넣을 수 있다면
            if (a > c) {
                min = Math.min(coinMap[a - c] + 1, min);
            }
            // 동전이 딱 맞아 떨어진다면 방법이 있다.
            else if (a === c) {
                min = 1;
            }
        }
        coinMap[a] = min;
    }
    // 저장된 수가 무한이면 방법이 없는 것으로 -1을 리턴
    return coinMap[amount] === Infinity ? -1 : coinMap[amount];
};

console.log(coinChange([1, 2, 5], 11)); // 3
console.log(coinChange([2], 3)); // -1
console.log(coinChange([1], 0)); // 0
