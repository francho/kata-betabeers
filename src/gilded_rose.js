function Item(name, sell_in, quality) {
  'use strict';
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

function update_quality() {
  'use strict';
  items.forEach(function(item) {

    if (isAgedBrie(item) || isBackstagePass(item)) {
      updateQualityForAgedBrie(item);
      updateQualityForBackstagePass(item);
    } else {
      if (!isSulfuras(item)) {
        decrementQuality(item);
      }
    }

    if (!isSulfuras(item)) {
      item.sell_in = item.sell_in - 1;
    }

    if (sellInExpired(item)) {
      if (isAgedBrie(item)) {
        incrementQuality(item);
      } else {
        if ((isBackstagePass(item) || isSulfuras(item))) {
          item.quality = 0;
        } else {
          decrementQuality(item);
        }
      }
    }
  });

  function updateQualityForAgedBrie(item) {
    if(!isAgedBrie(item)) {
      return;
    }

    incrementQuality(item);
  }

  function updateQualityForBackstagePass(item) {
    if (!isBackstagePass(item)) {
      return;
    }

    incrementQuality(item);

    if (item.sell_in < 11) {
      incrementQuality(item);
    }
    if (item.sell_in < 6) {
      incrementQuality(item);
    }
  }

  function updateQualityForSulfuras(item) {

  }

  function isAgedBrie(item) {
    return item.name === 'Aged Brie';
  }

  function isSulfuras(item) {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }

  function isBackstagePass(item) {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert';
  }

  function incrementQuality(item) {
    if (item.quality >= 50) {
      return;
    }

    item.quality++;
  }

  function decrementQuality(item) {
    if (item.quality < 1) {
      return;
    }

    item.quality--;
  }

  function sellInExpired(item) {
    return item.sell_in < 0;
  }

}
