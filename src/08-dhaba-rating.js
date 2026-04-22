/**
 * 🍛 Highway Dhaba Rating System - Higher-Order Functions
 *
 * Highway pe dhabas ki rating system bana raha hai. Higher-order functions
 * (HOF) use karne hain — aise functions jo doosre functions ko parameter
 * mein lete hain YA return karte hain.
 *
 * Functions:
 *
 *   1. createFilter(field, operator, value)
 *      - Returns a FUNCTION that filters objects
 *      - Operators: ">", "<", ">=", "<=", "==="
 *      - e.g., createFilter("rating", ">=", 4) returns a function that
 *        takes an object and returns true if object.rating >= 4
 *      - Unknown operator => return function that always returns false
 *
 *   2. createSorter(field, order = "asc")
 *      - Returns a COMPARATOR function for Array.sort()
 *      - order "asc" => ascending, "desc" => descending
 *      - Works with both numbers and strings
 *
 *   3. createMapper(fields)
 *      - fields: array of field names, e.g., ["name", "rating"]
 *      - Returns a function that takes an object and returns a new object
 *        with ONLY the specified fields
 *      - e.g., createMapper(["name"])({name: "Dhaba", rating: 4}) => {name: "Dhaba"}
 *
 *   4. applyOperations(data, ...operations)
 *      - data: array of objects
 *      - operations: any number of functions to apply SEQUENTIALLY
 *      - Each operation takes an array and returns an array
 *      - Apply first operation to data, then second to result, etc.
 *      - Return final result
 *      - Agar data not array, return []
 *
 * Hint: HOF = functions that take functions as arguments or return functions.
 *   createFilter returns a function. applyOperations takes functions as args.
 *
 * @example
 *   const highRated = createFilter("rating", ">=", 4);
 *   highRated({ name: "Punjab Dhaba", rating: 4.5 }) // => true
 *
 *   const byRating = createSorter("rating", "desc");
 *   [{ rating: 3 }, { rating: 5 }].sort(byRating)
 *   // => [{ rating: 5 }, { rating: 3 }]
 */
export function createFilter(field, operator, value) {
  // Your code here
  const operators = [">", "<", ">=", "<=", "==="];
  if (!operators.includes(operator))
    return function () {
      return false;
    };
  return function (object) {
    let condition;
    switch (operator) {
      case ">":
        condition = object[field] > value;
        break;
      case "<":
        condition = object[field] < value;
        break;
      case ">=":
        condition = object[field] >= value;
        break;
      case "<=":
        condition = object[field] <= value;
        break;
      case "===":
        condition = object[field] === value;
        break;
      default:
        return false;
    }
    return condition;
  };
}

export function createSorter(field, order = "asc") {
  // Your code here
  return function (a, b) {
    const valA = a[field];
    const valB = b[field];
    let comparison = 0;
    if (valA === undefined || valB === undefined) return 0;
    if (typeof valA === "string" && typeof valB === "string") {
      comparison = valA.localeCompare(valB);
    } else {
      if (valA > valB) comparison = 1;
      if (valA < valB) comparison = -1;
    }
    return order === "asc" ? comparison : comparison * -1;
  };
}

export function createMapper(fields) {
  // Your code here
  return function (obj) {
    return fields.reduce((acc, field) => {
      if (field in obj) acc[field] = obj[field];
      return acc;
    }, {});
  };
}

export function applyOperations(data, ...operations) {
  // Your code here
  if (!Array.isArray(data)) return [];
  return operations.reduce((result, operation) => {
    return operation(result);
  }, data);
}

// in sort()
//  -1 => A should come before B
// 1 => B should come before A
// 0 => order does not matter
