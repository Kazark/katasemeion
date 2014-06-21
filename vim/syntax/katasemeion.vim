if exists("b:current_syntax")
    finish
endif

syntax match ktsHeader /##\?.*/
syntax match ktsSymbol /[][@`'*_]/
syntax match ktsVerse /\^\w\+\^/
syntax match ktsChapter /%\d\+%/
syntax match ktsTodo /<[^>\n]\+>/
syntax match ktsFootnote /{[^}\n]\+}/
syntax match ktsVariant /\[\[[^]\n]\+]]/

" These mappings are a little odd, given that a markup language for Biblical
" texts doesn't always map nicely onto a lexical highlighting system designed
" for programming languages
highlight link ktsHeader PreProc
highlight link ktsSymbol Operator
highlight link ktsVerse Statement
highlight link ktsChapter Function
highlight link ktsTodo TODO
highlight link ktsFootnote String
highlight link ktsVariant Comment

let b:current_syntax = "katasemeion"
