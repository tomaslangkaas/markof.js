# markof.js

powerful lightweight markup language & lightweight parser

## Easily convert ...
this text with `markof` markup:
```
# Heading

## Subheading

Paragraph with *emphasized* text.

Another paragraph with !!strong language!!!
```
to this HTML:
```
<h1>
 Heading
</h1>
<h2>
 Subheading
</h2>
<p>
 Paragraph with <em>emphasized</em> text.
</p>
<p>
 Another paragraph with <strong>strong language</strong>!
</p>
```

## Syntax cheat sheet

    # Heading level 1
    ## Heading level 2
    ### Heading level 3
    #### Heading level 4
    ##### Heading level 5
    ###### Heading level 6
    
    A paragraph.
    
    A blank line indicates a new paragraph,
    a single line break indicates just that.
    
    - Unordered list item
      - Indent with 2 spaces for nested lists
    
    1. Ordered list item
    9. Ordered list item with value 9
      2. Item 9.2
      -  Ordered an unordered list items can be mixed
    
    |  a table cell             |' left-aligned table header cell
    |. right-aligned table cell |, right-aligned table header cell
    |: centered table cell      |; centered table header cell
    
    : description list term
    :: description list description
    
    " blockquote
    
    ```
    code block
    ```
    
    Inline formating:
    *emphasis*
    !!strong!!
    `code`
    ^superscript^
    _subscript_
    ~small~
    ++inserted++
    ==deleted==
    <<quote in primary quotation marks>>
    ``quote in secondary quotation marks''
    
    Apostrophe: '
    En dash: --
    Em dash: ---
    Ellipsis: ...
    
    HTML entities are allowed: &times;, &#8042; &#x00d3;
    
    No other HTML is allowed, these characters are always replaced
    with HTML entities: <>&/"'
    
    Syntax characters can be escaped with a preceding backslash
    in order to display literal characters, e.g. \' will be 
    converted to a straight single quotation mark instead of an 
    apostrophe.
    
    Mustof formatting is disabled within code blocks and 
    code-formatted text. Any text (except the characters <>&/"') 
    will be displayed verbatim.
