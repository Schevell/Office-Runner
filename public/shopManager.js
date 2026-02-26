var ShopManager = pc.createScript('shopManager');

ShopManager.attributes.add('chairLeftArrow', { type: 'entity' });
ShopManager.attributes.add('chairRightArrow', { type: 'entity' });
ShopManager.attributes.add('chairImage', { type: 'entity' });
ShopManager.attributes.add('chairPriceText', { type: 'entity' });
ShopManager.attributes.add('chairBuyButton', { type: 'entity' });
ShopManager.attributes.add('skinLeftArrow', { type: 'entity' });
ShopManager.attributes.add('skinRightArrow', { type: 'entity' });
ShopManager.attributes.add('skinImage', { type: 'entity' });
ShopManager.attributes.add('skinPriceText', { type: 'entity' });
ShopManager.attributes.add('skinBuyButton', { type: 'entity' });

ShopManager.prototype.initialize = function() {
    console.log("[ShopManager] Initialisiert");

    this.chairs = [
        { name: "Standard Chair", price: 0, imageAsset: 'chair_standard' },
        { name: "Red Chair", price: 50, imageAsset: 'chair_red' },
        { name: "Blue Chair", price: 100, imageAsset: 'chair_blue' }
    ];
    this.currentChairIndex = 0;

    this.skins = [
        { name: "Default Skin", price: 0, imageAsset: 'skin_default' },
        { name: "Fire Skin", price: 30, imageAsset: 'skin_fire' },
        { name: "Ice Skin", price: 60, imageAsset: 'skin_ice' }
    ];
    this.currentSkinIndex = 0;

    if (this.chairLeftArrow && this.chairLeftArrow.element) this.chairLeftArrow.element.on('click', () => this.changeItem('chair', -1));
    if (this.chairRightArrow && this.chairRightArrow.element) this.chairRightArrow.element.on('click', () => this.changeItem('chair', 1));
    if (this.skinLeftArrow && this.skinLeftArrow.element) this.skinLeftArrow.element.on('click', () => this.changeItem('skin', -1));
    if (this.skinRightArrow && this.skinRightArrow.element) this.skinRightArrow.element.on('click', () => this.changeItem('skin', 1));

    if (this.chairBuyButton && this.chairBuyButton.element) this.chairBuyButton.element.on('click', () => this.buyItem('chair'));
    if (this.skinBuyButton && this.skinBuyButton.element) this.skinBuyButton.element.on('click', () => this.buyItem('skin'));

    this.updateDisplay('chair');
    this.updateDisplay('skin');
};

ShopManager.prototype.changeItem = function(type, direction) {
    if (type === 'chair') {
        this.currentChairIndex = (this.currentChairIndex + direction + this.chairs.length) % this.chairs.length;
        this.updateDisplay('chair');
    } else if (type === 'skin') {
        this.currentSkinIndex = (this.currentSkinIndex + direction + this.skins.length) % this.skins.length;
        this.updateDisplay('skin');
    }
};

ShopManager.prototype.updateDisplay = function(type) {
    if (type === 'chair') {
        var item = this.chairs[this.currentChairIndex];
        if (this.chairImage.element) this.chairImage.element.spriteAsset = this.app.assets.find(item.imageAsset);
        if (this.chairPriceText.element) this.chairPriceText.element.text = item.price + " Cups";
    } else if (type === 'skin') {
        var item = this.skins[this.currentSkinIndex];
        if (this.skinImage.element) this.skinImage.element.spriteAsset = this.app.assets.find(item.imageAsset);
        if (this.skinPriceText.element) this.skinPriceText.element.text = item.price + " Cups";
    }
};

ShopManager.prototype.buyItem = function(type) {
    var item;
    if (type === 'chair') item = this.chairs[this.currentChairIndex];
    else if (type === 'skin') item = this.skins[this.currentSkinIndex];

    var totalCups = parseInt(localStorage.getItem('totalCups')) || 0;
    if (totalCups >= item.price) {
        totalCups -= item.price;
        localStorage.setItem('totalCups', totalCups);
        console.log(type + " gekauft: " + item.name);
    } else {
        console.log("Nicht genug Cups!");
    }
};
