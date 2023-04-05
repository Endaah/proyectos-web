let runeImages = new Map([
    [1, "url(./Images/Rune1.png)"],
    [2, "url(./Images/Rune2.png)"],
    [3, "url(./Images/Rune3.png)"],
    [4, "url(./Images/Rune4.png)"],
    [5, "url(./Images/Rune5.png)"],
    [6, "url(./Images/Rune6.png)"],
    [7, "url(./Images/Rune7.png)"],
    [8, "url(./Images/Rune8.png)"],
    [9, "url(./Images/Rune9.png)"]
])

function swapSelectionOf(Id, runeNumber) {
    var el = document.getElementById("main" + Id);
    el.style.backgroundImage = runeImages.get(runeNumber);
}