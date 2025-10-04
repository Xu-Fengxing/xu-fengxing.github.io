# 光标文件使用指南

## 您的光标文件位置
- 源文件：`D:\Pictures\Cursors`
- 目标文件夹：`public\cursors`
- 文件数量：15个.ani文件

## 转换步骤

### 方法1：在线转换（推荐）
1. 访问 https://convertio.co/ani-png/
2. 上传您的.ani文件
3. 选择PNG格式
4. 下载转换后的文件

### 方法2：使用专业工具
- Cursor Icon Editor
- Axialis CursorWorkshop
- RealWorld Cursor Editor

## 需要的PNG文件名

将转换后的PNG文件重命名为以下名称，并放入 `public\cursors` 文件夹：

### 必需文件（至少需要这些）
- `default.png` - 默认光标
- `pointer.png` - 链接悬停光标

### 可选文件（根据您的光标类型选择）
- `text.png` - 文本选择光标
- `disabled.png` - 禁用状态光标
- `grab.png` - 拖拽光标
- `grabbing.png` - 拖拽中光标
- `resize-horizontal.png` - 水平调整大小
- `resize-vertical.png` - 垂直调整大小
- `loading.png` - 等待光标
- `move.png` - 移动光标
- `help.png` - 帮助光标
- `crosshair.png` - 十字光标

## 注意事项
1. PNG文件大小建议不超过32x32像素
2. 支持透明背景
3. 文件名必须完全匹配（区分大小写）
4. 如果某个光标文件不存在，会使用系统默认光标

## 测试
转换完成后，刷新网页即可看到新的光标效果。