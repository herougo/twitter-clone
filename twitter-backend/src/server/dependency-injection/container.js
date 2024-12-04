const { MissingDependencyError, ExistingDependencyError } = require("../../utils/errors/internalErrors");

class DependencyInjectionContainer {
    constructor(customDependenciesMap) {
        this.customDependenciesMap = customDependenciesMap;
        this.dependencies = {...customDependenciesMap} || {};
    }

    register(name, dependency) {
        if (name in this.dependencies) {
            if (name in this.customDependenciesMap) {
                return this.resolve(name);
            }

            throw new ExistingDependencyError(name);
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