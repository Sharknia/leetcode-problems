const input = 'cv2[ab4[ua3[t]o]]h4[y]ab';
// ouput cvabuatttouatttouatttouatttoabuatttouatttouatttouatttohyyyyab

//mycode
// 현재 index와 문자열을 통째로 파라미터로 넘겨받는다.
const decodemy = (index: number, s: string): [string, number] => {
    // 완성된 문자열과 증가한 index를 리턴
    let answer = '';
    const c = s[index];
    let x: number = parseInt(c);
    // 다음 문자도 숫자인지를 확인한다.
    for (let i = 1; i < input.length; i++) {
        // 다음 문자
        const t = input[index + i];
        // 다음문자도 숫자라면
        if (parseInt(t) || parseInt(t) === 0) {
            x = x * 10 + parseInt(t);
            index++;
        } else break;
    }
    for (let i = index + 2; i <= input.length; i++) {
        // 디코딩 해야 할 다음 문자열 안에 숫자가 존재한다면 한 번 더 decode 호출
        if (s[i] === ']') return ['0', 0];
        if (parseInt(s[i]) || parseInt(s[i]) === 0) {
            const decodeResult: [string, number] = decode(i, input);
            answer += decodeResult[0];
            index = decodeResult[1];
        }
    }
    let tempString = '';
    // 숫자와 [를 제외한 나머지 문자열을 tempString으로 저장하고, ]를 만난다면 멈춘다.
    for (let i = index + 2; i < input.length; i++) {
        index++;
        if (input[i] !== ']') {
            tempString += input[i];
        } else break;
    }
    // 숫자만큼 tempString을 리턴값에 반복해서 더해준다.
    for (let i = 0; i < x; i++) {
        answer += tempString;
    }
    console.log(s.slice(index), answer);
    index++;
    let result: [string, number] = [answer, index];
    return result;
};

//chatgpt code
const decode = (index: number, s: string): [string, number] => {
    let answer = '';
    let num = 0; // 숫자를 저장할 변수 (초기값)

    // 연속된 숫자 파싱
    while (index < s.length && !isNaN(parseInt(s[index]))) {
        num = num * 10 + parseInt(s[index]); // 연속된 숫자를 누적
        index++;
    }

    // '['을 만난 이후 처리
    if (s[index] === '[') {
        index++; // '[' 건너뜀
        let temp = '';

        // 중첩 대괄호 처리
        while (s[index] !== ']') {
            if (!isNaN(parseInt(s[index]))) {
                const [decoded, nextIndex] = decode(index, s); // 재귀 호출
                temp += decoded;
                index = nextIndex;
            } else {
                temp += s[index]; // 단순 문자 누적
                index++;
            }
        }

        index++; // ']' 건너뜀
        answer += temp.repeat(num); // 숫자만큼 반복 추가
    }

    return [answer, index];
};

function run(input: string): string {
    let answer: string = '';
    // 문자를 돌면서 숫자 여부를 확인
    for (let index = 0; index < input.length; index++) {
        const c: string = input[index];
        // 숫자를 만난다면 다음 괄호 안의 문자열을 반복해야 한다.
        if (parseInt(c)) {
            const decodeResult: [string, number] = decode(index, input);
            answer += decodeResult[0];
            index = decodeResult[1];
        }
        // 숫자가 아니라면 바로 답안에 더한다.
        else {
            answer = answer + c;
        }
    }
    return answer;
}

console.log(run(input));
