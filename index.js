const n = 20;
const delay = 50;

bars = [];

function runBubbleSort() {
    createBars(n);

    sortingElements = generateRandom(n);
    var iterator = bubbleSort(sortingElements);

    runSort(iterator);
};


function runSelectionSort() {
    createBars(n);

    sortingElements = generateRandom(n);
    var iterator = selectionSort(sortingElements);

    runSort(iterator);
};

function runSort(iterator) {
    step(iterator);
    var intervalTimer = setInterval(() => {
        step(iterator, () => {
            clearInterval(intervalTimer);
            updateBars(sortingElements);
        });
    }, delay);
}

function step(iterator, doneCallback = null)
{
    var {value, done} = iterator.next();
    if (done)
    {
        doneCallback();
        return;
    }
    var [elements, selected] = value;
    updateBars(elements, selected);
}

function createBars(count)
{
    var barContainer = document.querySelector(".sort-visualiser");

    while (barContainer.lastChild)
    {
        barContainer.removeChild(barContainer.lastChild);
    }

    bars = []

    for (var i = 0; i < count; i++)
    {
        var bar = document.createElement('div');
        bar.classList.add("visualiser-bar");
        barContainer.appendChild(bar);
        bars.push(bar);
    }
}

function updateBars(elements, selected = [])
{
    for (var i = 0; i < bars.length; i++)
    {
        var bar = bars[i];

        if (selected.includes(i))
            bar.classList.add("selected");
        else
            bar.classList.remove("selected");

        var f = (elements[i] / elements.length);
        bar.style.backgroundColor = getColor(f);
        bar.style.height = `${f * 100}%`;
    }
}

function getColor(f) {
    return `hsl(${(f) * 240}, ${(2 * ((f-.5) * (f-.5)) + 0.5) * 120}%, ${Math.min((2 * ((f-.5) * (f-.5)) + 0.5) * 90, 50)}%)`
}

function generateRandom(count) {
    let array = []
    for (var i = 0; i < count; i++)
    {
        array[i] = i + 1;
    }
    return shuffle(array);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
  
    return array;
}