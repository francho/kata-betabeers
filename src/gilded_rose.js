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

    updateQualityForAgedBrie(item) ||
    updateQualityForBackstagePass(item) ||
    updateQualityForSulfuras(item) ||
    updateQualityForDefault(item);

    updateShellIn(item);
  });

  function updateQualityForAgedBrie(item) {
    if (!isAgedBrie(item)) {
      return false;
    }

    if (sellInExpired(item)) {
      decrementQuality(item);
    } else {
      incrementQuality(item);
    }

    return true;
  }

  function updateQualityForBackstagePass(item) {
    if (!isBackstagePass(item)) {
      return false;
    }

    if (sellInExpired(item)) {
      item.quality = 0;
    } else {
      if (item.sell_in < 11) {
        incrementQuality(item);
      }
      if (item.sell_in < 6) {
        incrementQuality(item);
      }
      incrementQuality(item);
    }

    return true;
  }

  function updateQualityForSulfuras(item) {
    return isSulfuras(item);
  }

  function updateQualityForDefault(item) {
    decrementQuality(item);
    return true;
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

    item.quality -= sellInExpired(item) ? 2 : 1;
  }

  function sellInExpired(item) {
    return item.sell_in < 0;
  }

  function updateShellIn(item) {
    if (!isSulfuras(item)) {
      item.sell_in--;
    }
  }
}
