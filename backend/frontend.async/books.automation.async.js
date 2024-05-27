const { Builder, By, until } = require('selenium-webdriver');

async function createNewBook(bookImageFilename, bookImageFile, bookTitle, bookAuthor, bookGenre, bookContentFilename, bookContentFile) {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://lg2slibrarysystem.netlify.app/LoginPage');
        await driver.findElement(By.css('input[type="email"]')).sendKeys('GilbertLawrence@gmail.com');
        await driver.findElement(By.css('input[type="password"]')).sendKeys('Lawrence');
        await driver.findElement(By.css('button[type="submit"]')).click();

        await driver.wait(until.urlContains('https://lg2slibrarysystem.netlify.app/ManageBooks'), 10000);
        
        const createButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Create New Book')]")), 10000);
        await createButton.click();

        await driver.wait(until.elementLocated(By.id('formFile')), 10000).sendKeys(bookImageFile);
        await driver.findElement(By.id('bookTitle')).sendKeys(bookTitle);
        await driver.findElement(By.id('authorName')).sendKeys(bookAuthor);
        
        await driver.findElement(By.xpath("//div[@aria-labelledby='dropdown-basic']")).click();
        await driver.findElement(By.xpath(`//div[@aria-labelledby='dropdown-basic']//a[text()='${bookGenre}']`)).click();

        await driver.findElement(By.id('formFileContent')).sendKeys(bookContentFile);
        
        const storeButton = await driver.findElement(By.xpath("//button[contains(text(),'Store Book')]"));
        await storeButton.click();
        
        await driver.wait(until.alertIsPresent(), 10000);
        const alert = await driver.switchTo().alert();
        await alert.accept();
        
    } finally {
        await driver.quit();
    }
}

module.exports = createNewBook;
