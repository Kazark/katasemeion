" Set up Vim to edit Katasemeion biblical text files
" Author: Kazark

if exists("b:did_ftplugin")
  finish
endif
let b:did_ftplugin = 1

let s:save_cpo = &cpo
set cpo&vim

setlocal textwidth=80
setlocal spell
" Disable automatic comment continuations to the next line... doesn't apply
" here and could make Vim insert unnecessary characters
setlocal formatoptions-=c
setlocal formatoptions-=o
setlocal formatoptions-=q
setlocal formatoptions-=r
setlocal comments-=:%

" Build to HTML with :make
let &l:makeprg="katasemeion " . expand('%') . " > output/" . expand('%:t:r') . ".html"

let &cpo = s:save_cpo
