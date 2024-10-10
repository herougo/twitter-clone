const { MissingDependencyError } = require("../../utils/errors/internalErrors");

class DependencyInjectionContainer {
    constructor(mockedDependenciesMap) {
        this.dependencies = mockedDependenciesMap || {};
    }

    register(name, dependency) {
        if (name in this.dependencies) {
            return this.resolve(name);
        }
        this.dependencies[name] = dependency;
        return dependency;
    }

    resolve(name) {
        if (!(name in this.dependencies)) {
            throw new MissingDependencyError(name);
        }
        return this.dependencies[name];
    }
}

module.exports = DependencyInjectionContainer;