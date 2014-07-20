autocmd BufNewFile,BufEnter *.katasemeion setfiletype katasemeion
autocmd Filetype katasemeion setlocal textwidth=80
autocmd Filetype katasemeion setlocal spell
" Disable automatic comment continuations to the next line... doesn't apply
" here and could make Vim insert unnecessary characters
autocmd Filetype katasemeion setlocal formatoptions-=o
autocmd Filetype katasemeion setlocal formatoptions-=r
