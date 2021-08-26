import { User } from "../userData/User";
import { GameStatus } from "../utils/GameStatus";
import { randomUUID } from "crypto";
import { Bid } from "./Bid";
import e from "express";

export class Game {
    private id: String;
    private playerList: Array<User>;
    private gameStatus: String;
    private gameHistory: Array<String>;
    private gameName: String;
    private gamePassword: String;
    public numberOfPlayers: number;
    private currentPlayer: number;
    public currentBid?: Bid;

    constructor(name: String, password: String) {
        this.id = randomUUID();
        this.playerList = [];
        this.gameStatus = GameStatus.NOT_STARTED;
        this.gameHistory = []
        this.gameName = name;
        this.gamePassword = password;
        this.numberOfPlayers = 0;
        this.currentPlayer = 0;
        this.currentBid = undefined;

    }

    public startGame() {
        this.gameStatus = GameStatus.CURRENT;
        this.numberOfPlayers = this.playerList.length;
        this.startRound();
    }

    private startRound() {
        this.setStartingPlayer();
        this.playerList.forEach( (player) => {
            player.rollDice()
        })
    }

    private setStartingPlayer(): void {
        // Initialize the player that starts.
        if (this.currentPlayer === 0) {
            this.currentPlayer = Math.floor(Math.random() * (this.numberOfPlayers + 1));
            this.playerList[this.currentPlayer].isActive = true;
        } else {
            this.playerList[this.currentPlayer].isActive = false;
            this.currentPlayer = Math.floor(Math.random() * (this.numberOfPlayers + 1));
            this.playerList[this.currentPlayer].isActive = true;
        }
    }

    public addUser(user: User): void {
        this.playerList.push(user);
    }

    get gameId(): String {
        return this.id;
    }

    get users(): Array<User> {
        return this.playerList;
    }

    get name(): String {
        return this.gameName;
    }

    get password(): String {
        return this.gamePassword;
    }
}