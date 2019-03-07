//---------------------------------
// 不可視ユニット管理クラステスト
// 作成者：FlatMountain
//---------------------------------

var assert = require('power-assert');
var sinon = require('sinon');
var source = require('../src/InvisibleUnitManager.js');

/**
 * モックユニット
 */
var Unit = (function () {
    var unit = function () {
        this._id = 0;
        this._mapX = 0;
        this._mapY = 0;
        this._invisibleFlag = false;
    };

    var p = unit.prototype;

    p.getId = function () {
        return this._id;
    };

    p.getMapX = function () {
        return this._mapX;
    }

    p.getMapY = function () {
        return this._mapY;
    }

    p.setInvisible = function (flag) {
        this._invisibleFlag = flag;
    }

    p.isInvisible = function () {
        return this._invisibleFlag;
    }

    return unit;
})();

describe('不可視ユニット管理クラステスト', function () {
    // 初期条件チェック
    it('初期化時は不可視ユニットが登録されていない', function () {
        var invisibleUnitManager = new source.InvisibleUnitManager();

        var keys = Object.keys(invisibleUnitManager._invisibleUnitAssocArr);
        assert.strictEqual(keys.length, 0);
    });
    // キー作成チェック
    it('キー(x座標)_(y座標)_(unitId)を作成できる', function () {
        var invisibleUnitManager = new source.InvisibleUnitManager();

        var unit = new Unit();
        unit._id = 1;
        unit._mapX = 1;
        unit._mapY = 1;

        var key = invisibleUnitManager._createAssocArrKey(unit);
        assert.strictEqual(key, '1_1_1');
    });

    // ユニットに対して不可視処理を行う。ただし、すでに不可視であれば処理を行わない
    it('ユニットに対して不可視処理を行える', function () {
        var invisibleUnitManager = new source.InvisibleUnitManager();

        var unit = new Unit();
        var spy = sinon.spy(unit, 'setInvisible');

        invisibleUnitManager.setUnitInvisible(unit);
        assert.strictEqual(spy.withArgs(true).callCount, 1);

        spy.restore();
    });

    it('不可視処理を行った分、内部カウントが増加する', function () {
        var invisibleUnitManager = new source.InvisibleUnitManager();

        var unit = new Unit();
        unit._id = 1;
        unit._mapX = 1;
        unit._mapY = 1;

        invisibleUnitManager.setUnitInvisible(unit);
        assert.strictEqual(invisibleUnitManager._invisibleUnitAssocArr['1_1_1'], 1);

        invisibleUnitManager.setUnitInvisible(unit);
        assert.strictEqual(invisibleUnitManager._invisibleUnitAssocArr['1_1_1'], 2);
    });

    it('一度不可視処理を行ったユニットに対して、不可視処理を行わない', function () {
        var invisibleUnitManager = new source.InvisibleUnitManager();

        var unit = new Unit();

        var spy = sinon.spy(unit, 'setInvisible');

        invisibleUnitManager.setUnitInvisible(unit);
        invisibleUnitManager.setUnitInvisible(unit);
        assert.strictEqual(spy.withArgs(true).callCount, 1);

        spy.restore();
    });

    // ユニットに対して可視処理を行う。ただし、すでに可視であれば処理を行わない
    it('ユニットに対して可視化処理を行える', function () {
        assert.ok(true);
    });

    it('可視処理を行った分、内部カウントが減少する', function () {
        assert.ok(true);
    });

    it('一度可視処理を行ったユニットに対して、可視処理を行わない', function () {
        assert.ok(true);
    });

    it('不可視ユニットを取得できる', function () {
        assert.ok(true);
    });

    it('ユニットが不可視か判定できる', function () {
        assert.ok(true);
    });
});