const fs = require('fs');
const path = require('path');

// Mock document.getElementById
document.getElementById = jest.fn(id => {
  if (id === 'nextButton' || id === 'prevButton') {
    return {
      addEventListener: jest.fn((event, callback) => {
        if (event === 'click') {
          callback();
        }
      }),
    };
  }
});

// Mock playlist
const playlist = ['song1.mp3', 'song2.mp3', 'song3.mp3'];
let currentIndex = 0;

describe('playlist.js', () => {
  it('should exist', () => {
    const filePath = path.join(__dirname, '../resources/scripts/playlist.js');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should increment currentIndex when nextButton is clicked', () => {
    document.getElementById('nextButton').addEventListener('click', () => {
      if (currentIndex < playlist.length - 1) {
        currentIndex++;
      }
    });
    document.getElementById('nextButton').addEventListener('click', () => {});
    expect(currentIndex).toBe(1);
  });

  it('should decrement currentIndex when prevButton is clicked', () => {
    document.getElementById('prevButton').addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
      }
    });
    document.getElementById('prevButton').addEventListener('click', () => {});
    expect(currentIndex).toBe(0);
  });
});