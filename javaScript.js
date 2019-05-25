
$(document).ready(function () {

    var characters = {
        "Naruto Uzumaki": {
            name: "Naruto Uzumaki",
            health: 120,
            attack: 12,
            imageUrl: "AnimeX_673432.jpeg",
            enemyAttackBack: 15
        },
        "Sasuke Uchiha": {
            name: "Sasuke Uchiha",
            health: 100,
            attack: 13,
            imageUrl: "AnimeX_606239.jpeg",
            enemyAttackBack: 10
        },
        "Sakura Haruno": {
            name: "Sakura Haruno",
            health: 50,
            attack: 5,
            imageUrl: "AnimeX_644141.jpeg",
            enemyAttackBack: 5
        },
        "Kakashi Hatake": {
            name: "Kakashi Hatake",
            health: 175,
            attack: 20,
            imageUrl: "AnimeX_221968.jpeg",
            enemyAttackBack: 20
        },
        "Madara Uchiha": {
            name: "Madara Uchiha",
            health: 180,
            attack: 25,
            imageUrl: "AnimeX_665330.jpeg",
            enemyAttackBack: 25
        }
    };


    var attacker;
    var cobatants = [],
        defnder,
        turnCounter = 1,
        killCount = 0;



    var renderCharacter = function (character, renderAera) {
        var charDiv = $("<div class = 'character' data name= '" + character.name + "'>");
        var charName = $("div class = 'character-name'>").text(character.name);
        var charImage = $("<img alt ='image' class = 'character-image'>").attr("src", character.imageUrl);
        var charHealth = $("div class = 'character-health'>").text(character.health);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderAera).append(charDiv);
    };



    var initializeGame = function () {
        for (var key in characters) {
            renderCharacter(character[key], "#character-section");
        };

    };
    initializeGame();



    var updateCharacter = function (charObj, areaRender) {
        $(areaRender).empty();
        renderCharacter(cahrObj, areaRender);
    };


    var renderEnemies = function (enemyArr) {
        for (var i = 0; i < enemyArr.length; i++) {
            renderCharacter(enemyArr[i], "#available-to-attack-section");
        }
    };

    var renderMessage = function (message) {
        var gameMessageSet = $("#game-message");
        var newMessage = $("<div>").text(message);
        gameMessageSet.append(newMessage);
    };

    var restartGame = function (resultMessage) {
        var restart = $("<button>Restart</button>").click(function () {
            location.reload();
        });

        var gameState = $("<div>").text(resultMessage);
        $("body").append(gameState);
        $("body").append(restart);
    };



    var clearMessage = function () {
        var gameMessage = $("#game-message");

        gameMessage.text("");
    };



    $("characters-section").on("click", ".character", function () {

        var name = $(this).attr("data-name");

        if ($("#defender").children().length === 0) {
            defender = characters[name];
            updateCharacter(defender, "#defender");


            $(this).remove();
            clearMessage();
        }

    });


    $("#attack-button").on("click", function () {

        if ($("defender").children().length === 0) {
            var attackMessage = "You attacked" + defender.name + "for" + attacker.attack * trunCounter + "damage.";
            var counterAttackMessage = defnder.name + "attacked you for" + defender.enemyAttackBack + "damage.";
            clearMessage();



            defender.health -= attacker.attack * turnCounter;

            if (defender.health > 0) {
                updateCharacter(defender, "#defender");
                renderMessage(attackMessage);
                renderMessage(counterAttackMessage);


                attacker.health -= defender.enemyAttackBack;

                updateCharacter(attacker, "#selected-character");


                if (attacker.health <= 0) {
                    clearMessage();
                    restartGame("You have been defeated......MATCH OVER!!!");
                    $("#attack-button").off("click");
                }
            }
            else {
                $("#defender").empty();
                var gameStateMessage = "You Have Defeated" + defender.name + ", You can now challenge another Shinnobi.";
                renderMessage(gameStateMessage);

                killCount++;

                if (killCount >= cobatants.length) {
                    clearMessage();
                    $("#attack-button").off("click");
                    restartGame("YOU WIN!!...MATCH OVER!!");
                }
            }

            turnCounter++;
        }
        else {
            clearMessage();
            renderMessage("There is on enemy here");
        }
    });
});