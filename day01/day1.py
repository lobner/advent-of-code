# For example, suppose your expense report contained the following:
#
# 1721 979 366 299 675 1456 In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them
# together produces 1721 * 299 = 514579, so the correct answer is 514579.
#
# Of course, your expense report is much larger. Find the two entries that sum to 2020; what do you get if you
# multiply them together?
#

#
# --- Part Two --- The Elves in accounting are thankful for your help; one of them even offers you a starfish coin
# they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense
# report that meet the same criteria.
#
# Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together
# produces the answer, 241861950.
#
# In your expense report, what is the product of the three entries that sum to 2020?
#

data = list(map(int, open("day1.data", "r").read().split(',')))

factors = set([])
result = set([])
for a in data:
    for b in data:
        if a + b == 2020:
            factors.add(a)
            factors.add(b)
            result.add(a * b)
print(str(factors) + " = " + str(result))

factors = set([])
result = set([])
for a in data:
    for b in data:
        for c in data:
            if a + b + c == 2020:
                factors.add(a)
                factors.add(b)
                factors.add(c)
                result.add(a * b * c)
print(str(factors) + " = " + str(result))
