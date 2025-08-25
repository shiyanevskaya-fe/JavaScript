export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

export class PropertyRequiredError extends ValidationError {
    constructor(property) {
        super("Отсутсвует свойство: " + property);
        this.name = "PropertyRequiredError";
        this.property = property;
    }
}

export class EmptyValueError extends ValidationError {
    constructor(property) {
        super("Поле не может быть пустым");
        this.name = "EmptyValueError";
        this.property = property;
    }
}

export class IncorrectValueError extends ValidationError {
    constructor(message, property) {
        super(message);
        this.name = "IncorrectValueError";
        this.property = property;
    }
}
