/*
(Set을 쓰면 한 방인데)
메모리에 대한 조건이 까다롭게 걸려있다. 기존 배열을 재활용해야 한다. 
실제 업무에 있어서는 이런 제약은 의미가 적다고 생각한다. 
덜 진지하게 풀었다. 
*/

const removeDuplicates = (nums: number[]): number => {
    if (nums.length === 0) return 0;

    let uniqueIndex = 0; // 중복되지 않은 값의 저장 위치

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[uniqueIndex]) {
            // 새로운 값 발견
            uniqueIndex++; // 위치 이동
            nums[uniqueIndex] = nums[i]; // 새로운 값 저장
        }
    }
    return uniqueIndex + 1; // 중복 제거 후 배열의 길이
};

console.log(removeDuplicates([1, 1, 2, 2, 3, 3])); // 4
