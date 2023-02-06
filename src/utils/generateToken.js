const generateToken = () => {
    const bigToken = Math.random().toString(16).substring(2) + Math.random().toString(16).substr(2);

    const formatedToken = bigToken.substring(0, 16);

    return formatedToken;
};

module.exports = generateToken;