function generateArticleHash(title) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    const char = title.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  let num = Math.abs(hash);
  for (let i = 0; i < 4; i++) {
    result = chars[num % 36] + result;
    num = Math.floor(num / 36);
  }
  return result;
}

console.log('文章链接的生成原理:', generateArticleHash('文章链接的生成原理'));
console.log('当前静态数据中的ID:', '7w5i');
