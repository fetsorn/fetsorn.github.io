# Tutorial

A musical piece must send midi over OSC according to the [osmid](https://github.com/llloret/osmid) format

```javascript
import OSC from "osc-js";

//...

const options = { send: { port: 57200 } };

const osc = new OSC({ plugin: new OSC.DatagramPlugin(options) });

osc.open({ port: 9912 });

function send(midi) {
  osc.send(new OSC.Message("/IAC Driver Bus 1/note_on", 1, midi, 80));
}
```

Let's also produce a local sound for testing 
```javascript
import { AudioContext, OscillatorNode, GainNode } from "node-web-audio-api";
import { Midi } from "tonal";

//...

function play(midi) {
  const audioContext = new AudioContext();

  const frequency = Midi.midiToFreq(midi);

  const osc = new OscillatorNode(audioContext, { frequency });

  osc.connect(audioContext.destination);

  osc.start(now);

  osc.stop(now + 1);
}
```

To play notes in a loop, let's import a library for music theory
```javascript
import { Midi } from "tonal";

//...

["C4", "G4", "F4", "G4"].map((note) => {
  const midi = Midi.toMidi(tone);
  
  play(midi);
  
  send(midi);
})

```

To learn about other ways to make music see the [User Guides](./user_guides.md).
