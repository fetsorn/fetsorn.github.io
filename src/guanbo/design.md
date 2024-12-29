# Design

algorithmic music broadcast

interacts: version control services, listener browsers

constitutes: audio broadcast of music written in programming languages

includes: composer, arranger, broadcaster

competes: algoraves

resembles: wikifunctions

target audiences: coders, musicians, students, listeners

patterns: infrastructure-as-code

stakeholders: Algorithmic Music Research Institute, Algorithmic Music Radio, Norcivilian Records

## composer
resembles: sonicpi, extempore, overtone, glicol, tidalcycles

constitutes: directory containing manifest and source code

patterns: state machine

code -> osc

code -> audio

stack 
 - programming language of choice
 - midi library
 - osc library 

src/
 - accept osc port as argument
 - generate midi
 - send osc
 - play sound for testing
 
manifest.ttl
 - execution command
 - name
 - license
 - link to personal brand
 - path to source code

## arranger
constitutes: directory containing manifest and source code

osc -> osmid -> dawdreamer -> sound 
 
stack
 - dawdreamer
 - osmid
 - butt
 - icecast
 - hls

src/
 - listen to osc
 - listen to midi for testing
 - pipe midi to lv2 plugins
 - output audio

manifest.ttl
 - execution command
 - name
 - license
 - link to personal brand
 - path to source code
 
## broadcaster
resembles: smart contract explorer, geek radio

constitutes: website with audio stream and text

liquidsoap -> ( composer -> arranger ) -> sound -> tcp/ip

tcp/ip -> sound -> tcp/ip

stack
 - liquidsoap
 - html
 - css
 - javascript
 
composers/
 - composer bundles
 
arrangers/
 - composer bundles
 
radio.liq
 - trigger on playlist
 - read manifest.ttl of composer and arranger to annotate the stream
 - execute composer bundle, pipe to arranger bundle
 
media player

editing policy

broadcasting grid

link to composer and arranger brands

composition source code

event calendar

link to radio-browser.info

donation button

## listener
tcp/ip -> sound

tcp/ip -> code
