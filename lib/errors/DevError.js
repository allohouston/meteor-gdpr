module.exports = class DevError extends Error {
    constructor(cateogry, message) {

        super();
        Error.captureStackTrace(this, this.constructor);

        this.message = `Hi Developer, you made a mistake [${cateogry}] : ${message}`;
        this.name = this.constructor.name;
    }

    toString() {
        return this.message;
    }
};