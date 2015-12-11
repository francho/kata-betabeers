function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

function update_quality() {
  "use strict";
  for (var i = 0; i < items.length; i++) {
    if (!isAgedBrie(i) && !isBackstagePass(i)) {
      if (items[i].quality > 0) {
        if (!isSulfuras(i)) {
          items[i].quality = items[i].quality - 1
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1
        if (isBackstagePass(i) && items[i].quality < 50) {
          if (items[i].sell_in < 11) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
        }
      }
    }
    if (!isSulfuras(i)) {
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].sell_in < 0) {
      if (!isAgedBrie(i)) {
        if (!isBackstagePass(i)) {
          if (items[i].quality > 0) {
            if (!isSulfuras(i)) {
              items[i].quality = items[i].quality - 1
            }
          }
        } else {
          items[i].quality = 0;
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
        }
      }
    }
  }


  function isAgedBrie(item) {

    return items[item].name === 'Aged Brie';
  }

  function isSulfuras(item) {
    return items[item].name === 'Sulfuras, Hand of Ragnaros';
  }

  function isBackstagePass(item) {
    return items[item].name === 'Backstage passes to a TAFKAL80ETC concert';
  }

}
