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

class PostEngagementError extends Error {

}

class ExistingPostEngagementError extends Error {
    constructor(type) {
        super();
        this.message = `Tried to ${type} a post which is already ${type}d.`;
    }
}

class MissingPostEngagementError extends Error {
    constructor(type) {
        super();
        this.message = `Tried to ${type} a post which is not ${type}d.`;
    }
}

module.exports = {
    MissingDependencyError,
    ExistingDependencyError,
    UnexpectedDatabaseChangeError,
    PostEngagementError,
    ExistingPostEngagementError,
    MissingPostEngagementError
}