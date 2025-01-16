const _sanitizePathsHelper = (data, path, replacement) => {
    let prev = null;
    let curr = data;
    let pathSplit = path.split('.');
    for (const key of pathSplit) {
        prev = curr;
        if (!(key in curr)) {
            return;
        }
        curr = curr[key];
    }
    prev[pathSplit.slice(-1)] = replacement;
};

const sanitizePaths = (data, paths, replacement) => {
    const dataCopy = JSON.parse(JSON.stringify(data));
    for (const path of paths) {
        _sanitizePathsHelper(dataCopy, path, replacement);
    }
    return dataCopy;
};

module.exports = { sanitizePaths };
