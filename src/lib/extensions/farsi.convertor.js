const farsiToEnglishDictionary = {
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
}

const englishToFarsiDictionary = {
    '0': '۰',
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹',
}

String.prototype.toEnglish = function () {
    return this.split('').map(char => typeof farsiToEnglishDictionary[char] === 'undefined' ? char : farsiToEnglishDictionary[char]).join('');
}

String.prototype.toFarsi = function () {
    return this.split('').map(char => typeof englishToFarsiDictionary[char] === 'undefined' ? char : englishToFarsiDictionary[char]).join('');
}