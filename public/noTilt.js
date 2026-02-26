var NoTilt = pc.createScript('noTilt');

NoTilt.prototype.update = function(dt) {
    this.entity.setEulerAngles(0, 0, 0);
};
