/**
 * Comtxt object
 */
exports.sendGroupSMS = function(numbers, message, phone) {
    for (var i in numbers) {
        phone.sendSms(numbers[i], message, {}, function(response) {
            console.log(response);
        });
    }
};