var Account = require('../src/models/account.model');
const login = Account.getByPhoneAndPassword;


test('login()', () => {
    expect(login("0379172188", "123456", function(status, account) {
        res.send({ status: status, result: account })
    })).toBe(result("Login successful", account[0]));
})


test('login()', () => {
    expect(login("0379172177", "123456", function(status, account) {
        res.send({ status: status, result: account })
    })).toBe(result("Login failed", null));
})