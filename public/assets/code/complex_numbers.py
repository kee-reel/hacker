i = 1
simpleNumbers = []
while i <= 100:
    j = i - 1
    isSimple = True
    while j > 1:
        if i % j == 0:
            isSimple = False
            break
        j -= 1
    if isSimple:
        simpleNumbers.append(i)
    i += 1
print(simpleNumbers)
