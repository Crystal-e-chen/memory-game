const emojis = ["🐶","🐱","🐭","🐹","🐰","🦊"];
// 建立6對卡牌
let cards = [...emojis, ...emojis];
// Fisher-Yates 洗牌演算法隨機打亂卡牌順序
for (let i = cards.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [cards[i], cards[j]] = [cards[j], cards[i]];
}

const gameBoard = document.querySelector('#gameBoard');
let firstCard = null, secondCard = null;
let lockBoard = false;
let matches = 0;

// 初始化生成卡牌元素
cards.forEach((emoji, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.emoji = emoji;
  card.textContent = emoji;
  gameBoard.appendChild(card);
});

// 為遊戲版面註冊點擊事件監聽器
gameBoard.addEventListener('click', function(e) {
  const clicked = e.target;
  // 點擊的必須是卡牌本身，且當前不在暫時鎖定中
  if (clicked.classList.contains('card') && !lockBoard) {
    clicked.classList.add('flipped');  // 翻開卡牌
    if (!firstCard) {
      // 第一張卡牌
      firstCard = clicked;
      return;
    }
    // 第二張卡牌
    secondCard = clicked;
    // 檢查是否配對
    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
      matches++;
      firstCard = secondCard = null;
      // 若所有配對完成，顯示完成提示
      if (matches === emojis.length) {
        document.getElementById('message').textContent = "完成了！";
      }
    } else {
      // 配對失敗：短暫延遲後翻回卡牌
      lockBoard = true;
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard = secondCard = null;
        lockBoard = false;
      }, 1000);
    }
  }
});
