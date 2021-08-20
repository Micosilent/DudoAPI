"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var GameData_1 = require("./GameData");
var Game = /** @class */ (function () {
    function Game(gameName, password) {
        this.gameData = new GameData_1.GameData(gameName || '', password || '');
    }
    Object.defineProperty(Game.prototype, "gameId", {
        get: function () {
            return this.gameData.Id;
        },
        enumerable: false,
        configurable: true
    });
    return Game;
}());
exports.Game = Game;
