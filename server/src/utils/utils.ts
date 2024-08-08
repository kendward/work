/**
 *  Safe JSON.stringify that handles circular references
 * @param obj  The object to stringify
 * @param indent  The number of spaces to use for indentation
 * @returns  The stringified object
 */
export function safeStringify(obj: any, indent: number = 2): string {
  const cache = new Set();
  const retVal = JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.has(value)) {
          return; // Duplicate reference found, discard key
        }
        cache.add(value); // Store value in our collection
      }
      return value;
    },
    indent,
  );
  cache.clear(); // Enable garbage collection
  return retVal;
}
