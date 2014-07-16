

# Κατασημεῖον [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![GitHub version](https://badge.fury.io/gh/kazark%2Fkatasemeion.svg)](http://badge.fury.io/gh/kazark%2Fkatasemeion)
### Markdown-like markup for formatting Biblical texts

The name is a nerd joke: **κατα-** can be translated *down*; **σημεῖον** can be
translated *mark*. This is not to say that this is the actual Greek word for
Markdown.

While in college, I create a mashup of scripts that I used to convert an
easy-to-write XML format into HTML or LaTeX so I could pretty-print my
translations of Biblical books without having to use a WYSIWYG editor. I prefer
to live in my native habitat, Vim than to use even LibreOffice Writer.

Then I started using StackOverflow, and learned Markdown. Markdown grew and grew
on me. Finally, I've decided it's time to take the ideas that I used in my XML
hacks from before and convert them into something Markdown-like.

There are some common characteristics that Biblical texts have that most other
texts don't have, such as verse numbers. I also wanted to support a certain
level of text-critical markup, such as marking textual variants. Also, there are
things that Biblical texts just don't have, like @-style mentions, hyperlinks,
code blocks, math, and other such modern internet-y stuff that Markdown is
geared towards. This meant that I could repurpose some of Markdown, and also
could claim more symbols for specialized verse-number and footnote markup, etc.

If you find this project useful, please let me know so that I can put more
effort into it. Also, please feel free to submit issues about bugs or feature
requests.

### Example
The `example` directory of the project contains the following example. Here is a
rough draft of 1 John 1 with Katasemeion markup, in Vim (the Greek words are in
red because I have not added them to my spell file and spelling is turned on):

![example in Vim](/example/1John1-katasemeion-in-Vim.png)

And rendered in the browser, you can see that the footnotes pop up and regions
marked as needing further attention with `<...>` are red. The light
half-brackets on the bottom, such as around  the words *about him*, are an
indicator that the translator wants you to know that he inserted these words.
The light half-brackets on the top are an indicator of what region the footnote
pertains to. The rest is fairly self-explanatory; if there were a textual
variant shown, it would use a light full-bracket.

![example as HTML](/example/1John1-katasemeion-rendered-as-HTML.png)

If you don't like the way this HTML renders, you can configure it with CSS.

The example will be shown rendered in PDF via XeLaTeX once that feature is
implemented.

### How to Run It
Currently it must be run through Node, though I have written it in JavaScript in
order to allow for in-browser translation. Also, currently it doesn't support
installs. You will need to pull down the project, build it with grunt, and then
run it something like this:

    node build/app.js ~/translations/Revelation.katasemeion > ~/translations/output/Revelation.html

### Same as Markdown
Paragraphs are separated by two newlines. `#` is used to denote the top-level
title (actually, this is not implemented yet, but there is an issue for it).
`##` is used for section headers (likewise, not yet implemented). Single
asterisks (`*italicized*`) are used to denote italics, as are underscores
(`_italicized_`). Double asterisks are used to denote bold text, (`**bolded**`).

### Similar to Markdown
You can format poetry by using indenting that is typically used for code in
Markdown, i.e. beginning each line of verse with four spaces, and adding an
additional four spaces for each further indent that is desired.

### Same as LaTeX
You can use <code>\`\`...''</code> and <code>\`...'</code> to denote curved quotes,
as in LaTeX.

### Other markup in the style of Markdown
You can explicitly specify chapter numbers explicitly like `%4%` and verse
numbers explicitly with the corresponding notation: `^8a^`.

Footnotes are denoted by brackets: `{footnote text}`. You can denote what text
the footnote applies to by adding a pair of "at" signs previous to the footnote:
`@text under question@{footnote about it}`.

You can mark some places with "todo" notation for revisiting later by using
angle brackets: `<Jesus answered, saying>`. You can mark a section of text as
having been inserted by the translator using square brackets: `he was not the
Light, but [he had come] so that he might witness about the Light.` You can mark
a section as being left out in some manuscripts by using double square brackets:
`the one coming from heaven [[is above all]]`.
