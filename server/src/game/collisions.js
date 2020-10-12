function playerEnemyCollision(players, enemies) {
    players.forEach(p => {
        enemies.forEach(e => {
            if (p.row === e.row && p.col === e.col) p.enemyCollision();
        })
    });
}

module.exports = { playerEnemyCollision };