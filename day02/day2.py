lines = open("day2.data", "r").read().splitlines()


# PART I
#
# For example, suppose you have the following list:
#
# 1-3 a: abcde
# 1-3 b: cdefg
# 2-9 c: ccccccccc
# Each line gives the password policy and then the password. The password policy indicates the lowest and highest number
# of times a given letter must appear for the password to be valid. For example, 1-3 a means that the password must
# contain a at least 1 time and at most 3 times.
#
# In the above example, 2 passwords are valid. The middle password, cdefg, is not; it contains no instances of b, but
# needs at least 1. The first and third passwords are valid: they contain one a or nine c, both within the limits of
# their respective policies.
#
# How many passwords are valid according to their policies?


def valid_1(_password, _upper, _lower, _char):
    if int(_lower) <= password.count(_char) <= int(_upper):
        return 1
    else:
        return 0


# PART II
#
# Each policy actually describes two positions in the password, where 1 means the first character, 2 means the second
# character, and so on. (Be careful; Toboggan Corporate Policies have no concept of "index zero"!) Exactly one of
# these positions must contain the given letter. Other occurrences of the letter are irrelevant for the purposes of
# policy enforcement.
#
# Given the same example list from above:
#
# 1-3 a: abcde is valid: position 1 contains a and position 3 does not.
# 1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
# 2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.
# How many passwords are valid according to the new interpretation of the policies?

def valid_2(_password, _upper, _lower, _char):

    if (_password[int(_lower) - 1] == _char) ^ (_password[int(_upper) - 1] == _char):
        return 1
    else:
        return 0


res_1 = 0
res_2 = 0
for line in lines:
    arr = line.split(': ')
    first = arr[0].split(' ')
    num = first[0]
    lower = num.split('-')[0]
    upper = num.split('-')[1]
    myChar = first[1]
    password = [char for char in arr[1]]

    res_1 += valid_1(password, upper, lower, myChar)
    res_2 += valid_2(password, upper, lower, myChar)

print(res_1)
print(res_2)
