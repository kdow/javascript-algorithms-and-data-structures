/*

Design a cash register drawer function checkCashRegister() that accepts purchase price as the first 
argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.
  
cid is a 2D array listing available currency.

Example cash-in-drawer array:
  [["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]]
  
The checkCashRegister() function should always return an object with a status key and a change key.
  
Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if 
you cannot return the exact change.
  
Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is 
equal to the change due.
  
Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in 
highest to lowest order, as the value of the change key.

See test cases below the function.

*/

function checkCashRegister(price, cash, cid) {
  let changeObj = {};
  let changeDue = (cash - price).toFixed(2);
  let denominations = {
    'PENNY': 0.01,
    'NICKEL': 0.05,
    'DIME': 0.10,
    'QUARTER': 0.25,
    'ONE': 1.00,
    'FIVE': 5.00,
    'TEN': 10.00,
    'TWENTY': 20.00,
    'ONE HUNDRED': 100.00
  };
  let changeAmt = [];

  // Get total amount of money in register
  let moneyInReg = cid.reduce(function (prev,next) {
    return prev + next[1];
  },0);
  
  // Set status and change based on money in register compared to the amount of change to be returned
  if (moneyInReg < changeDue) {
    // If there isn't enough money in the register, immediately return with insufficient funds status
    return {status: "INSUFFICIENT_FUNDS", change:[]};
  } else if (moneyInReg > changeDue) {
    // If there is more money in the register than change due, register will be open
    changeObj = {status: "OPEN", change: changeAmt};
  } else {
    // Otherwise, if the money in register equals change due, set to closed 
    changeObj = {status: "CLOSED", change: cid};
  }

  // Iterate backwards through change in drawer (so the highest denominations are considered first)
  for (let i = cid.length-1; i >= 0; i--){
    let currencyName = cid[i][0];
    let currencyTotal = cid[i][1];
    let currencyValue = denominations[currencyName];
    let currencyQty = currencyTotal/currencyValue;
    let changeCount = 0;
    while (changeDue >= currencyValue && currencyQty > 0) {
      currencyQty--;
      changeDue -= currencyValue;
      changeDue = changeDue.toFixed(2);
      changeCount ++;
    }
    // If any currency was used this iteration, add the name and total amount used
    if (changeCount > 0) changeAmt.push([currencyName, changeCount * currencyValue]);
  }
  // If changeDue is greater than 0, the register didn't have exact change and the status will be 
  // changed to insufficient funds
  if (changeDue > 0) changeObj = {status: "INSUFFICIENT_FUNDS", change:[]};
  return changeObj;
}
  
/*
  
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) 
should return an object

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) 
should return {status: "OPEN", change: [["QUARTER", 0.5]]}

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) 
should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) 
should return {status: "INSUFFICIENT_FUNDS", change: []}

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) 
should return {status: "INSUFFICIENT_FUNDS", change: []}

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) 
should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}

*/
