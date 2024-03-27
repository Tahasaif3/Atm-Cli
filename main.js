#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 1000000;
let myPin = 7865;
let pinAns = await inquirer.prompt({
    name: "pin",
    type: "number",
    message: "Enter your pin!",
});
if (pinAns.pin === myPin) {
    console.log(chalk.greenBright("Correct pin code!"));
    let action = await inquirer.prompt({
        name: "trancactionType",
        type: "list",
        message: "Select the transaction you want to continue",
        choices: ["Withdraw", "Fastcash", "Balance Inquiry"]
    });
    if (action.trancactionType === "Balance Inquiry") {
        console.log(`Your current balance is: ${myBalance}`);
    }
    else if (action.trancactionType === "Withdraw") {
        let WithdrawAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Enter the amount you want to withdraw?"
        });
        if (WithdrawAmount.amount < myBalance) {
            myBalance -= WithdrawAmount.amount;
            console.log(chalk.greenBright("Transaction Successful"));
            console.log(`your remaining balance is: ${myBalance}`);
        }
        else if (WithdrawAmount.amount > myBalance) {
            console.log(chalk.redBright(`Unable to procced the transaction due to insufficient balance.\nYour current balance is ${myBalance}`));
        }
    }
    else if (action.trancactionType === "Fastcash") {
        let cashAmount = await inquirer.prompt({
            name: "cash",
            type: "rawlist",
            message: "Select the amount you want to withdraw?",
            choices: ["500", "1000", "2000", "3000", "4000", "5000", "10000"]
        });
        myBalance -= cashAmount.cash;
        console.log(chalk.greenBright("Transaction Successful"));
        console.log(`your remaining balance is: ${myBalance}`);
    }
}
else if (pinAns.pin !== myPin) {
    console.log(chalk.redBright("Incorrect pin code! Please try again later"));
}
