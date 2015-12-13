/* global update_quality, Item, items */

describe('Gilded Rose', function() {
  "use strict";

  describe('cada actualización', function() {

    beforeEach(function() {
      items = [new Item('foo', 1, 1), new Item('foo', 2, 3)];
      update_quality();
    });

    it('degradan la calidad en una unidad', function() {
      expect(items[1].quality).toEqual(2);
    });

    it('degrada sell_in', function() {
      expect(items[1].sell_in).toEqual(1);
    });

    describe('fecha venta pasada', function() {
      beforeEach(function() {
        items = [new Item("foo", -1, 3)];
        update_quality();
      });

      it('degrada la calidad al doble de velocidad', function() {
        expect(items[0].quality).toEqual(1);
      });

    });

    it('calidad nunca es negativa', function() {
      items = [new Item("foo", -1, 0)];
      update_quality();
      expect(items[0].quality).toEqual(0);
    });

    describe('Aged Brie', function() {
      beforeEach(function() {
        items = [new Item('Aged Brie', 1, 2)];
        update_quality();
      });

      it('incrementa su calidad en vez de decrementarla', function() {
        expect(items[0].quality).toEqual(3);
      });

      it('nunca tiene una calidad mayor que 50', function() {
        items = [new Item('Aged Brie', 1, 50)];
        update_quality();

        expect(items[0].quality).toEqual(50);
      });
    });

    describe('Sulfuras', function() {
      it('no disminuye su calidad', function() {
        items = [new Item('Sulfuras, Hand of Ragnaros', 1, 10)];
        update_quality();

        expect(items[0].quality).toEqual(10);
      });
    });

    describe('Backstage passes', function() {
      it('incrementan su calidad por 2 cuando quedan 10 dias o menos', function() {
        items = [new Item('Backstage passes to a TAFKAL80ETC concert', 9, 2)];
        update_quality();

        expect(items[0].quality).toEqual(4);
      });

      it('incrementan su calidad por 3 cuando quedan 5 dias o menos', function() {
        items = [new Item('Backstage passes to a TAFKAL80ETC concert', 3, 4)];
        update_quality();

        expect(items[0].quality).toEqual(7);
      });

      it('pierden su calidad cuando pasa la fecha', function() {
        items = [new Item('Backstage passes to a TAFKAL80ETC concert', -1, 3)];
        update_quality();

        expect(items[0].quality).toEqual(0);
      });
    });
  });

});
