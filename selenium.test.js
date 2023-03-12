const { Builder, By} = require("selenium-webdriver");
require("dotenv").config();

describe("WDV4416 Testing with Selenum", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
  });

  afterAll(async () => {
    await driver.quit();
  });

  const setDelay = async () => {
    await driver.sleep(500);
  };

  it("Open test webpage", async () => {
    await driver.get(process.env.url);
    await driver.getTitle().then((title) => {
      expect(title).toEqual("Home");
    });
    await setDelay();
  });

  it("Navigate to Contact us page", async () => {
    await driver.get(driver.getCurrentUrl());
    await driver.findElement(By.id("contactLink")).click();
    await driver.getTitle().then((title) => {
      expect(title).toEqual("Contact Us");
    });
    await setDelay();
  });

  it("Submit name and test response message", async () => {
    await driver.get(driver.getCurrentUrl());
    let inputBox = await driver.findElement(By.id("formInput"));
    await inputBox.sendKeys("Morty Smith");
    await driver.findElement(By.id("formSubmit")).click();
    await setDelay();

    await driver.findElement(By.id("formMessage")).getText().then(text => {
        expect(text).toMatch(/More info coming to .+/)
    });
    await setDelay();
  });
});
