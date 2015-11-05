# markof.js

powerful lightweight markup language & lightweight parser

## Easily convert ...

### this text

```
# Heading

## Subheading

Paragraph with *emphasized* & !!strong!! text.

Another paragraph with `code` and ~small~ text.
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
 Paragraph with <em>emphasized</em> &#38; <strong>strong</strong> text.
</p>
<p>
 Another paragraph with <code>code</code> and <small>small</small> text.
</p>
```

### lists
```
1. Item 1
  1. Item 1.1
  2. Item 1.2
2. Item 2
```
to
```
<ol>
 <li value="1">
  Item 1
  <ol>
   <li value="1">
    Item 1.1
   </li>
   <li value="2">
    Item 1.2
   </li>
  </ol>
 </li>
 <li value="2">
  Item 2
 </li>
</ol>
```

### tables
```
|' Name  |' Age
|  John  |  45
|  James |  53
```
to
```
<table>
 <tr>
  <th style="text-align:left;">
   Name
  </th>
  <th style="text-align:left;">
   Age
  </th>
 </tr>
 <tr>
  <td>
   John
  </td>
  <td>
   45
  </td>
 </tr>
 <tr>
  <td>
   James
  </td>
  <td>
   53
  </td>
 </tr>
</table>
```
## Syntax cheat sheet

```
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
  - List items are nested with 2 spaces for each level

1. Ordered list item
9. Ordered list item with value 9
  2. Item 9.2, ordered list items are also nested with 2 spaces for each level
  -  Ordered an unordered list items can be mixed

|  a table cell             |' left-aligned table header cell
|. right-aligned table cell |, right-aligned table header cell
|: centered table cell      |; centered table header cell

: description list term
:: description list description

" blockquote

`
monospace block
`

```
