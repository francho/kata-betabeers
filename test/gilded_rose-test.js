/* global update_quality, Item, items:true, expect */

describe("Gilded Rose", function() {
  "use strict";

  it("should foo", function() {
    items = [ new Item("foo", 0, 0) ];
    update_quality();
    expect(items[0].name).toEqual("fixme");
  });

});
