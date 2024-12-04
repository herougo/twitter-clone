const createMockLogger = () => {
    return {
        error: jest.fn(),
        log: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn()
    }
}

module.exports = createMockLogger;