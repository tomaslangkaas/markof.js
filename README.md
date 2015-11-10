# markof.js

powerful lightweight markup language & lightweight parser

## Easily convert ...
`markof` markup:
```
# Heading

## Subheading

Paragraph with *emphasized* text.

Another paragraph with !!strong language!!!
```
to HTML:
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
## `markof` features

* More lightweight syntax than standard markdown
* Supports more formatting than standard markdown: small, sup, sub, ins, del, description lists, tables
* Supports typographic control for easy use of correct quotation marks, apostrophes, en-dash, em-dash and ellipsis.
* Adopts measures to prevent raw HTML and xss injection
* Supports custom expressions
* Lightweight parser (~2.3 kb minified)
* Runs in any ECMAScript 3 compliant runtime
* MIT-licensed
* UMD compatible module wrapper

## `markof` markup syntax cheat sheet

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

##### `markof(markofString [,customDataObject])`

Converts `markofString` to HTML and returns the HTML string. Takes a `customDataObject` as an optional argument, see the separate section about [custom expressions](#custom-expressions).

##### `markof.compact(compactBoolean)`

Sets the compact flag of `markof` to either true or false. Set to a truthy vaule for markof to output HTML without redundant whitespace, set to a falsy for markof to output readable and indented HTML (default). The function returns the `markof` function, which allows for chaining.

##### `markof.quotes(primaryLeft, primaryRight[, secondaryLeft, secondaryRight])`

Sets the characters to be used as quotation marks, defaults to `&ldquo;` and `&rdquo;` for primary quotation marks and `&lsquo;` and `&rsquo;` for secondary quotation marks. Different languages use different characters for this. for an overview, see [this wikipedia article](https://en.wikipedia.org/wiki/Quotation_mark). The function returns the `markof` function, which allows for chaining.

For falsy arguments, default quotation marks are used. Thus, calling `markof.quotes()` with no arguments resets to the default characters.

##### `markof.safe(unsafeString)`

Provides access to the internal HTML sanitization function used in markof. This function replaces the characters `<>&"'/` with their numeric HMTL entities and returns the transformed string. For use in custom expressions.

### Custom expressions

`markof` allows custom expressions in double braces, `{{` and `}}`, if a `customDataObject` is provided to the parser. This allows for custom functionality, such as data interpolation and more complex templating. `markof` parses text in double braces as follows:

1. All characters after the opening braces `{{` until the first whitespace character or the closing braces are interpreted as an identifier.
2. If the identifier does not correspond to a property of the `customDataObject`, nothing happens. That is, all syntax, including the double braces, remains in the `markof` HTML output.
3. If the identifier corresponds to a function of the `customDataObject`, this function is called with any text left in the expression (after a delimiting whitespace character) as a single string argument. The original syntax in the `markof`string is replaced with the return value. This value is not sanitized, the function is responsible for sanitization, possibly using the `markof.safe()` function.
4. Otherwise, the original syntax in the `markof` string is replaced with the value of the property of the `customDataObject`. Again, this value is not sanitized.
