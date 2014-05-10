# Κατασημεῖον
### Markdown-like markup for formatting Biblical texts

The name is a nerd joke: **κατα-** can be translated *down*; **σημεῖον** can be
translated *mark*. This is not to say that this is the actual Greek word for
Markdown.

I have just begun this project. While in college, I create a mashup of scripts
that I used to convert a easy-to-write XML format into HTML or LaTeX so I
could pretty-print my translations of Biblical books without having to use a
WYSIWIG editor. I prefer to live in my native habitat, Vim.

Then I started using StackOverflow, and learned Markdown. Markdown grew and grew
on me. Finally, I've decided it's time to take the ideas that I used in my XML
hacks from before and convert them into something Markdown-like.

*Nota bene*: the description below is not does not reflect the current state of
the system but rather the target state of the system, since this is still in
early development.

### Similarities to Markdown
Paragraphs are separated by two newlines. `#` is used to denote the top-level
title. Single asterisks (`*italicized*`) are used to denote italics, as are
underscores (`_italicized_`). Double asterisks are used to denote bold text,
(`**bolded**`).

### Other markup
Footnotes are denoted by and "at" sign, with brackets: `@{footnote text}`. You
can denote what text the footnote applies to by adding another "at" sign
previous to the footnote: `@text under question@{footnote about it}`.

You can mark some places with "todo" notation for revisiting later by using
angle brackets: `<Jesus answered, saying>`. You can mark a section of text as
having been inserted by the translator using square brackets: `he was not the
Light, but [he had come] so that he might witness about the Light.` You can mark
a section as being left out in some manuscripts by using double square brackets:
`the one coming from heaven [[is above all]]`.

You can insert automatic chapter numbers with `%` and verse numbers with `^`.
You can explicitly specify chapter numbers explicitly like `%4%` and verse
numbers explicitly with the corresponding notation: `^8a^`.

You can format verse by using indenting that is typically used for code in
markup, i.e. beginning each line of verse with four spaces, and adding an
additional four spaces for each further indent that is desired.
