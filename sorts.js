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
    return;
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
    return;
}