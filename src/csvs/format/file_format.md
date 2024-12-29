# CSVS File Format

version 0.1.0

This document specifies the CSVS file format.

"CSVS" stands for "Comma-Separated Value Store"

CSVS file format is a subset of [RFC 4180](https://www.rfc-editor.org/rfc/rfc4180). In cases where this document contradicts the RFC, RFC takes precedence and this document should be corrected.

A CSVS file MUST have UTF-8 encoding. 

A CSVS file MUST have .csv file extension.

## grammar 

 - newline: either Carriage Return 0x0D \r, Line Feed 0x0A \n, or both CR LF 0x0D 0x0A \r\n
 - string: sequence of any utf8 characters, newlines MUST be escaped
 - key: string
 - value: string
 - file: `[[key][,[value]]newline]`
 
each line in csvs file MUST represent a relation between values of two collections

each line MUST contain zero, one, or two values separated by a comma

value that contains a comma, a newline or a double quote MUST be escaped with double quotes ""

omitted value MUST represent an empty string

all characters between the first unescaped comma and an unescaped newline MUST be read as part of the second value

multiple identical lines MUST represent multiple unique relations between identical values

an exact duplicate of a line MUST represent two unique relations 

a line that consists only of a newline character MUST represent a relation between one empty string value "" and another empty string value ""

the file in csvs format CAN be called a "tablet"

the first column CAN be called a "key"

the second column CAN be called a "value"

empty lines `\n` MUST be ignored.

what does it mean that an empty line must be "ignored"? in a sorted file I guess they are at the end and do not yield records. but in an unsorted file - are they dividers of groups of values?

a trailling newline `\n` MUST be ignored.

these are equivalent
 - `,\n`
 - `"",\n`
 - `"",""\n`

a line CAN have no comma. 

these are equivalent
 - `2024-01-01\n`
 - `2024-01-01,""\n`

these are equivalent
 - `"\n"\n`
 - `"\n",\n`

## examples

 - `1,bob\n`: key is `1`, value is `bob`
 - `1,bob\\n\n`: key is `1`, value is `bob\n`
 - `,bob\n`: key is "", value is `bob`
 - `1,\n`: key is `1`, value is ""
 - `1\n`: key is `1`, value is ""
 - `\n`: key is "", value is ""
 - `2,bob,alice\n`: key is `2`, value is `bob,alice`
 - `3,apple\n3,pear\n`: key is `3`, values are `apple` and `pear`
 - `3,apple\n3,apple\n`: key is `3`, values are `apple` and `apple`

