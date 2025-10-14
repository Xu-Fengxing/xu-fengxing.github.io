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

console.log('Markdown博客系统实现:', generateArticleHash('Markdown博客系统实现'));