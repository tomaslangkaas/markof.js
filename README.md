# markof.js

powerful lightweight markup language & lightweight parser

## Easily convert ...
this text of `markof` markup:
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

    ## Block level formatting
    
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
      -  Ordered & unordered list items can be mixed
    
    |  a table cell             |' left-aligned table header cell
    |. right-aligned table cell |, right-aligned table header cell
    |: centered table cell      |; centered table header cell
    
    : description list term
    :: description list description
    
    " blockquote
    
    ```
    code block
    ```
    
    ## Inline formating
    
    *emphasis*
    !!strong!!
    `code`
    ^superscript^
    _subscript_
    ~small~
    ++inserted++
    ==deleted==
    
    ## Links and images
    
    {http://www.google.com}[link to google homepage]
    {http://www.google.com link title}[link to google homepage]
    {mailto:a@b.c}[send mail to a@b.c]
    {#fragment}[link to document fragment]
    {./subdir/file}[relative link]
    {../parentdir/file}[relative link]
    {http://urlToImgSrc}[!img alt text]
    
    ## Special characters
    
    <<quote in primary quotation marks>>
    ``quote in secondary quotation marks''
    
    Apostrophe: '
    En dash: --
    Em dash: ---
    Ellipsis: ...
    
    HTML character entities are allowed: &times;, &#8042; &#x00d3;
    
    No other HTML is allowed, the following characters are always 
    replaced with HTML character entities: <>&/"'
    
    Syntax characters can be escaped with a preceding backslash
    in order to display literal characters, e.g. \' will be 
    converted to a straight single quotation mark instead of an 
    apostrophe.
    
    Mustof formatting is disabled within code blocks and 
    code-formatted text. Any text (except the characters <>&/"') 
    will be displayed verbatim.

## API

##### `markof(markofString [,customExpressionsObject])`

Converts `markofString` to HTML and returns the HTML string. Takes a `customExpressionsObject` as an optional argument, see section about custom expressions.

##### `markof.compact(compactBoolean)`

Sets the compact flag of markof to either true or false. Set to true for markof to output HTML without redundant whitespace, set to false for markof to output readable and indented HTML. The flag is by default set to false. The function returns the markof function, which allows for chaining.

##### `markof.quotes(primaryLeft, primaryRight[, secondaryLeft, secondaryRight])`

Sets the characters to be used as quotation marks, defaults to `&ldquo;` and `&rdquo;` for primary quotation marks and `&lsquo;` and `&rsquo;` for secondary quotation marks. Different languages use different characters for this, see link.

##### `markof.safe(unsafeString)`

Provides access to the internal HTML sanitization function used in markof. This function replaces the characters `<>&"'/` to their numeric HMTL entities and returns the transformed string. For use in custom expressions.
