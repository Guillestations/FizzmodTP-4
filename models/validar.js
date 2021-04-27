const validarEmail = email => /\w+@\w+\.[a-z A-Z]/.test(email);

module.exports = validarEmail;