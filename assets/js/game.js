var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerHealth, playerAttack, playerMoney);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[1]);
console.log(enemyNames[2]);
for (var i = 0; i < enemyNames.length; i++) {
  console.log(enemyNames[i]);
  console.log(i);
  console.log(enemyNames[i] + " is at " + i + " index");
}
console.log(enemyHealth, enemyAttack);

var fight = function (enemyName) {
  window.alert("Welcome to Robot Gladiators!");
  while (playerHealth > 0 && enemyHealth > 0) {
    var promptFight = window.prompt(
      "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
    );
    if (promptFight === "skip" || promptFight === "SKIP") {
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
      if (confirmSkip) {
        window.alert(playerName + " has chosen to skip the fight! Goodbye!");
        playerMoney = playerMoney - 10;
        console.log("playerMoney", playerMoney);
        break;
      }
    // if (promptFight === "fight" || promptFight === "FIGHT") {
      //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
      enemyHealth = enemyHealth - playerAttack;
      // Log a resulting message to the console so we know that it worked.
      console.log(
        playerName +
          " attacked " +
          enemyName +
          ". " +
          enemyName +
          " now has " +
          enemyHealth +
          " health remaining."
      );
      if (enemyHealth <= 0) {
          playerMoney = playerMoney + 20;
        break;
      } else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
        // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
        playerHealth = playerHealth - enemyAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(
          enemyName +
            " attacked " +
            playerName +
            ". " +
            playerName +
            " now has " +
            playerHealth +
            " health remaining."
        );
        if (playerHealth <= 0) {
          window.alert(playerName + " has been defeated!" + " Game over!");
          break;
        } else {
          window.alert(
            playerName + " still has " + playerHealth + " health left."
          );
        } 
    } 
}   else {
      window.alert("You need to choose a valid option. Try again!");
    }
  }
};

for (var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
  fight(pickedEnemyName);
}
