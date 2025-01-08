/*
결국 내가 생각하는 대로 그 모양을 코드로 짜주면 된다고 생각하자. 
어렵게 생각하지말자. 
*/

const maxProfit = (prices: number[]): number => {
    let minPrice = Infinity;
    let answer = 0;

    for (const price of prices) {
        // 내가 오늘까지 살 수 있는 최저가 갱신!
        if (minPrice > price) {
            minPrice = price;
        }
        // 사는 날!
        if (minPrice < price) {
            let tempAnswer = price - minPrice;
            if (tempAnswer > answer) {
                answer = tempAnswer;
            }
        }
    }

    return answer;
};

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5
console.log(maxProfit([7, 6, 4, 3, 1])); // 0
