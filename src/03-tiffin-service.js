/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  // Your code here
  if (!name) return null;
  let mealPriceperDay = 0;
  switch (mealType.toLowerCase()) {
    case "veg":
      mealPriceperDay = 80;
      break;
    case "nonveg":
      mealPriceperDay = 120;
      break;
    case "jain":
      mealPriceperDay = 90;
      break;
    default:
      return null;
  }
  const totalCost = mealPriceperDay * days;
  return { name, mealType, days, dailyRate: mealPriceperDay, totalCost };
}

export function combinePlans(...plans) {
  // Your code here
  if (!plans || plans.length === 0) return null;
  const summary = plans.reduce(
    (acc, plan) => {
      acc.mealBreakdown[plan.mealType] =
        (acc.mealBreakdown[plan.mealType] || 0) + 1;
      acc.totalRevenue += plan.totalCost;
      return acc;
    },
    {
      totalRevenue: 0,
      mealBreakdown: {},
    },
  );
  return { totalCustomers: plans.length, ...summary };
}

export function applyAddons(plan, ...addons) {
  // Your code here
  if (plan === null) return null;
  let { name, mealType, days, dailyRate, totalCost } = plan;
  const addonNames = [];
  for (let addon of addons) {
    dailyRate += addon.price;
    addonNames.push(addon.name);
  }
  totalCost = dailyRate * days;
  return { name, mealType, days, dailyRate, totalCost, addonNames };
}

//learnt more about spread and rest operators.

/* 
SPREAD OPERATOR Use Cases :
1)Copying Arrays/Objects: Creates a shallow copy so you don't mutate the original.
#special  : YOu can use spread operator for objects also along with array.

2)Merging: Combining multiple arrays or objects into one.
example : const starter = ["Samosa", "Paneer Tikka"];
const menu = [...starter, "Dosa", "Vada"]; 
const user = { name: "Rahul", age: 25 };
const updatedUser = { ...user, city: "Bangalore" }; 

3)Function Calls: Passing array elements as individual arguments.
example : function kuchbhi(...factories){} where factories is an array of objects or something.
*/

/*
REST OPERATOR Use Cases : 
1)Function Parameters: Handling an unknown number of arguments.
explantion : if you say function kuchbhi(...factories){} , then the using factories like for(let factory of factories) etc directly is rest operator i.e the function knows what is meant by factories.

2)Destructuring: Collecting the "rest" of the properties after extracting specific ones.
example : let { dailyRate, days, ...otherDetails } = plan --> here you did shallow copy.
              |__________________________________|
                             |
                             |
                             |------> order does not matter here.
 */

/* 
if plans is array of objects and plan = { name, mealType, days, dailyRate, totalCost };
1) let secrets = plans ---> direct reference(changes in plan leads to changes in secrets) --> no shallow copy
2) let secrets = [...plans] ---> shallow copy
4) let { name, mealType, days, dailyRate, totalCost } = plan; ----> shallow copy
3) let secrets = structuredClone[plans] ----> complete new array created with same content as plans but with zero references passed.
*/
