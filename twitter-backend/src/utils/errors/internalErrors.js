class MissingDependencyError extends Error {
    constructor(dependencyName) {
        super();
        this.message = `Missing dependency ${dependencyName}`;
    }
}

module.exports = {
    MissingDependencyError
}