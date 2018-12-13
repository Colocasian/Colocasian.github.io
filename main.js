/**
 * Method to add two string-representation of numbers to create another string-number
 * @param {string} num1 first number to add
 * @param {string} num2 second number to add
 */
function adds(num1, num2) {
    if (isNaN(num1) || isNaN(num2))
        return NaN

    if (num2.length > num1.length) {
        var tmp = num1
        num1 = num2
        num2 = tmp
    }

    var ans = ""
    var c = 0
    for (var i = 0; i < num2.length; i++) {
        var sum = Number(num1.charAt(i)) + Number(num2.charAt(i)) + c
        ans += String(sum % 10)
        c = (sum < 10) ? 0 : 1
    }
    for (var i = num2.length; i < num1.length; i++) {
        var sum = Number(num1.charAt(i)) + c
        ans += String(sum % 10)
        c = (sum < 10) ? 0 : 1
    }
    if (c == 1)
        ans += '1'
    return ans
}

/**
 * Method that uses the adds() method to generate big fibonacci numbers
 * @param {number} num the index of the Fibonacci number
 */
function fibLar(num) {
    if (num < 0)
        return '-1'

    var temp = ['1', '0']
    for (var i = 0; i < num; i++) {
        var tmp = temp[1]
        temp[1] = adds(temp[0], temp[1])
        temp[0] = tmp
    }
    return temp[1]
}
