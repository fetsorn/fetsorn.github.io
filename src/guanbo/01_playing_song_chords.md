# Playing song chords

Reusing functions from the tutorial, let's play notes of a chord
```javascript
import { Chord } from "tonal";

//...

// ["C4", "E4", "G4", "B4"]
Chord.notes("maj4", "C4").map((note) => {
  const midi = Midi.toMidi(tone);
  
  play(midi);
  
  send(midi);
})

```

To learn more, see other [User guides](./user_guides.md), the [Reference](./reference.md) and the [Requirements](./requirements.md).
