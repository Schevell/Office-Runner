var UiController = pc.createScript('uiController');

UiController.attributes.add('homeContainer', { type: 'entity', title: 'Home UI Root' });
UiController.attributes.add('gameContainer', { type: 'entity', title: 'Game World Root' });
UiController.attributes.add('startButton', { type: 'entity', title: 'Start Button' });
UiController.attributes.add('shopButton', { type: 'entity', title: 'Shop Button' });
UiController.attributes.add('shopContainer', { type: 'entity', title: 'Shop UI Root' });

UiController.prototype.initialize = function() {
    console.log("[UiController] Initialisiert");

    this.homeContainer.enabled = true;
    this.gameContainer.enabled = false;
    this.shopContainer.enabled = false;

    if (this.startButton && this.startButton.element) {
        this.startButton.element.on('click', this.onStartClicked, this);
        console.log("[UiController] Start-Listener OK");
    } else {
        console.error("[UiController] Start-Button fehlt!");
    }

    if (this.shopButton && this.shopButton.element) {
        this.shopButton.element.on('click', this.onShopClicked, this);
        console.log("[UiController] Shop-Listener OK");
    } else {
        console.error("[UiController] Shop-Button fehlt!");
    }
};

UiController.prototype.onStartClicked = function() {
    console.log("[UiController] Start geklickt");
    this.app.fire('game:reset');
    this.app.fire('game:start');
    this.homeContainer.enabled = false;
    this.gameContainer.enabled = true;
};
UiController.prototype.onShopClicked = function() {
    console.log("[UiController] Shop geklickt – versuche zu öffnen");
    
    this.homeContainer.enabled = false;
    this.shopContainer.enabled = true;
    console.log("[UiController] ShopContainer enabled = true");
};
