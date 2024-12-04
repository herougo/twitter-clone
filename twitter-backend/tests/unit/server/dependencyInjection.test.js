const DependencyInjectionContainer = require("../../../src/server/dependency-injection/container");
const { ExistingDependencyError } = require("../../../src/utils/errors/internalErrors");
const Logger = require("../../../src/utils/logger");
const createMockLogger = require("../../utils/mocks/mockLogger");

describe("dependency injection container", () => {
    test("customDependenciesMap cloned to dependencies", () => {
        const logger1 = createMockLogger();
        const logger2 = createMockLogger();
        const container = new DependencyInjectionContainer({logger1});
        container.register("logger2", logger2);

        expect(() => {
            container.register("logger2", logger2);
        }).toThrow(ExistingDependencyError);
    });

    test("customDependenciesMap overrides any new definitions", () => {
        const logger1 = createMockLogger();
        const logger2 = createMockLogger();
        const container = new DependencyInjectionContainer({logger: logger1});
        const receivedLogger = container.register("logger", logger2);

        receivedLogger.log("hi");
        expect(logger1.log.mock.calls).toEqual([["hi"]]);
        expect(logger2.log.mock.calls).toEqual([]);
    });
});