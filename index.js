var n = 20;
var delay = 50;

var selectedSortID = "bubble";
var intervalTimer;

bars = [];

sortIDs = {
    "bubble" : {
        name : "Bubble Sort",
        generator : bubbleSort
    },
    "selection" : {
        name : "Selection Sort",
        generator : selectionSort
    },
    "bogo" : {
        name : "Bogo Sort",
        generator : bogoSort
    }
};

window.onload = function(e) {
    var sortSelector = document.getElementById("sort-selector");
    sortSelector.addEventListener("change", () => {
        setSort(sortSelector.value);
    });
    var keys = Object.keys(sortIDs);
    for (var i = 0; i < keys.length; i++)
    {
        var option = document.createElement("option");
        option.value = keys[i];
        option.innerHTML = sortIDs[keys[i]].name;

        sortSelector.appendChild(option);
    }
};

const sqr = (x) => x*x; 

function setCount(f) {
    n = 5 + sqr(10*f);
}

function setSpeed(f) {
    delay = 1 + 999 * sqr(sqr(1 - f));
}

function setSort(id) {
    selectedSortID = id;
}

function runSort() {
    clearInterval(intervalTimer);

    createBars(n);

    var sortingElements = generateRandom(n);
    var iterator = sortIDs[selectedSortID].generator(sortingElements);

    step(iterator);
    intervalTimer = setInterval(() => {
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
        if (doneCallback) doneCallback();
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