const { negateDBValues } = require('../resources/scripts/algorithm');

describe('negateDBValues', () => {
    test('negates dB values and applies caps for laptop speaker type', () => {
      const dBValues = [-10, -10, 10, 10, 10, 10, 10];
      const speakerType = 'laptop';
      const result = negateDBValues(dBValues, speakerType);
      expect(result).toEqual([5, 5, -10, -10, -10, -10, -10]);
    });
  
    test('negates dB values and applies caps for bookshelf speaker type', () => {
      const dBValues = [10, 10, 10, 10, 10, -10, -10];
      const speakerType = 'bookshelf';
      const result = negateDBValues(dBValues, speakerType);
      expect(result).toEqual([-10, -10, -10, -10, -10, 7, 8]);
    });
    
    test('negates dB values and applies caps for portable speaker type', () => {
        const dBValues = [-10, -10, 10, 10, 10, 10, 10];
        const speakerType = 'portable';
        const result = negateDBValues(dBValues, speakerType);
        expect(result).toEqual([4, 5, -10, -10, -10, -10, -10]);
      });
    
      test('negates dB values and applies caps for soundbars speaker type', () => {
        const dBValues = [10, 10, 10, -10, -10, -10, -10];
        const speakerType = 'soundbar';
        const result = negateDBValues(dBValues, speakerType);
        expect(result).toEqual([-10, -10, -10, 10, 6, 6, 6]);
      });
    
      test('negates dB values and applies caps for Outdoor speakers type', () => {
        const dBValues = [10, 10, 10, 10, 10, -10, -10];
        const speakerType = 'outdoor';
        const result = negateDBValues(dBValues, speakerType);
        expect(result).toEqual([-10, -10, -10, -10, -10, 6, 7]);
      });
    
      test('negates dB values and applies caps for Gaming speakers type', () => {
        const dBValues = [10, 10, 10, 10, -10, -10, 10];
        const speakerType = 'desktop';
        const result = negateDBValues(dBValues, speakerType);
        expect(result).toEqual([-10, -10, -10, -10, 7, 8, -10]);
      });
    
      test('negates dB values and applies caps for Bluetooth Speakers type', () => {
        const dBValues = [-10, -10, 10, 10, 10, 10, 10];
        const speakerType = 'floorstanding';
        const result = negateDBValues(dBValues, speakerType);
        expect(result).toEqual([5, 5, -10, -10, -10, -10, -10]);
      });
});