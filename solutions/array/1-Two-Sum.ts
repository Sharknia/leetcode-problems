/*
https://leetcode.com/problems/two-sum/description/

input들에 대한 조건이 까다롭게 문제에 이미 정의되어 있어서 그냥 풀면 된다.

numMap[t] !== index 조건을 생각하지 못해 오류를 겪음. 
*/

const twoSum = (nums: number[], target: number): number[] => {
    const numMap: { [key: number]: number } = {};
    // 해시맵에 값 : 인덱스의 꼴로 저장한다.
    for (const i in nums) {
        const index: number = Number(i);
        numMap[nums[index]] = index;
    }
    console.log(numMap);
    let answer: number[] = [];

    // 배열을 돌면서
    let index = 0;
    for (const num of nums) {
        // 합이 타겟이 되기 위한 숫자 t를 구한다.
        const t: number = target - num;
        // 만일 t가 0보다 작다면 패스한다.
        if (t < 0) {
            continue;
        } else {
            // t가 numMap에 있는지 확인한다. 단 그 인덱스는 현재의 인덱스와 같지 않아야 한다.
            if (numMap[t] !== undefined && numMap[t] !== index) {
                // 값이 존재한다면 정답이다. numMap의 값과 현재 index를 배열로 묶어 리턴한다.
                return [numMap[t], index];
            }
        }
        index++;
    }

    return answer;
};

console.log(twoSum([2, 7, 11, 15], 9)); // [0,1]
console.log(twoSum([3, 2, 4], 6)); // [1,2]
console.log(twoSum([3, 3], 6)); // [0,1]
