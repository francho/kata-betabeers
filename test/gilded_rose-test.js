/* global update_quality, Item, items:true, expect */

describe('Gilded Rose', function() {
  'use strict';

  it('Los items degradan la calidad en una unidad por cada actualización', function() {
    items = [new Item('foo', 2, 3)];
    update_quality();
    expect(items[0].quality).toEqual(2);
  });

  it('Cuando la fecha de venta a pasado, la calidad degrada al doble de velocidad', function() {
    items = [new Item('foo', -1, 3)];
    update_quality();
    expect(items[0].quality).toEqual(1);
  });
  it('El item "aged brie" incrementa su calidad en lugar de decrementarla según pasan los días.', function() {
    items = [new Item('Aged Brie', 2, 3)];
    update_quality();
    expect(items[0].quality).toEqual(4);
  });

  it('La calidad de un item no es nunca negativa', function() {
    items = [new Item('foo', 0, 0)];
    update_quality();
    expect(items[0].quality).toEqual(0);
  });

  it('La calidad de un item nunca es mayor de 50.', function() {
    items = [new Item('Aged Brie', 2, 50)];
    update_quality();
    expect(items[0].quality).toEqual(50);
  });

  it('El item "Sulfuras", nuestro articulo más legendario!, nunca debe venderse ni disminuye su calidad.', function() {
    items = [new Item('Sulfuras, Hand of Ragnaros', 10, 40)];
    update_quality();
    expect(items[0].quality).toEqual(40);
  });

  it('Los backstage passes incrementan su valided en dos 10 días antes de la fecha de sell in', function() {
    items = [new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)];
    update_quality();
    expect(items[0].quality).toEqual(12);
  });

  it('Los backstage passes incrementan su valided en tres 5 días antes de la fecha de sell in', function() {
    items = [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)];
    update_quality();
    expect(items[0].quality).toEqual(13);
  });

  it('Los backstage passes valen 0 cuando se pasa la fecha de sell in', function() {
    items = [new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)];
    update_quality();
    expect(items[0].quality).toEqual(0);
  });





});
