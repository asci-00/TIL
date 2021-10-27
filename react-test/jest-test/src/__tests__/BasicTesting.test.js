import { sum, sumList } from '../assets/js/common'

describe('더하기 시나리오', () => {
    it('sum : 1 + 2 = 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
    it('sum List : 1 ~ 10 = ?', () => {
        const list = (new Array(10).fill(0)).map((item, idx) => (idx + 1))
        expect(sumList(list)).toBe(55);
    });
})