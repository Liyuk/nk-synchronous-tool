const fs = require('fs');
const html2markdown = require('html2markdown');
const puppeteer = require('puppeteer');


let scrape = async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	await page.goto('https://lovenk.kuaizhan.com/11/33/p342753000650e7');

	const result = await page.evaluate(() => {
    let title = document.querySelector('.mod-title.t0 h2');
    let content = document.querySelector('.article-content .mod');
    let author = content.firstElementChild;
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

scrape().then((value) => {
  console.log(value); // Success!

  // 需要去掉空格，但不去掉换行符
  fs.writeFileSync('mds/b.md',
`
# ${html2markdown(value.title)}  

> ${html2markdown(value.author)}
${`${html2markdown(value.content)}`.replace(/&nbsp;|[!\n|!\r|\s]*/g, ' ')}
`);
});