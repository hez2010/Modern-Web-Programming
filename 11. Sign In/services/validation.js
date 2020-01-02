const rules = [
    {
        field: 'username',
        rule: v => !!v && v.match(/^([a-zA-Z])([a-zA-Z0-9_]){5,17}$/g),
        message: '用户名不符合要求'
    },
    {
        field: 'password',
        rule: v => !!v && v.length >= 6,
        message: '密码不符合要求'
    },
    {
        field: 'number',
        rule: v => !!v && v.match(/^(?!0)[0-9]{8}$/g),
        message: '学号不符合要求'
    },
    {
        field: 'phone',
        rule: v => !!v && v.match(/^(?!0)[0-9]{11}$/g),
        message: '电话不符合要求'
    },
    {
        field: 'email',
        rule: v => !!v && v.match(/^[a-zA-Z0-9]+@[a-z0-9]+.*?\.[a-zA-Z\u4e00-\u9fa5]{2,4}$/g),
        message: '邮箱不符合要求'
    }
];

function validateInput(data, forceFields) {
    const err = [];
    for (const rule of rules) {
        if (data[rule.field]) {
            if (!rule.rule(data[rule.field])) {
                err.push({
                    field: rule.field,
                    message: rule.message
                });
            }
        }
    }
    for (const field of forceFields) {
        if (!data[field]) {
            err.push({
                field,
                message: '此项不能为空'
            });
        }
    }
    return err;
}

module.exports = {
    validateInput
}