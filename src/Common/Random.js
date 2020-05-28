const getRandomGivenName = function () {
    const RANDOM_FIRST_NAMES = ["Billy Bob","Carole", "Buck", "Carson", "Charles Ray", "Clarice", "Cletus", "Cooter", "Dixie", "Duke", "Forrest", "Garth", "Homer", "Keaton", "John Boy", "Joe Bob", "Jimmy Don", "Jim Bob", "Otis", "Percy", "Pervis", "Quinn", "Rebel", "Rocky", "Roscoe", "Saggory", "Spencer", "Stella", "Tucker", "Walker", "Yates"];
    return RANDOM_FIRST_NAMES[Math.floor(Math.random() * RANDOM_FIRST_NAMES.length)];
}
const getRandomLastName = function () {
    const RANDOM_LAST_NAMES = ["Piggs", "Baskin", "Nutters", "Demon", "Clutterbuck", "Greedy", "Hardmeat", "Hogwood", "Hiscock", "Steer", "Bracegirdle", "Bonefat", "Turtle", "Cornfoot", "Rattlebag", "Bottom", "Pigfat", "McCracken","Swindells", "Doug Hole", "Rosebud", "Camelfat", "Urine", "Spews", "Cockett", "Longbottom", "Sultana"];
    return RANDOM_LAST_NAMES[Math.floor(Math.random() * RANDOM_LAST_NAMES.length)];
}
const getRandomCrimes = function () {
    const RANDOM_CRIMES = ["Stealing a tiger from a zoo", "Riding a llama down the highway", "Stealing potatoes", "Stealing a lollipop from a baby", "Locking a grandma in a pigeon cage", "Smearing faeces on lawn during a cricket match", "Throwing an alligator trough a drive-thru window", "Trying to blow up co-workers", "Stealing trout while peeing everywhere", "Shaving neighbourhood cats", "Breaking into a house and putting up Christmas decorations", "Breaking into Pizza Hut and frying Chicken Wings", "Trying to trade an Olive Garden salad for drugs", "Farting At Police", "Spitting on a Grandpa", "Pooping on trains", "hoarding toiletpaper", "Practicing \"karate\" on swans in park", ];
    return RANDOM_CRIMES[Math.floor(Math.random() * RANDOM_CRIMES.length)];
}
const getRandomNumber = max => Math.floor(Math.random() * max);

module.exports = {
    getRandomGivenName,
    getRandomLastName,
    getRandomNumber,
    getRandomCrimes,
}
