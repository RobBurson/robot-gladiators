/* GAME FUNCTIONS */

// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

// fight function (now with parameter for enemy's object holding name, health, and attack values)
var fight = function(enemy) {
  while (playerInfo.health > 0 && enemy.health > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money", playerInfo.money)
        break;
      }
    }

    // generate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemy.attack variable
    var damage = randomNumber(enemy.attack - 3, enemy.attack);

    playerInfo.health = Math.max(0, playerInfo.health - damage);
    
    console.log(
      enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  }
};

// function to start a new game
var startGame = function() {
  // reset player stats
  playerInfo.reset();

  // fight each enemy robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fight next enemy
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

      // pick new enemy to fight based on the index of the enemyInfo array
      var pickedEnemyObj = enemyInfo[i];

      // set health for picked enemy
      pickedEnemyObj.health = randomNumber(40, 60);

      // pass the pickedEnemyObj object variable's value into the fight function, where it will assume the value of the enemy parameter
      fight(pickedEnemyObj);

      // if player is still alive and we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask if player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
      
        // if yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }
      }
    }
    // if player is not alive, break out of the loop and let endGame function run
    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }

  // after loop ends, we are either out of player.health or enemies to fight, so run the endGame function
  endGame();
};

// function to end the entire game
var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");

  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + '.');
  } else {
    window.alert("You've lost your robot in battle!");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm('Would you like to play again?');

  if (playAgainConfirm) {
    startGame();
  } else {
    window.alert('Thank you for playing Robot Gladiators! Come back soon!');
  }
};

// go to shop between battles function
var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    'Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one "REFILL", "UPGRADE", or "LEAVE" to make a choice.'
  );

  // use switch case to carry out action
  switch (shopOptionPrompt) {
    case 'REFILL':
    case 'refill':
      playerInfo.refillHealth();
      break;
    case 'UPGRADE':
    case 'upgrade':
      playerInfo.upgradeAttack();
      break;
    case 'LEAVE':
    case 'leave':
      window.alert('Leaving the store.');

      // do nothing, so function will end
      break;
    default:
      window.alert('You did not pick a valid option. Try again.');

      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

/* END GAME FUNCTIONS */

/* GAME INFORMATION / VARIABLES */

// player information
var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    } 
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } 
    else {
      window.alert("You don't have enough money!");
    }
  }
};

// enemy information
var enemyInfo = [
  {
    name: 'Roborto',
    attack: randomNumber(10, 14)
  },
  {
    name: 'Amy Android',
    attack: randomNumber(10, 14)
  },
  {
    name: 'Robo Trumble',
    attack: randomNumber(10, 14)
  }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);

/* END GAME INFORMATION / VARIABLES */

/* RUN GAME */
startGame();

// var randomNumber = function (min, max) {
//   var value = Math.floor(Math.random() * (min - max + 1));

//   return value;
// };

// var fight = function (enemy) {
//   while (playerInfo.health > 0 && enemy.health > 0) {
//     var promptFight = window.prompt(
//       "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
//     );
//     if (promptFight === "skip" || promptFight === "SKIP") {
//       var confirmSkip = window.confirm("Are you sure you'd like to quit?");
//       if (confirmSkip) {
//         window.alert(
//           playerInfo.name + " has chosen to skip the fight! Goodbye!"
//         );
//         playerInfo.money = Math.max(0, playerInfo.money - 10);
//         console.log("playerInfo.money", playerInfo.money);
//         break;
//       }
//     }
//     // if (promptFight === "fight" || promptFight === "FIGHT") {
//     //Subtract the value of `playerInfo.attack` from the value of `enemy.health` and use that result to update the value in the `enemy.health` variable
//     enemy.health = Math.max(0, enemy.health - playerInfo.attack);
//     // Log a resulting message to the console so we know that it worked.
//     console.log(
//       playerInfo.name +
//         " attacked " +
//         enemy.name +
//         ". " +
//         enemy.name +
//         " now has " +
//         enemy.health +
//         " health remaining."
//     );
//     if (enemy.health <= 0) {
//       playerInfo.money = playerInfo.money + 20;
//       break;
//     } else {
//       window.alert(enemy.name + " still has " + enemy.health + " health left.");
//       // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
//       var damage = randomNumber(enemy.attack - 3, enemy.attack);
//       playerInfo.health = Math.max(0, playerInfo.health - damage);
//       // Log a resulting message to the console so we know that it worked.
//       console.log(
//         enemy.name +
//           " attacked " +
//           playerInfo.name +
//           ". " +
//           playerInfo.name +
//           " now has " +
//           playerInfo.health +
//           " health remaining."
//       );
//       if (playerInfo.health <= 0) {
//         window.alert(playerInfo.name + " has been defeated!" + " Game over!");
//         break;
//       } else {
//         window.alert(
//           playerInfo.name + " still has " + playerInfo.health + " health left."
//         );
//       }
//     }
//   }
// };
// var startGame = function () {
//   var startGame = function () {
//     playerInfo.reset();
//   };
//   for (var i = 0; i < enemyInfo.length; i++) {
//     if (playerInfo.health > 0) {
//       window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
//       var pickedEnemyObj = enemyInfo[i];
//       var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
//       pickedEnemyObj.health = randomNumber(40, 60);
//       // debugger;
//       fight(pickedEnemyObj);

//       if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
//         var storeConfirm = window.confirm(
//           "The fight is over, visit the store before the next round?"
//         );

//         if (storeConfirm) {
//           shop();
//         }
//       }
//     } else {
//       window.alert("You have lost your robot in battle! Game Over!");
//       break;
//     }
//   }
//   endGame();
// };

// var endGame = function () {
//   if (playerInfo.health > 0) {
//     window.alert(
//       "Great job, you've survived the game! You now have score of " +
//         playerInfo.money +
//         " ."
//     );
//   } else {
//     window.alert("The game has now ended. Let's see how you did!");
//   }
//   var playAgainConfirm = window.confirm("Would you like to play again?");

//   if (playAgainConfirm) {
//     startGame();
//   } else {
//     window.alert("Thank you for playing Robot Gladiators! Come back soon!");
//   }
// };

// var shop = function () {
//   var shopOptionPrompt = window.prompt(
//     "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
//   );

//   switch (shopOptionPrompt.toLowerCase()) {
//     case "refill":
//     playerInfo.refillHealth();
//       break;
//     case "upgrade":
//     playerInfo.upgradeAttack();
//       break;
//     case "leave":
//       window.alert("Leaving the store.");
//       break;
//     default:
//       window.alert("You did not pick a valid option. Try again.");
//       shop();
//       break;
//   }
// };
// var playerInfo = {
//   name: window.prompt("What is your robot's name?"),
//   health: 100,
//   attack: 10,
//   money: 10,
//   reset: function () {
//     this.health = 100;
//     this.money = 10;
//     this.attack = 10;
//   },
//   refillHealth: function (){
//     if (this.money >= 7) {
//       window.alert("Refilling player's health by 20 for 7 dollars.");
//       this.health += 20;
//       this.money -= 7;
//     }
//     else {
//       window.alert("You don't have enough money!");
//     }
//   },
//   upgradeAttack: function() {
//     if (this.money >= 7) {
//       window.alert("Upgrading player's attack by 6 for 7 dollars.");
//       this.attack += 6;
//       this.money -= 7;
//     } 
//     else {
//       window.alert("You don't have enough money!");
//     }
//   }
// };

// console.log(
//   playerInfo.name,
//   playerInfo.health,
//   playerInfo.attack,
//   playerInfo.money
// );

// var enemyInfo = [
//   {
//     name: "Roborto",
//     attack: randomNumber(10, 14),
//   },
//   {
//     name: "Amy Android",
//     attack: randomNumber(10, 14),
//   },
//   {
//     name: "Robo Trumble",
//     attack: randomNumber(10, 14),
//   },
// ];

// console.log(enemyInfo);
// console.log(enemyInfo[0]);
// console.log(enemyInfo[0].name);
// console.log(enemyInfo[0]['attack']);

// startGame();
