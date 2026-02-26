var Spawner = pc.createScript('spawner');

Spawner.attributes.add('itemTemplate', {type: 'asset', assetType: 'template'});
Spawner.attributes.add('player', {type: 'entity'});

Spawner.prototype.initialize = function() {
    this.timer = 0;
    this.spawnInterval = 1.5;
    this.lanes = [-3, -1, 1, 3];
};

Spawner.prototype.update = function(dt) {
    this.timer += dt;
    if (this.timer > this.spawnInterval) {
        this.timer = 0;
        this.spawnItem();
    }
};

Spawner.prototype.spawnItem = function() {
    var randomLane = this.lanes[Math.floor(Math.random() * this.lanes.length)];
    var spawnZ = this.player.getPosition().z + 50;
    var newItem = this.itemTemplate.resource.instantiate();
    this.app.root.addChild(newItem);
    newItem.setPosition(randomLane, 1, spawnZ);
};
