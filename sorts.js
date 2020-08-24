function* bubbleSort(elements) {
    var n = elements.length;
    for (var i = 0; i < n - 1; i++)
    {
        var swap = false;
        for (var j = 0; j < n - i - 1; j++)
        {
            yield [elements, [j, j+1]];

            if (elements[j] > elements[j + 1])
            {
                var temp = elements[j];
                elements[j] = elements[j + 1];
                elements[j + 1] = temp;

                swap = true;

                yield [elements, [j, j+1]];
            }
        }
        if (!swap) return;
    }
}

function* selectionSort(elements) {
    var n = elements.length;
    for (var i = 0; i < n; i++)
    {
        var min = i;
        for (var j = i + 1; j < n; j++)
        {
            if (elements[j] < elements[min])
            {
                min = j;
            }

            yield [elements, [i, min, j]];
        }
        
        var temp = elements[min];
        elements[min] = elements[i];
        elements[i] = temp;

        yield [elements, [min, i]];
    }
}

function* bogoSort(elements) {
    var n = elements.length;
    var sorted = false;
    while (!sorted)
    {
        for (var i = n - 1; i >= 0; i--)
        {
            var j = Math.floor(Math.random() * i + 1);
            
            var temp = elements[j];
            elements[j] = elements[i];
            elements[i] = temp;
            
            yield [elements, [i, j]];
        }
        var sorted = true;
        for (var i = 0; i < n - 1; i++)
        {
            if (elements[i] > elements[i+1])
            {
                sorted = false;
                break;
            }
            yield [elements, [i, i+1]];
        }
    }
}

function* quickSort(elements) {
    yield* quickSortRecurse(elements, 0, elements.length - 1);
}

function* quickSortRecurse(elements, low, high) {
    if (low < high)
    {
        var i = yield* partitionLast(elements, low, high);

        yield* quickSortRecurse(elements, low, i - 1);
        yield* quickSortRecurse(elements, i + 1, high);
    }
}

function* partitionLast(elements, low, high) {
    var i = low - 1;
    var pivot = elements[high];

    for (var j = low; j < high; j++)
    {
        yield [elements, [high, j, i]];

        if (elements[j] <= pivot)
        {
            i++;
            [elements[i], elements[j]] = [elements[j], elements[i]];
            
            yield [elements, [high, j, i]];
        }
    }
    [elements[i + 1], elements[high]] = [elements[high], elements[i + 1]];

    yield [elements, [high, i + 1]];

    return i + 1;
}