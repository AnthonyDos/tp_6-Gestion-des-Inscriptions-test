const { Builder, By, until } = require("selenium-webdriver");

async function formulaire() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://localhost:3000/formulaire.html");

    await driver.wait(until.elementLocated(By.id("name")), 20000);

    await driver.findElement(By.id("name")).sendKeys("John Doe");
    await driver.findElement(By.id("email")).sendKeys("john@example.com");
    await driver.findElement(By.id("phone")).sendKeys("0123456789");
    await driver.findElement(By.id("submit")).click();
  } finally {
    await driver.quit();
  }
}

async function enrollPage() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.manage().setTimeouts({ implicit: 30000 });
    await driver.get("http://localhost:3000/enroll.html");

    await driver.wait(until.elementLocated(By.id("courseForm")), 20000);

    await driver.findElement(By.id("mathsDay")).sendKeys("1");
    await driver.findElement(By.id("mathsTime")).sendKeys("morning");
    await driver.findElement(By.id("francaisDay")).sendKeys("2");
    await driver.findElement(By.id("francaisTime")).sendKeys("afternoon");

    await driver.findElement(By.id("submit")).click();

    const enrollmentMessage = await driver.wait(
      until.elementLocated(By.id("courseForm")),
      30000
    );

    const messageText = await enrollmentMessage.getText();
    console.log("Message d'inscription:", messageText);
  } finally {
    await driver.quit();
  }
}

formulaire();
enrollPage();
