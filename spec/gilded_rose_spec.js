var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),

      // This Conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const days = Number(process.argv[2]) || 2;
    const gildedRose = new Shop(items);

    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      console.log("name, sellIn, quality");
      items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      gildedRose.updateQuality();
    }
  });

  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  it ("Une fois que la date de péremption est passée, la qualité se dégrade deux fois plus rapidement", function() {
    const gildedRose = new Shop([new Item("Elixir of the Donuts", -1, 3), new Item("Elixir of the Mongoose", 5, 7)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Elixir of the Donuts", -2, 1));
    expect(items[1]).toEqual(new Item("Elixir of the Mongoose", 4, 6))
  })

  it ("La qualité (quality) d'un produit ne peut jamais être négative.", function() {
    const gildedRose = new Shop([new Item("Elixir of the Donuts", 0, 1), new Item("Elixir of the Mongoose", 5, 7)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Elixir of the Cobra", -1, 0));
    expect(items[1]).toEqual(new Item("Elixir of the Mongoose", 4, 6));
  })

  it ("Aged Brie augmente sa qualité (quality) plus le temps passe, mais la qualité tombe à 0 après le concert.", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 13, 8), new Item("Aged Brie", 0, 18)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Aged Brie", 12, 9));
    expect(items[1]).toEqual(new Item("Aged Brie", -1, 0));
  })

  it ("La qualité d'un produit n'est jamais de plus de 50.", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 7, 50), new Item("Backstage passes to a TAFKAL80ETC concert", 2, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Aged Brie", 6, 50));
    expect(items[1]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", 1, 50));
  })

  it("Sulfuras, étant un objet légendaire, n'a pas de date de péremption et ne perd jamais en qualité (quality)", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
  })

  it("la qualité augmente par 3 quand il reste 5 jours ou moins", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 3, 6), new Item("Backstage passes to a TAFKAL80ETC concert", 2, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).toBe(2);
    expect(items[0].quality).toBe(9);
    expect(items[1].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[1].sellIn).toBe(1);
    expect(items[1].quality).toBe(8);
  })

  it("la qualité augmente de 2 quand il reste 10 jours ou moins", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 9, 31), new Item("Backstage passes to a TAFKAL80ETC concert", 6, 27)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", 8, 33));
    expect(items[1]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 29));
  })

  it("la qualité tombe à 0 après le concert (jour 0)", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 42)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0));
  })

  it ("les éléments Conjured voient leur qualité se dégrader deux fois plus vite que les objets normaux.", function() {
    const gildedRose = new Shop([new Item("Conjured Weapon", 5, 50), new Item("Conjured Backstage passes to a TAFKAL80ETC concert", 1, 15)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Conjured Weapon", 4, 48));
    expect(items[1]).toEqual(new Item("Conjured Backstage passes to a TAFKAL80ETC concert", 0, 13));
  })

  });




