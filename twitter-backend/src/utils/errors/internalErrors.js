class MissingDependencyError extends Error {
    constructor(dependencyName) {
        super();
        this.message = `Missing dependency ${dependencyName}`;
    }
}

class ExistingDependencyError extends Error {
    constructor(dependencyName) {
        super();
        this.message = `Existing dependency ${dependencyName}`;
    }
}

class UnexpectedDatabaseChangeError extends Error {
    constructor(message = "Tried to change the database outside a test environment!") {
        super();
        this.message = message;
    }
}

module.exports = {
    MissingDependencyError,
    ExistingDependencyError,
    UnexpectedDatabaseChangeError
}