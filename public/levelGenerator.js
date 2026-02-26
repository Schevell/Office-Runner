var LevelGenerator = pc.createScript('levelGenerator');

LevelGenerator.attributes.add('startTemplate', { type: 'entity', title: 'Start Layout (1)' });
LevelGenerator.attributes.add('templates', { type: 'entity', array: true, title: 'Zufalls Layouts' });
LevelGenerator.attributes.add('chunkSize', { type: 'number', default: 25 });
LevelGenerator.attributes.add('viewDistance', { type: 'number', default: 400 });
LevelGenerator.attributes.add('poolSize', { type: 'number', default: 30, title: 'Chunk Pool Size' });
LevelGenerator.attributes.add('playerEntity', { type: 'entity', title: 'Player Entity' });

LevelGenerator.prototype.initialize = function() {
    this.activeChunks = [];
    this.chunkPool = [];
    this.nextSpawnZ = 0;

    for (var i = 0; i < this.poolSize; i++) {
        var randomIndex = Math.floor(Math.random() * this.templates.length);
        var newChunk = this.templates[randomIndex].clone();
        newChunk.enabled = false;
        this.app.root.addChild(newChunk);
        this.chunkPool.push(newChunk);
    }

    if (this.startTemplate) {
        this.spawnSpecificChunk(this.startTemplate);
    } else if (this.chunkPool.length > 0) {
        this.recycleChunkFromPool();
    }

    var maxInitial = Math.ceil(this.viewDistance / this.chunkSize) + 2;
    var spawned = this.activeChunks.length;
    while (this.nextSpawnZ < this.viewDistance && spawned < maxInitial && this.chunkPool.length > 0) {
        this.recycleChunkFromPool();
        spawned++;
    }
};

LevelGenerator.prototype.update = function(dt) {
    var playerZ;

    // Sichere Abfrage – verhindert, dass zPos = 0 als falsy gilt
    const chair = this.playerEntity?.script?.chairController;
    playerZ = chair?.zPos ?? (this.playerEntity ? this.playerEntity.getPosition().z : 0);

    var threshold = this.nextSpawnZ - this.viewDistance;

    var spawnCount = 0;
    while (playerZ > threshold && this.chunkPool.length > 0 && spawnCount < 8) {  // erhöht auf 8
        this.recycleChunkFromPool();
        threshold = this.nextSpawnZ - this.viewDistance;
        spawnCount++;
    }

    var maxActive = Math.ceil(this.viewDistance / this.chunkSize) + 2;
    var deleteCount = 0;
    while (this.activeChunks.length > maxActive && deleteCount < 5) {
        this.recycleToPool();
        deleteCount++;
    }

    deleteCount = 0;
    while (this.activeChunks.length > 0 && deleteCount < 5) {
        var oldestChunk = this.activeChunks[0];
        var deleteBuffer = this.chunkSize * 1;
        if (playerZ > oldestChunk.getPosition().z + this.chunkSize + deleteBuffer) {
            this.recycleToPool();
            deleteCount++;
        } else {
            break;
        }
    }
};

LevelGenerator.prototype.recycleChunkFromPool = function() {
    var chunk = this.chunkPool.shift();
    if (!chunk) return;

    chunk.setPosition(0, 0, this.nextSpawnZ);
    chunk.enabled = true;
    this.activeChunks.push(chunk);
    this.nextSpawnZ += this.chunkSize;
};

LevelGenerator.prototype.recycleToPool = function() {
    var oldChunk = this.activeChunks.shift();
    if (oldChunk) {
        oldChunk.enabled = false;
        this.chunkPool.push(oldChunk);
    }
};

LevelGenerator.prototype.spawnSpecificChunk = function(templateEntity) {
    if (!templateEntity) return;
    var newChunk = templateEntity.clone();
    newChunk.enabled = true;
    newChunk.setPosition(0, 0, this.nextSpawnZ);
    this.app.root.addChild(newChunk);
    this.activeChunks.push(newChunk);
    this.nextSpawnZ += this.chunkSize;
};

LevelGenerator.prototype.fullReset = function() {
    console.log("[LevelGenerator] Full Reset");

    while (this.activeChunks.length > 0) {
        var chunk = this.activeChunks.shift();
        if (chunk) chunk.destroy();
    }

    // Pool komplett neu füllen
    this.chunkPool = [];
    for (var i = 0; i < this.poolSize; i++) {
        var randomIndex = Math.floor(Math.random() * this.templates.length);
        var newChunk = this.templates[randomIndex].clone();
        newChunk.enabled = false;
        this.app.root.addChild(newChunk);
        this.chunkPool.push(newChunk);
    }

    this.nextSpawnZ = 0;

    if (this.startTemplate) {
        this.spawnSpecificChunk(this.startTemplate);
    } else if (this.chunkPool.length > 0) {
        this.recycleChunkFromPool();
    }

    var maxInitial = Math.ceil(this.viewDistance / this.chunkSize) + 15;
    var spawned = this.activeChunks.length;
    while (this.nextSpawnZ < this.viewDistance + 400 && spawned < maxInitial && this.chunkPool.length > 0) {
        this.recycleChunkFromPool();
        spawned++;
    }

    console.log("[LevelGenerator] Reset abgeschlossen – aktive Chunks:", this.activeChunks.length, "nextSpawnZ:", this.nextSpawnZ);
};
