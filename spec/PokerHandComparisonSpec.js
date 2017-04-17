var CARDS_FLUSH =         "2H 4H 6H 8H JH";
var CARDS_STRAIGHT =      "3D 4H 5S 6D 7C";
var CARDS_FULLHOUSE =     "3C 3S 3D KD KH";
var CARDS_PAIR =          "QD 2D TD QH 8D"; //queen pair
var CARDS_THREEOFAKIND =  "QD QH TD 5D QS"; //3 queens
var CARDS_FOUROFAKIND =   "QD QH QS 5D QC"; //4 queens
var CARDS_STRAIGHTFLUSH = "8D 9D TD JD QD";

var CARDS_UNSORTED =      "QD 2D TD 5D 8D";
var CARDS_SORTED =        "2D 5D 8D TD QD";

var CARDS_HIGHCARDISKING ="QS KD TH 5C 8D";
var CARDS_TWOPAIR =       "QS QD 5H 3C 5D";
var CARDS_ROYALFLUSH =    "AH KH QH JH TH";


var CARDSET_FULLHOUSETIEBREAK_2WINS_1 =  "5H KD 5S KH KD";
var CARDSET_FULLHOUSETIEBREAK_2WINS_2 =  "6D 6H KC KS KH";
var CARDSET_HIGHCARD_2WINS_1 =           "2H 3D 5S 9C KD";
var CARDSET_HIGHCARD_2WINS_2 =           "2C 3H 4S 8C AH";
var CARDSET_FULLHOUSETIEBREAK_1WINS_1 =  "5H KD 5S KH KD";
var CARDSET_FULLHOUSETIEBREAK_1WINS_2 =  "2D 2H KC KS KH";
var CARDSET_FULLHOUSE_1WINS_1 =          "5H KD 5S KH KD";
var CARDSET_FULLHOUSE_1WINS_2 =          "2D 2H QC QS QH";
var CARDSET_HIGHTRIPLET_1WINS_1 =        "2H KD 5S KH KD";
var CARDSET_HIGHTRIPLET_1WINS_2 =        "2D 3H 4C 4S 4H";
var CARDSET_HIGHCARD_TIEBREAK_2WINS_1 =  "2H 5C 6D 7S 8H";
var CARDSET_HIGHCARD_TIEBREAK_2WINS_2 =  "3C 5D 6S 7H 8S";
var CARDSET_HIGHCARDTIE_TIE_1 =          "2H 3D 5S 9C KD";
var CARDSET_HIGHCARDTIE_TIE_2 =          "2D 3H 5C 9S KH";
var CARDSET_PAIRTIEBREAK_1WINS_1 =       "KH 3D 4S 5C KD";
var CARDSET_PAIRTIEBREAK_1WINS_2 =       "KD 2H 4C 5S KH";

//for broken test
var CARDSET_PAIR_2_1WINS_1 =       "KH 3D 4S 5C KD";
var CARDSET_PAIR_2_1WINS_2 =       "JD 2H 4C 5S JH";
var CARDSET_PAIR_3_2WINS_1 =       "2H 3D 4S 5C 2D";
var CARDSET_PAIR_3_2WINS_2 =       "3D 2H 4C 5S 3H";

var originalCards = ['2','3','4','5','6','7','8','9','T','Q','J','K','A'];
var sortableCards = ['a','b','c','d','e','f','g','h','i','j','k','l','m'];

describe("PokerHandComparison", function() {

 it("Cards are sorted low to high", function() {
    expect(convertSortableBack(sortHand(CARDS_UNSORTED))).toEqual(CARDS_SORTED);
 });

//Straight
 it(CARDS_STRAIGHT+" are a Straight.", function() {
     var sorted = sortHand(CARDS_STRAIGHT);
    expect(isStraight(sorted)).toBe(true);
 });

  it(CARDS_FLUSH+" are NOT a Straight.", function() {
     var sorted = sortHand(CARDS_FLUSH);
    expect(isStraight(sorted)).toBe(false);
 });

 //Flush
 it(CARDS_FLUSH+" are a Flush.", function() {
     var sorted = sortHand(CARDS_FLUSH);
    expect(isFlush(sorted)).toBe(true);
 });

  it(CARDS_STRAIGHT+" are NOT a Flush.", function() {
     var sorted = sortHand(CARDS_STRAIGHT);
    expect(isFlush(sorted)).toBe(false);
 });

//PAIR
   it(CARDS_PAIR+" are a Pair.", function() {
    var sorted = sortHand(CARDS_PAIR);
    expect(sameCount(sorted)).toEqual(2);
 });

//THREE
 it(CARDS_THREEOFAKIND+" are a Three of a Kind.", function() {
     var sorted = sortHand(CARDS_THREEOFAKIND);
    expect(sameCount(sorted)).toEqual(3);
 });

//FOUR
 it(CARDS_FOUROFAKIND+" are a Four of a Kind.", function() {
     var sorted = sortHand(CARDS_FOUROFAKIND);
    expect(sameCount(sorted)).toEqual(4);
 });

//FULL HOUSE
 it(CARDS_FULLHOUSE+" are a Full House.", function() {
     var sorted = sortHand(CARDS_FULLHOUSE);
    expect(isFullHouse(sorted)).toBe(true);
 });

  it(CARDS_THREEOFAKIND+" are NOT a Full House.", function() {
     var sorted = sortHand(CARDS_THREEOFAKIND);
    expect(isFullHouse(sorted)).toBe(false);
 });

//STRAIGHT FLUSH
 it(CARDS_STRAIGHTFLUSH+" are a Straight Flush.", function() {
     var sorted = sortHand(CARDS_STRAIGHTFLUSH);
    expect(isStraightFlush(sorted)).toBe(true);
 });

//TWO PAIR
 it(CARDS_TWOPAIR+" are a Two Pair.", function() {
     var sorted = sortHand(CARDS_TWOPAIR);
    expect(isTwoPair(sorted)).toBe(true);
 });

  it(CARDS_PAIR+" are NOT a Two Pair.", function() {
     var sorted = sortHand(CARDS_PAIR);
    expect(isTwoPair(sorted)).toBe(false);
 });

//ONE PAIR
it(CARDS_PAIR+" are a Pair.", function() {
     var sorted = sortHand(CARDS_PAIR);
    expect(sameCount(sorted)).toEqual(2);
 });

//High card
  it(CARDS_HIGHCARDISKING+" high card is King.", function() {
    var highIsKing = sortHand(CARDS_HIGHCARDISKING);
    expect(getHighCard(highIsKing)).toEqual(convertToSortable('K'));
 });

   it(CARDS_UNSORTED+" high card is Queen.", function() {
     var highIsQueen = sortHand(CARDS_UNSORTED);
    expect(getHighCard(highIsQueen)).toEqual(convertToSortable('Q'));
 });

//Rank hands
 it(CARDS_STRAIGHTFLUSH+" is Ranked Straight Flush, 0.", function() {
     var sorted = sortHand(CARDS_STRAIGHTFLUSH);
    expect(rankHand(sorted)).toEqual(0);
 });

 it(CARDS_FOUROFAKIND+" is Ranked Four of a Kind, 1.", function() {
     var sorted = sortHand(CARDS_FOUROFAKIND);
    expect(rankHand(sorted)).toEqual(1);
 });

 it(CARDS_FULLHOUSE+" is Ranked Full House, 2.", function() {
     var sorted = sortHand(CARDS_FULLHOUSE);
    expect(rankHand(sorted)).toEqual(2);
 });

 it(CARDS_FLUSH+" is Ranked Flush, 3.", function() {
     var sorted = sortHand(CARDS_FLUSH);
    expect(rankHand(sorted)).toEqual(3);
 });

 it(CARDS_STRAIGHT+" is Ranked Straight, 4.", function() {
     var sorted = sortHand(CARDS_STRAIGHT);
    expect(rankHand(sorted)).toEqual(4);
 });

 it(CARDS_THREEOFAKIND+" is Ranked Three of a Kind, 5.", function() {
     var sorted = sortHand(CARDS_THREEOFAKIND);
    expect(rankHand(sorted)).toEqual(5);
 });

 it(CARDS_TWOPAIR+" is Ranked Two Pair, 6.", function() {
     var sorted = sortHand(CARDS_TWOPAIR);
    expect(rankHand(sorted)).toEqual(6);
 });

 it(CARDS_PAIR+" is Ranked Pair, 7.", function() {
     var sorted = sortHand(CARDS_PAIR);
    expect(rankHand(sorted)).toEqual(7);
 });

 it(CARDS_HIGHCARDISKING+" is Ranked High Card, 8.", function() {
     var sorted = sortHand(CARDS_HIGHCARDISKING);
    expect(rankHand(sorted)).toEqual(8);
 });


 //HAND COMPARISONS
 it(CARDSET_FULLHOUSETIEBREAK_2WINS_1+" loses to "+CARDSET_FULLHOUSETIEBREAK_2WINS_2+" (full house tie break)", function() {
    expect(handComparison(CARDSET_FULLHOUSETIEBREAK_2WINS_1, CARDSET_FULLHOUSETIEBREAK_2WINS_2)).toEqual(-1);
 });

 it(CARDSET_HIGHCARD_2WINS_1+" loses to "+CARDSET_HIGHCARD_2WINS_2+" (high card)", function() {
    expect(handComparison(CARDSET_HIGHCARD_2WINS_1, CARDSET_HIGHCARD_2WINS_2)).toEqual(-1);
 });

 it(CARDSET_FULLHOUSETIEBREAK_1WINS_1+" wins over "+CARDSET_FULLHOUSETIEBREAK_1WINS_2+" (full house tie break)", function() {
    expect(handComparison(CARDSET_FULLHOUSETIEBREAK_1WINS_1, CARDSET_FULLHOUSETIEBREAK_1WINS_2)).toEqual(1);
 });

 it(CARDSET_FULLHOUSE_1WINS_1+" wins over "+CARDSET_FULLHOUSE_1WINS_2+" (full house)", function() {
    expect(handComparison(CARDSET_FULLHOUSE_1WINS_1, CARDSET_FULLHOUSE_1WINS_2)).toEqual(1);
 });

 it(CARDSET_HIGHTRIPLET_1WINS_1+" wins over "+CARDSET_HIGHTRIPLET_1WINS_2+" (triplet wins)", function() {
    expect(handComparison(CARDSET_HIGHTRIPLET_1WINS_1, CARDSET_HIGHTRIPLET_1WINS_2)).toEqual(1);
 });

 it(CARDSET_HIGHCARD_TIEBREAK_2WINS_1+" loses to "+CARDSET_HIGHCARD_TIEBREAK_2WINS_2+" (high card tie break)", function() {
    expect(handComparison(CARDSET_HIGHCARD_TIEBREAK_2WINS_1, CARDSET_HIGHCARD_TIEBREAK_2WINS_2)).toEqual(-1);
 });

 it(CARDSET_HIGHCARDTIE_TIE_1+" ties with "+CARDSET_HIGHCARDTIE_TIE_2+" (high card tie)", function() {
    expect(handComparison(CARDSET_HIGHCARDTIE_TIE_1, CARDSET_HIGHCARDTIE_TIE_2)).toEqual(0);
 });

 it(CARDSET_PAIRTIEBREAK_1WINS_1+" wins over "+CARDSET_PAIRTIEBREAK_1WINS_2+" (pair, initial tie)", function() {
    expect(handComparison(CARDSET_PAIRTIEBREAK_1WINS_1, CARDSET_PAIRTIEBREAK_1WINS_2)).toEqual(1);
 });


//SIMPLE TIE BREAK 
 it("simple tie break for "+CARDSET_HIGHCARD_TIEBREAK_2WINS_1+" and "+CARDSET_HIGHCARD_TIEBREAK_2WINS_2+" (high card tie break)", function() {
     var hand1 = sortHand(CARDSET_HIGHCARD_TIEBREAK_2WINS_1);
     var hand2 = sortHand(CARDSET_HIGHCARD_TIEBREAK_2WINS_2);
    expect(simpleTieBreak(hand1, hand2)).toEqual(-1);
 });


 //REMOVE CARDS THAT MATCH
  it("Removing Queen from "+CARDS_UNSORTED+" returns without the Queen(j).", function() {
      var hand = sortHand(CARDS_UNSORTED);
    expect(removeAllMatching(hand, 'j')).toEqual(sortHand("2D TD 5D 8D"));
 });
 
});


// PAIR COMPARISONS FOR BROKEN TEST
 it(CARDS_PAIR+" ties "+CARDS_PAIR+" (pair, tie)", function() {
    expect(handComparison(CARDS_PAIR, CARDS_PAIR)).toEqual(0);
 });
  it(CARDSET_PAIR_2_1WINS_1+" beats "+CARDSET_PAIR_2_1WINS_2+" (pair, 1 wins)", function() {
    expect(handComparison(CARDSET_PAIR_2_1WINS_1, CARDSET_PAIR_2_1WINS_2)).toEqual(1);
 });
   it(CARDSET_PAIR_3_2WINS_1+" beats "+CARDSET_PAIR_3_2WINS_2+" (pair, 2 wins)", function() {
       console.log("DOING THE BROKEN TEST");
    expect(handComparison(CARDSET_PAIR_3_2WINS_1, CARDSET_PAIR_3_2WINS_2)).toEqual(-1);
 });


function convertToSortable(value){
    return sortableCards[originalCards.indexOf(value)];
}

 function convertSortableBack(cards){
     var hand = '';
     for(var i = 0; i < cards.length; i++){
        hand += cards[i] + ' ';
     }
     hand = hand.trim();

    var handRebuilt = '';
    for(var i = 0; i < hand.length; i++){
        if(sortableCards.includes(hand.charAt(i))){
            handRebuilt += originalCards[sortableCards.indexOf(hand.charAt(i))];
        }else{
            handRebuilt += hand.charAt(i);
        }
    }
    return handRebuilt;
 }



