const fs = require('fs');
const html2markdown = require('html2markdown');
const puppeteer = require('puppeteer');

let browser;

const scrape = async (url) => {
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
      title: title.textContent,
      author: author.textContent,
      content: content.innerHTML
    }; // 返回数据
	});

	return result;
};

const scrapeList = async (url) => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	await page.goto(url);

	const result = await page.evaluate(() => {
    const as = document.querySelectorAll('.post-list a');
		const list = [];
		as.forEach(v => list.push(v.href));
		
		return {
      list
    }; // 返回数据
	});

	browser.close();
	return result;
};

scrapeList(process.argv[2]).then(async ({ list }) => {
	console.log(list);
	browser = await puppeteer.launch({ headless: false });
	
	list.forEach(async (url, index) => {
		const name = index ? `${index}` : 'README';
		const pathname = `mds/${name}.md`;
		if (!fs.existsSync(pathname)) {
			await scrape(url).then((value) => {
				console.log('success'); // Success!
				console.log(html2markdown(value.author));

				fs.writeFileSync(pathname,
`
# ${html2markdown(value.title).replace(/&nbsp;/g, ' ')}  

> ${html2markdown(value.author).replace(/&nbsp;/g, ' ').replace(/\s/g, '').replace(/\*/g, '')}  

${`${html2markdown(value.content)}`.replace(/&nbsp;/g, ' ').replace(/ /g, '')}
`
				);
			})
		}
	});
});