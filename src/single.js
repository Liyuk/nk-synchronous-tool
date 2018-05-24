let puppeteer = require('puppeteer');
let html2markdown = require('html2markdown');


const scrape = async (url) => {
  const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	await page.goto(url);

	const result = await page.evaluate(() => {

    let title = document.querySelector('.mod-title.t0 h2');
    let content = document.querySelector('.article-content .mod');
    let author = content.firstChild;
    if(author.textContent === '') {
      content.removeChild(author);
      author = content.firstChild;
    }
    content.removeChild(author);

		return {
      title: title.innerHTML,
      author: author.innerHTML,
      content: content.innerHTML
    }; // 返回数据
	});

  browser.close();
	return result;
};

scrape(process.argv[2]).then((value) => {
  // console.log(html2markdown(value.title));
  console.log(html2markdown(value.author).replace(/&nbsp;/g, ' ').replace(/\s/g, '').replace(/\*/g, ''));
  // console.log(html2markdown(value.content));
})