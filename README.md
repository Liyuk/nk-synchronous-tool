# nk-synchronous-tool
synchronous, web crawler

## description
这是一个针对性的爬虫，主要爬取 https://lovenk.kuaizhan.com/ 的文章内容。  

以分类页面作为爬取的 group，因为在 ourbook 项目中文章是根据学校存储的。  

输出文件为`.md`，部分存在转码错误，需要手动调整。


## how to use 
```bash
npm i

node src/crawler.js https://lovenk.kuaizhan.com/category/8500399948

# 代码中没有自动关闭chromium，ctrl + c 结束node爬虫会自动关闭
```