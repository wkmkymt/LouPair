/* ==============================================================
 * ==========                                                ==========
 * ==========                    Sui Jack                    ==========
 * ==========                                                ==========
 * ============================================================== */

var SuiJack = (function() {

  /* ===============
   *   Constructor
   * =============== */
  function SuiJack(appID, scoreID, cardNum, pairNum) {
    /* Board */
    this.board = $("#" + appID);

    /* Card Number */
    this.CARD_NUM = cardNum;
    this.PAIR_NUM = pairNum;

    /* Card List */
    this.cards         = [];
    this.selectedCards = [];

    /* Flag */
    this.isJudging = false;

    /* Score */
    this.scoreField = $("#" + scoreID);
    this.score      = 0;

    /* Words */
    this.WORDS = [
      { "ja": "INU", "en": "dog"},
      { "ja": "NEKO", "en": "cat"},
      { "ja": "TORI", "en": "bird"}
    ];

    /* Class Name */
    this.CLASS = {
      "CARD":     "card",
      "SELECTED": "selected",
      "GOT":      "got"
    };
  }


  /* =============
   *   Start Game
   * ============= */
  function startGame() {
    /* Append Cards to List */
    this.entryCards();

    /* Display Cards to Board */
    var self = this;
    var cardList = self.getCardElmList(self, this.CARD_NUM, 0);
    this.board.append(cardList);

    /* Display Score */
    this.updateScore();
  }


  /* =============
   *   Entry Cards
   * ============= */
  function entryCards() {
    for(var i = 0; i < this.CARD_NUM / 2; i++) {
      var cardID    = Math.floor(i % this.PAIR_NUM);
      var cardWord  = this.WORDS[cardID];

      this.cards[i * 2 + 0] = createCardObj(cardID, cardWord["ja"], "ja");
      this.cards[i * 2 + 1] = createCardObj(cardID, cardWord["en"], "en");
    }

    shuffleCards(this.cards);

    /* === Shuffle Cards === */
    function shuffleCards(array) {
      for(var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));

        var tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
      }
    }

    /* === Create Card Object === */
    function createCardObj(id, word, lang) {
      var card = new Card(id, word, lang);

      return card;
    }
  }


  /* =======================
   *   Get Card Element List
   * ======================= */
  function getCardElmList(self, max, index) {
    var cardList = [];
    for(var i = 0; i < max; i++) {
      var word    = this.cards[i].word;
      var cardElm = createCardElm(this.CLASS.CARD, i + index, word, function() { selectCard($(this), self); });
      cardList[i] = cardElm;
    }

    return cardList;

    /* === Create Card Element === */
    function createCardElm(className, index, word, touchEvent) {
      var text = $("<span>")
            .text(word)
            .hide();
      var card = $("<div>")
            .addClass(className)
            .attr("id", className + index)
            .bind("click touchstart", touchEvent)
            .append(text);

      return card;
    }
  }


  /* ===============
   *   Select Card
   * =============== */
  function selectCard($this, self) {
    var cardIndex = $this[0].id.replace(self.CLASS.CARD, "");
    var card      = self.cards[Number(cardIndex)];

    if(!self.isJudging && !card.isTurning) {
      card.isTurning = true;
      $this.addClass(self.CLASS.SELECTED);
      $this.children().fadeIn();
      console.log($this.children().text());

      self.selectedCards.push(card);

      if(self.selectedCards.length >= 2)
        judgeCard(self, self.selectedCards);
    }
  }


  /* ==============
   *   Judge Card
   * ============== */
  function judgeCard(self, cards) {
    self.isJudging = true;

    setTimeout(function() {
      /* Same Pairs */
      if(cards[0].ID == cards[1].ID && cards[0].lang != cards[1].lang) {
        $("." + self.CLASS.SELECTED).addClass(self.CLASS.GOT);

        self.score += 100;
        self.updateScore();
      }
      /* Different Pairs */
      else {
        cards[0].isTurning = false;
        cards[1].isTurning = false;
        $("." + self.CLASS.SELECTED + " span").fadeOut("fast");
      }

      $("." + self.CLASS.CARD).removeClass(self.CLASS.SELECTED);
      self.selectedCards = [];
      self.isJudging = false;
    }, 750);
  }

  /* ================
   *   Update Score
   * ================ */
  function updateScore() {
    this.scoreField.text(this.score);
  }


  /* ========
   *   Reset
   * ======== */
  function reset() {
    this.board.empty();

    this.cards         = [];
    this.selectedCards = [];
    this.isJudging     = false;
    this.score         = 0;
  }


  /* ====================
   *   Define Prototype
   * ==================== */
  SuiJack.prototype = {
    /* Constructor */
    constructor: SuiJack,

    /* Public Method */
    startGame: startGame,
    entryCards: entryCards,
    getCardElmList: getCardElmList,
    selectCard: selectCard,
    updateScore: updateScore,
    reset: reset
  };


  return SuiJack;

})();



/* ======================================================
 * =====                                            =====
 * =====                    Card                    =====
 * =====                                            =====
 * ====================================================== */

var Card = (function() {

  /* ===============
   *   Constructor
   * =============== */
  function Card(id, word, lang) {
    this.ID   = id;
    this.word = word;
    this.lang = lang;

    this.isTurning = false;
  }


  /* ====================
   *   Define Prototype
   * ==================== */
  Card.prototype = {
    // Constructor
    constructor: Card
  };

  return Card;

})();
