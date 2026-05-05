---
title: Latex 写作指南
date: 2026-05-05 21:00:00
tags:
  - Latex
  - 教程
categories:
  - 技术
description: Latex 语法速查指南，包含常用语法和示例。
---
# LaTeX 写作指南
## 文档结构

### 基本文档结构

```latex
\documentclass[选项]{文档类}

% 导言区：宏包、设置、自定义命令
\usepackage{宏包名}

% 文档开始
\begin{document}

% 正文内容
你好，世界！

% 文档结束
\end{document}
```

### 常用文档类

| 文档类 | 说明 |
|:-------|:-----|
| `article` | 文章、短文、报告 |
| `report` | 长报告、小型论文 |
| `book` | 书籍 |
| `letter` | 信件 |
| `beamer` | 演示文稿 |

### 文档类选项

```latex
\documentclass[12pt, a4paper, twocolumn]{article}
```

常用选项：
- `10pt`、`11pt`、`12pt`：字体大小
- `a4paper`、`letterpaper`：纸张大小
- `twocolumn`：双栏排版
- `landscape`：横向页面
- `draft`：草稿模式（显示溢出盒子）

---

## 文本格式

### 字体样式

```latex
\textbf{粗体}          % 粗体
\textit{斜体}          % 斜体
\texttt{等宽字体}      % 打字机字体
\textsc{小型大写字母}  % 小型大写
\underline{下划线}     % 下划线
\emph{强调}            % 强调（通常是斜体）
```

效果：**粗体**、*斜体*、`等宽字体`等。

### 字体大小

```latex
{\tiny 极小}
{\scriptsize 脚本大小}
{\footnotesize 脚注大小}
{\small 小}
{\normalsize 正常}
{\large 大}
{\Large 更大}
{\LARGE 再大}
{\huge 巨大}
{\Huge 最大}
```

### 文本对齐

```latex
% 左对齐（默认）
\begin{flushleft}
左对齐文本
\end{flushleft}

% 居中
\begin{center}
居中文本
\end{center}

% 右对齐
\begin{flushright}
右对齐文本
\end{flushright}
```

### 段落格式

```latex
% 设置首行缩进
\usepackage{indentfirst}
\setlength{\parindent}{2em}

% 设置段落间距
\setlength{\parskip}{1em}

% 行间距
\usepackage{setspace}
\onehalfspacing    % 1.5倍行距
\doublespacing     % 双倍行距
\setstretch{1.25}  % 自定义行距
```

### 换行与分段

```latex
这是第一段。

这是第二段。  % 空行分段

这是第一行。\\  % 强制换行
这是第二行。

这是第一行。\newline  % 另一种换行方式
这是第二行。
```

---

## 数学公式

### 行内公式

```latex
爱因斯坦质能方程 $E = mc^2$ 是著名的公式。
或者使用 \(E = mc^2\) 的形式。
```

### 行间公式（无编号）

```latex
\[
E = mc^2
\]

或者

\begin{equation*}
E = mc^2
\end{equation*}
```

### 行间公式（有编号）

```latex
\begin{equation}
E = mc^2
\end{equation}
```

### 多行公式

```latex
\begin{align}
a &= b + c \\
  &= d + e + f \\
  &= g
\end{align}
```

对齐符号 `&` 标记对齐点，`\\` 换行。

### 基本数学符号

#### 希腊字母

```latex
\alpha, \beta, \gamma, \delta, \epsilon, \zeta, \eta, \theta
\iota, \kappa, \lambda, \mu, \nu, \xi, \pi, \rho
\sigma, \tau, \upsilon, \phi, \chi, \psi, \omega

% 大写
\Gamma, \Delta, \Theta, \Lambda, \Xi, \Pi, \Sigma, \Phi, \Psi, \Omega
```

#### 运算符

```latex
+  -  \times  \cdot  \div  \pm  \mp

\sum_{i=1}^{n}    % 求和
\prod_{i=1}^{n}   % 求积
\int_{a}^{b}      % 积分
\oint             % 环路积分
\iint             % 二重积分

\lim_{x \to 0}    % 极限
\frac{a}{b}       % 分数
\sqrt{x}          % 平方根
\sqrt[n]{x}       % n次根
```

#### 关系符号

```latex
=  \neq  <  >  \leq  \geq
\approx  \equiv  \sim  \simeq
\ll  \gg  \subset  \supset
\subseteq  \supseteq  \in  \notin
\perp  \parallel  \propto
```

#### 箭头符号

```latex
\rightarrow  \leftarrow  \leftrightarrow
\Rightarrow  \Leftarrow  \Leftrightarrow
\uparrow  \downarrow
\longrightarrow  \longleftarrow
\mapsto  \hookrightarrow
```

### 数学环境

#### 上下标

```latex
x^{2}       % 上标
x_{i}       % 下标
x^{2}_{i}   % 同时上下标
x_{i}^{2}   % 顺序不影响
```

#### 括号

```latex
( )  [ ]  \{ \}  | |

% 自适应大小
\left( \frac{a}{b} \right)
\left[ \frac{a}{b} \right]
\left\{ \frac{a}{b} \right\}
\left| \frac{a}{b} \right|

% 指定大小
\big(  \Big(  \bigg(  \Bigg(
```

#### 矩阵

```latex
\begin{matrix}
a & b \\
c & d
\end{matrix}

\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}  % 圆括号

\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}  % 方括号

\begin{vmatrix}
a & b \\
c & d
\end{vmatrix}  % 行列式
```

#### 分段函数

```latex
f(x) = \begin{cases}
x^2 & \text{if } x \geq 0 \\
-x^2 & \text{if } x < 0
\end{cases}
```

#### 定理环境

```latex
\usepackage{amsthm}

\newtheorem{theorem}{定理}
\newtheorem{lemma}[theorem]{引理}
\newtheorem{corollary}[theorem]{推论}
\newtheorem{definition}{定义}

\begin{theorem}
这是一个定理。
\end{theorem}

\begin{proof}
这是证明。
\end{proof}
```

---

## 列表

### 无序列表

```latex
\begin{itemize}
  \item 第一项
  \item 第二项
  \begin{itemize}
    \item 子项 A
    \item 子项 B
  \end{itemize}
  \item 第三项
\end{itemize}
```

### 有序列表

```latex
\begin{enumerate}
  \item 第一项
  \item 第二项
  \begin{enumerate}
    \item 子项 A
    \item 子项 B
  \end{enumerate}
  \item 第三项
\end{enumerate}
```

### 描述列表

```latex
\begin{description}
  \item[术语1] 描述1
  \item[术语2] 描述2
  \item[术语3] 描述3
\end{description}
```

### 自定义列表样式

```latex
\usepackage{enumitem}

% 自定义标签
\begin{itemize}[label=\textbullet]
  \item 项目1
\end{itemize}

% 自定义编号
\begin{enumerate}[label=\arabic*.]
  \item 项目1
\end{enumerate}

% 设置间距
\begin{itemize}[itemsep=10pt, topsep=10pt]
  \item 项目1
\end{itemize}
```

---

## 表格

### 基本表格

```latex
\begin{tabular}{|l|c|r|}
  \hline
  左对齐 & 居中 & 右对齐 \\
  \hline
  A1 & B1 & C1 \\
  A2 & B2 & C2 \\
  A3 & B3 & C3 \\
  \hline
\end{tabular}
```

列对齐方式：
- `l`：左对齐
- `c`：居中
- `r`：右对齐
- `|`：竖线

### 表格线

```latex
\hline          % 水平线
\cline{2-4}     % 从第2列到第4列的水平线
```

### 跨列合并

```latex
\begin{tabular}{|l|c|c|}
  \hline
  \multicolumn{2}{|c|}{合并的单元格} & C1 \\
  \hline
  A2 & B2 & C2 \\
  \hline
\end{tabular}
```

### 跨行合并

```latex
\usepackage{multirow}

\begin{tabular}{|l|c|}
  \hline
  \multirow{2}{*}{跨行单元格} & B1 \\
  & B2 \\
  \hline
  A3 & B3 \\
  \hline
\end{tabular}
```

### 浮动表格（带标题）

```latex
\begin{table}[htbp]
  \centering
  \caption{表格标题}
  \label{tab:example}
  \begin{tabular}{|l|c|r|}
    \hline
    姓名 & 年龄 & 成绩 \\
    \hline
    张三 & 20 & 95 \\
    李四 & 21 & 88 \\
    \hline
  \end{tabular}
\end{table}
```

位置选项：
- `h`：当前位置
- `t`：页面顶部
- `b`：页面底部
- `p`：单独一页
- `!`：强制

### 表格样式美化

```latex
\usepackage{booktabs}

\begin{tabular}{lcr}
  \toprule
  姓名 & 年龄 & 成绩 \\
  \midrule
  张三 & 20 & 95 \\
  李四 & 21 & 88 \\
  \bottomrule
\end{tabular}
```

---

## 图片

### 基本插入图片

```latex
\usepackage{graphicx}

% 基本插入
\includegraphics{filename.png}

% 指定宽度
\includegraphics[width=0.5\textwidth]{filename.png}

% 指定高度
\includegraphics[height=5cm]{filename.png}

% 指定缩放比例
\includegraphics[scale=0.5]{filename.png}

% 旋转
\includegraphics[angle=45]{filename.png}
```

### 浮动图片（带标题）

```latex
\begin{figure}[htbp]
  \centering
  \includegraphics[width=0.8\textwidth]{image.png}
  \caption{图片标题}
  \label{fig:example}
\end{figure}
```

### 并排图片

```latex
\begin{figure}[htbp]
  \centering
  \begin{minipage}[b]{0.45\textwidth}
    \includegraphics[width=\textwidth]{image1.png}
    \caption{图片1}
  \end{minipage}
  \hfill
  \begin{minipage}[b]{0.45\textwidth}
    \includegraphics[width=\textwidth]{image2.png}
    \caption{图片2}
  \end{minipage}
\end{figure}
```

### 子图

```latex
\usepackage{subcaption}

\begin{figure}[htbp]
  \centering
  \begin{subfigure}[b]{0.45\textwidth}
    \includegraphics[width=\textwidth]{image1.png}
    \caption{子图1}
    \label{fig:sub1}
  \end{subfigure}
  \hfill
  \begin{subfigure}[b]{0.45\textwidth}
    \includegraphics[width=\textwidth]{image2.png}
    \caption{子图2}
    \label{fig:sub2}
  \end{subfigure}
  \caption{总标题}
  \label{fig:main}
\end{figure}
```

---

## 引用与参考文献

### 交叉引用

```latex
如图~\ref{fig:example} 所示...
如表~\ref{tab:example} 所示...
如公式~\eqref{eq:example} 所示...
参见第~\pageref{sec:intro} 页...
```

### 使用 BibTeX

```latex
% 正文中引用
根据研究\cite{author2020}...

% 使用 natbib 宏包
根据研究\citet{author2020}...
根据研究\citep{author2020}...
```

### 参考文献数据库 (.bib 文件)

```bibtex
@article{author2020,
  author  = {作者姓名},
  title   = {文章标题},
  journal = {期刊名},
  year    = {2020},
  volume  = {1},
  number  = {1},
  pages   = {1--10}
}

@book{book2019,
  author    = {作者姓名},
  title     = {书名},
  publisher = {出版社},
  year      = {2019},
  address   = {出版地}
}

@inproceedings{conference2021,
  author    = {作者姓名},
  title     = {论文标题},
  booktitle = {会议名称},
  year      = {2021},
  pages     = {100--110}
}
```

### 参考文献样式

```latex
% 使用 BibTeX
\bibliographystyle{plain}    % 或 alpha, abbrv, unsrt
\bibliography{references}

% 手动参考文献
\begin{thebibliography}{99}
  \bibitem{ref1} 作者. 标题. 出版信息, 年份.
  \bibitem{ref2} 作者. 标题. 出版信息, 年份.
\end{thebibliography}
```

### 使用 biblatex

```latex
\usepackage[backend=biber, style=numeric]{biblatex}
\addbibresource{references.bib}

% 正文
\cite{author2020}

% 文档末尾
\printbibliography
```

---

## 章节与目录

### 章节命令

```latex
\part{部分}           % 部分（book, report）
\chapter{章}          % 章（book, report）
\section{节}          % 节
\subsection{小节}     % 小节
\subsubsection{小小节} % 小小节
\paragraph{段}        % 段
\subparagraph{小段}   % 小段
```

### 带星号的章节（不编号、不进入目录）

```latex
\section*{前言}
```

### 目录

```latex
\tableofcontents

% 插图目录
\listoffigures

% 表格目录
\listoftables
```

### 目录深度设置

```latex
\setcounter{tocdepth}{2}  % 目录显示到 subsection
```

---

## 页面布局

### 页面尺寸

```latex
\usepackage{geometry}
\geometry{
  a4paper,
  left=2.5cm,
  right=2.5cm,
  top=2.5cm,
  bottom=2.5cm
}
```

### 页眉页脚

```latex
\usepackage{fancyhdr}
\pagestyle{fancy}

\fancyhf{}  % 清空默认
\fancyhead[L]{左页眉}
\fancyhead[C]{中页眉}
\fancyhead[R]{右页眉}
\fancyfoot[L]{左页脚}
\fancyfoot[C]{\thepage}  % 页码
\fancyfoot[R]{右页脚}

\renewcommand{\headrulewidth}{0.4pt}  % 页眉线宽
\renewcommand{\footrulewidth}{0.4pt}  % 页脚线宽
```

### 页码样式

```latex
\pagenumbering{arabic}   % 阿拉伯数字 1, 2, 3
\pagenumbering{roman}    % 小写罗马 i, ii, iii
\pagenumbering{Roman}    % 大写罗马 I, II, III
\pagenumbering{alph}     % 小写字母 a, b, c
\pagenumbering{Alph}     % 大写字母 A, B, C
```

### 分页

```latex
\newpage        % 强制分页
\clearpage      % 清除浮动体后分页
\cleardoublepage % 双面打印时清除到奇数页
```

---

## 特殊符号

### 常用特殊符号

```latex
\#  \$  \%  \^{}  \&  \_  \{  \}  \~

% 引号
`左引号'  ``左双引号''

% 破折号
-  --  ---

% 波浪号
\~{}  \textasciitilde

% 省略号
\dots  \ldots  \cdots

% 连字
fi  fl  ffi  ffl

% 版权符号
\copyright  \textregistered  \texttrademark
```

### 重音符号

```latex
\`{o}  \'{o}  \^{o}  \~{o}  \"{o}  \={o}
\.{o}  \u{o}  \v{o}  \H{o}  \t{o}  \c{o}
\d{o}  \b{o}  \r{o}
```

### 数学特殊符号

```latex
\aleph  \hbar  \imath  \jmath  \ell
\Re  \Im  \nabla  \infty  \emptyset
\triangle  \angle  \forall  \exists
\neg  \flat  \natural  \sharp
```

---

## 自定义命令

### 新命令

```latex
% 简单命令
\newcommand{\R}{\mathbb{R}}           % 实数集
\newcommand{\N}{\mathbb{N}}           % 自然数集

% 带参数的命令
\newcommand{\norm}[1]{\left\| #1 \right\|}
\newcommand{\abs}[1]{\left| #1 \right|}
\newcommand{\inner}[2]{\langle #1, #2 \rangle}

% 使用
$ x \in \R $
$ \norm{x} $
$ \abs{-5} $
$ \inner{u}{v} $
```

### 重定义命令

```latex
\renewcommand{\abstractname}{摘要}
\renewcommand{\contentsname}{目录}
\renewcommand{\figurename}{图}
\renewcommand{\tablename}{表}
\renewcommand{\refname}{参考文献}
```

### 新环境

```latex
\newenvironment{remark}
  {\begin{trivlist}\item[\textbf{备注：}]}
  {\end{trivlist}}

% 使用
\begin{remark}
这是一个备注。
\end{remark}
```

---

## 常用宏包

### 文档类与基础

```latex
\usepackage[utf8]{inputenc}    % 输入编码
\usepackage[T1]{fontenc}       % 字体编码
\usepackage{ctex}              % 中文支持（推荐）
\usepackage{babel}             % 多语言支持
```

### 数学

```latex
\usepackage{amsmath}           % 数学公式
\usepackage{amssymb}           % 数学符号
\usepackage{amsthm}            % 定理环境
\usepackage{mathtools}         % 数学工具
\usepackage{bm}                % 粗体数学符号
```

### 图形

```latex
\usepackage{graphicx}          % 图片
\usepackage{tikz}              % 绘图
\usepackage{pgfplots}          % 数据图表
\usepackage{subcaption}        % 子图
```

### 表格

```latex
\usepackage{booktabs}          % 三线表
\usepackage{multirow}          % 跨行
\usepackage{multicol}          % 跨列
\usepackage{tabularx}          % 自动宽度表格
\usepackage{longtable}         % 跨页表格
\usepackage{array}             % 增强表格
```

### 页面布局

```latex
\usepackage{geometry}          % 页面尺寸
\usepackage{fancyhdr}          % 页眉页脚
\usepackage{setspace}          % 行距
\usepackage{indentfirst}       % 首行缩进
\usepackage{titlesec}          % 章节标题格式
```

### 引用与参考文献

```latex
\usepackage{natbib}            % 引用样式
\usepackage{hyperref}          % 超链接
\usepackage{cleveref}          % 智能引用
\usepackage{biblatex}          % 现代参考文献
```

### 代码

```latex
\usepackage{listings}          % 代码高亮
\usepackage{minted}            % 代码高亮（需要 Pygments）
\usepackage{algorithm2e}       % 算法伪代码
\usepackage{algorithmic}       % 算法伪代码
```

### 其他实用宏包

```latex
\usepackage{xcolor}            % 颜色
\usepackage{enumitem}          % 列表定制
\usepackage{caption}           % 图表标题
\usepackage{float}             % 浮动体控制
\usepackage{appendix}          % 附录
\usepackage{pdfpages}          % 插入 PDF
\usepackage{siunitx}           % 单位格式
```

---

## 完整示例

```latex
\documentclass[12pt, a4paper]{article}

% 中文支持
\usepackage[UTF8]{ctex}

% 数学
\usepackage{amsmath, amssymb, amsthm}

% 图片
\usepackage{graphicx}
\graphicspath{{images/}}

% 页面布局
\usepackage{geometry}
\geometry{left=2.5cm, right=2.5cm, top=2.5cm, bottom=2.5cm}

% 页眉页脚
\usepackage{fancyhdr}
\pagestyle{fancy}
\fancyhf{}
\fancyhead[C]{LaTeX 写作示例}
\fancyfoot[C]{\thepage}

% 超链接
\usepackage{hyperref}
\hypersetup{
  colorlinks=true,
  linkcolor=blue,
  urlcolor=blue
}

% 新命令
\newcommand{\R}{\mathbb{R}}
\newcommand{\norm}[1]{\left\| #1 \right\|}

% 标题信息
\title{LaTeX 写作示例}
\author{作者姓名}
\date{\today}

\begin{document}

\maketitle
\tableofcontents
\newpage

\section{引言}
这是引言部分。本文档展示了 LaTeX 的基本用法。

\section{数学公式}
爱因斯坦的质能方程为：
\begin{equation}
E = mc^2
\end{equation}

欧拉公式：
\begin{equation}
e^{i\pi} + 1 = 0
\end{equation}

\section{列表}
\begin{itemize}
  \item 第一项
  \item 第二项
  \begin{enumerate}
    \item 子项 A
    \item 子项 B
  \end{enumerate}
\end{itemize}

\section{表格}
\begin{table}[htbp]
  \centering
  \caption{示例表格}
  \begin{tabular}{lcr}
    \toprule
    姓名 & 年龄 & 成绩 \\
    \midrule
    张三 & 20 & 95 \\
    李四 & 21 & 88 \\
    \bottomrule
  \end{tabular}
\end{table}

\section{图片}
\begin{figure}[htbp]
  \centering
  % \includegraphics[width=0.5\textwidth]{example.png}
  \caption{示例图片}
  \label{fig:example}
\end{figure}

如图~\ref{fig:example} 所示。

\section{自定义命令}
对于 $x \in \R$，其范数为 $\norm{x}$。

\end{document}
```

---

## 编译流程

### 基本编译

```bash
# 编译 LaTeX 文件
pdflatex filename.tex

# 使用 BibTeX
pdflatex filename.tex
bibtex filename
pdflatex filename.tex
pdflatex filename.tex

# 使用 biblatex + biber
pdflatex filename.tex
biber filename
pdflatex filename.tex
pdflatex filename.tex
```

### 推荐编译方式

```bash
# 使用 latexmk（自动处理编译次数）
latexmk -pdf filename.tex

# 清理辅助文件
latexmk -c
```

### 中文文档编译

```bash
# 使用 XeLaTeX（推荐用于中文）
xelatex filename.tex

# 或使用 LuaLaTeX
lualatex filename.tex
```

---

## 速查表

| 需求 | 命令 |
|:-----|:-----|
| 粗体 | `\textbf{文本}` |
| 斜体 | `\textit{文本}` |
| 行内公式 | `$公式$` |
| 行间公式 | `\begin{equation}` |
| 分数 | `\frac{分子}{分母}` |
| 上标 | `x^{2}` |
| 下标 | `x_{i}` |
| 求和 | `\sum_{i=1}^{n}` |
| 积分 | `\int_{a}^{b}` |
| 希腊字母 | `\alpha`, `\beta` |
| 无序列表 | `\begin{itemize}` |
| 有序列表 | `\begin{enumerate}` |
| 表格 | `\begin{tabular}` |
| 图片 | `\includegraphics{}` |
| 引用 | `\cite{key}` |
| 章节 | `\section{}` |

---

## 最佳实践

1. **使用语义化命令**：优先使用 `\emph{}` 而非 `\textit{}`
2. **分离内容与格式**：在导言区定义命令和设置
3. **使用宏包**：善用成熟宏包，避免重复造轮子
4. **定期编译**：频繁编译查看效果，便于排错
5. **版本控制**：使用 Git 管理 LaTeX 项目
6. **备份 bib 文件**：参考文献数据库是重要资产
7. **注释代码**：复杂命令添加注释说明
8. **使用编辑器**：推荐 TeXstudio、VS Code + LaTeX Workshop、Overleaf

---

*本指南涵盖了 LaTeX 的核心语法和常用功能，适用于学术论文、技术文档、演示文稿等写作场景。*
