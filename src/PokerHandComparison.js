var score = ["Straight Flush", "Four of a Kind", "Full House", "Flush", "Straight", "Three of a Kind", "Two Pair", "Pair", "High Card"];

function handComparison(firstHand, secondHand) {
    var sortedFirstHand, sortedSecondHand, firstRank, secondRank;

    sortedFirstHand = sortHand(firstHand);
    sortedSecondHand = sortHand(secondHand);
    firstRank = rankHand(sortedFirstHand);
    secondRank = rankHand(sortedSecondHand);

    if (firstRank > secondRank) {
        return -1;
    } else if (firstRank < secondRank) {
        return 1;
    } else {
        return tieBreak(sortedFirstHand, sortedSecondHand, firstRank);
    }
}

function tieBreak(firstHand, secondHand, rank) {
    var firstHandTieBreak, secondHandTieBreak, firstHandsNextHighCard, secondHandsNextHighCard, ranking;

    firstHandTieBreak = firstHand;
    secondHandTieBreak = secondHand;

    while (firstHandTieBreak.length > 0) {
        if (sameCount(firstHandTieBreak) === 1) {
            return simpleTieBreak(firstHandTieBreak, secondHandTieBreak);
        }

        firstHandsNextHighCard = nextHighSetCard(firstHandTieBreak, rank);
        secondHandsNextHighCard = nextHighSetCard(secondHandTieBreak, rank);

        ranking = cardDifference(firstHandsNextHighCard, secondHandsNextHighCard);
        if (ranking > 0) {
            return 1;
        } else if (ranking < 0) {
            return -1;
        }

        firstHandTieBreak = removeAllMatching(firstHandTieBreak, firstHandsNextHighCard);
        secondHandTieBreak = removeAllMatching(secondHandTieBreak, secondHandsNextHighCard);
    }
    return 0;
}

function nextHighSetCard(hand, rank) {
    if (score[rank] === "Four of a Kind" || score[rank] === "Three of a Kind" || score[rank] === "Pair") {
        return getTheMatchingCardSet(hand);
    }

    if (score[rank] === "Full House") {
        return getNextFullHouseSet(hand);
    }

    if (score[rank] === "Two Pair") {
        return getNextTwoPairCardSet(hand);
    }
}

function getNextTwoPairCardSet(hand) {
    if (hand.length === 3) {
        //xx-
        //-xx
        return hand[1].charAt(0);
    }
    //-xxYY
    //xx-YY
    //xxYY-
    return hand[3].charAt(0);
}

function getTheMatchingCardSet(hand) {
    if (frontMatch(hand)) { //xxxx-, xxx--, xx---
        return hand[0].charAt(0);
    } else if (endMatch(hand)) { //-xxxx, --xxx, ---xx
        return hand[4].charAt(0);
    } else if (frontMiddleMatch(hand)) { //-xxx-, -xx--
        return hand[1].charAt(0);
    }
    return hand[2].charAt(0); //--xx-
}

function getNextFullHouseSet(hand) {
    if (hand.length === 2) {
        return hand[0].charAt(0);
    }
    //YYYxx
    //xxYYY
    return hand[2].charAt(0);
}

function removeAllMatching(hand, card) {
    for (var i = 0; i < hand.length; i++) {
        if (hand[i].charAt(0) === card) {
            hand.splice(i, 1);
            i--;
        }
    }
    return hand;
}

function simpleTieBreak(firstHand, secondHand) {
    var firstHandTieBreak, secondHandTieBreak, firstHandCard, secondHandCard, rank;
    firstHandTieBreak = firstHand;
    secondHandTieBreak = secondHand;

    while (firstHandTieBreak.length > 0) {
        firstHandCard = firstHandTieBreak[firstHandTieBreak.length - 1].charAt(0);
        secondHandCard = secondHandTieBreak[secondHandTieBreak.length - 1].charAt(0);
        rank = cardDifference(firstHandCard, secondHandCard);
        if (rank > 0) {
            return 1;
        } else if (rank < 0) {
            return -1;
        }
        firstHandTieBreak = removeNextCard(firstHandTieBreak);
        secondHandTieBreak = removeNextCard(secondHandTieBreak);
    }
    return 0;
}

function cardDifference(firstCard, secondCard) {
    return firstCard.charCodeAt() - secondCard.charCodeAt();
}

function removeNextCard(hand) {
    hand.pop();
    return hand;
}

function rankHand(hand) {
    var rank, same;

    var rank = "";

    if (isStraightFlush(hand)) {
        rank = score.indexOf("Straight Flush");
    }

    same = sameCount(hand);

    if (rank === "") {
        if (same === 4) {
            rank = score.indexOf("Four of a Kind");
        } else if (isFullHouse(hand)) {
            rank = score.indexOf("Full House");
        } else if (isFlush(hand)) {
            rank = score.indexOf("Flush");
        } else if (isStraight(hand)) {
            rank = score.indexOf("Straight");
        } else if (same === 3) {
            rank = score.indexOf("Three of a Kind");
        } else if (isTwoPair(hand)) {
            rank = score.indexOf("Two Pair");
        } else if (same === 2) {
            rank = score.indexOf("Pair");
        } else {
            rank = score.indexOf("High Card");
        }
    }
    return rank;
}

function sortHand(hand) {
    var sortableHand = makeHandSortable(hand);
    var cards = sortableHand.split(" ");
    cards.sort();

    return cards;
}

function makeHandSortable(hand) {
    var handRebuilt, i;
    var originalCards = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "J", "K", "A"];
    var sortableCards = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m"];
    handRebuilt = "";
    for (i = 0; i < hand.length; i++) {
        if (originalCards.includes(hand.charAt(i))) {
            handRebuilt += sortableCards[originalCards.indexOf(hand.charAt(i))];
        } else {
            handRebuilt += hand.charAt(i);
        }
    }
    return handRebuilt;
}

function getHighCard(hand) {
    return hand[hand.length - 1].charAt(0);
}

function isStraight(hand) {
    for (var i = 0; i < hand.length - 1; i++) {
        if (hand[i].charAt(0).charCodeAt() !== (hand[i + 1].charAt(0).charCodeAt() - 1)) {
            return false;
        }
    }
    return true;
}

function isFlush(hand) {
    for (var i = 0; i < hand.length - 1; i++) {
        if (hand[i].charAt(1) !== hand[i + 1].charAt(1)) {
            return false;
        }
    }
    return true;
}

function isStraightFlush(hand) {
    return isFlush(hand) && isStraight(hand);
}

function isFullHouse(cards) {
    return (frontMatch(cards) && (backMiddleMatch(cards) && endMatch(cards))) ||
        ((frontMatch(cards) && frontMiddleMatch(cards)) && endMatch(cards));
}

function isTwoPair(cards) {
    return (frontMatch(cards) && backMiddleMatch(cards)) ||
        (frontMatch(cards) && endMatch(cards)) ||
        (frontMiddleMatch(cards) && endMatch(cards));
}

function frontMatch(cards) {
    return cards[0].charAt(0) === cards[1].charAt(0);
}

function frontMiddleMatch(cards) {
    return cards[1].charAt(0) === cards[2].charAt(0);
}

function backMiddleMatch(cards) {
    return cards[2].charAt(0) === cards[3].charAt(0);
}

function endMatch(cards) {
    return cards[3].charAt(0) === cards[4].charAt(0);
}

function sameCount(hand) {
    var highCount, cards, tempHand, lengthChange, i;
    highCount = 0;
    cards = hand + "";

    for (i = 0; i < cards.length; i++) {
        if (isLowercase(cards.charAt(i))) {
            tempHand = cards.replace(new RegExp(cards.charAt(i), "g"), "");

            lengthChange = cards.length - tempHand.length;
            if (lengthChange > highCount) {
                highCount = lengthChange;
            }
        }
    }
    return highCount;
}

function isLowercase(value) {
    return (value.charCodeAt() > 96);
}