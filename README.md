# markof.js

powerful lightweight markup language & lightweight parser

## Easily create ...

### standard markup

```
# Heading

## Subheading

Paragraph with *emphasized* & !!strong!! text.

Another paragraph with `code` and ~small~ text.
```
which expands to
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
expands to
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
expands to
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
