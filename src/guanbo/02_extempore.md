# Extempore

A musician connects their text editor to an extempore process over HTTP and sends extempore commands. The extempore process is connected to digital instruments over MIDI channels. Sounds produced by the instruments are wired to a single sink that broadcasts publicly. The audio stream is broadcast via IceCast, and the video is connected to a streaming service via OBS.

 - tmux
 - Xvnc :30 -iglx -depth 24 -rfbwait 120000 -deferupdate 1 -localhost -verbose -securitytypes none
 - obs
 - DISPLAY=:30 xmonad
 - DISPLAY=:30 qpwgraph
 - DISPLAY=:30 vmpk
 - ./extempore/build --run ~/extempore-extensions/LOAD_ALL.xtm
   - echo "nix-shell -p cmake gcc python3 alsa-lib libGL libGLU libglvnd libglibutil xorg.libX11 xorg.xrandr xorg.libXrandr xorg.libXinerama xorg.libXcursor libjack2 zlib sqlite libpkgconf pkg-config" > xtmshell.txt
   - nix-shell -p cmake gcc python3 alsa-lib libGL libGLU libglvnd libglibutil xorg.libX11 xorg.xrandr xorg.libXrandr xorg.libXinerama xorg.libXcursor libjack2 zlib sqlite libpkgconf pkg-config
   - NIXPKGS_ALLOW_UNSUPPORTED_SYSTEM=1 nix build --impure .#extempore
   - cmake -DASSETS=ON .. && make 
```diff
+ # COMMAND ${CMAKE_COMMAND} -E copy librtmidi${CMAKE_SHARED_LIBRARY_SUFFIX} ${EXT_PLATFORM_SHLIBS_DIR}
+ # COMMAND ${CMAKE_COMMAND} -E copy libsndfile${CMAKE_SHARED_LIBRARY_SUFFIX} ${EXT_PLATFORM_SHLIBS_DIR}

+ # COMMAND ${CMAKE_COMMAND} -E copy libglfw${CMAKE_SHARED_LIBRARY_SUFFIX} ${EXT_PLATFORM_SHLIBS_DIR}
+ # COMMAND ${CMAKE_COMMAND} -E copy libnanovg${CMAKE_SHARED_LIBRARY_SUFFIX} ${EXT_PLATFORM_SHLIBS_DIR}

+ #ExternalProject_Add(rtmidi
+ #  PREFIX rtmidi
+ #  URL https://github.com/thestk/rtmidi/archive/84d130bf22d878ff1b0e224346e2e0f9e3ba8099.zip
+ #  URL_MD5 d932b9fef01b859a1b8b86a3c8dc6621
+ #  CMAKE_ARGS
+ #  -DRTMIDI_BUILD_TESTING=OFF
+ #  -DCMAKE_BUILD_TYPE=${CMAKE_BUILD_TYPE}
+ #  -DCMAKE_C_FLAGS=${EXT_DEPS_C_FLAGS}
+ #  -DCMAKE_CXX_FLAGS=${EXT_DEPS_CXX_FLAGS}
+ #  -DBUILD_SHARED_LIBS=ON
+ #  -DCMAKE_INSTALL_PREFIX=${EXT_DEPS_INSTALL_DIR}
+ #      # these are necessary because RTMidi's CMake config is a law unto itself
+ #  -DCMAKE_INSTALL_LIBDIR=${EXT_DEPS_INSTALL_DIR}
+ #  -DCMAKE_INSTALL_BINDIR=${EXT_DEPS_INSTALL_DIR})
+ #set_target_properties(rtmidi PROPERTIES FOLDER EXTERNAL_SHLIBS)
```
   - DON'T RUN `make install`
   - mv ../libs/platform-shlibs/libnanovg.so ../libs/platform-shlibs/libnanovg.so-bk
   - cp nanovg/src/nanovg-build/libnanovg.so ../libs/platform-shlibs/libnanovg.so
   - mv ../libs/platform-shlibs/libglfw.so ../libs/platform-shlibs/libglfw.so-bk
   - cp glfw3/src/glfw3-build/src/libglfw.so.3.2 ../libs/platform-shlibs/libglfw.so
   - cp /nix/store/xfgkyzqz46jxdkrfjz2ksv9cyvaqcx8v-libGL-1.6.0/lib/libGL.so.1.7.0 extempore/libs/platform-shlibs/libGL.so
   - cp libsndfile/src/sndfile-build/libsndfile.so.1.0.29 ../libs/platform-shlibs/libsndfile.so
   - cp /nix/store/l61m5xc7lnqjdq53kqf1hjp38xvsk5br-rtmidi-5.0.0/lib/librtmidi.so.6.0.0 libs/platform-shlibs/librtmidi.so
 - DISPLAY=:30 LD_LIBRARY_PATH=/nix/store/b5z55wa9s58k38s3wjap6dbamkri1ss6-pipewire-0.3.80-jack/lib nix run nixpkgs#qsynth

Let's compose a simple piano melody.

> See [Getting Started](./getting_started.md) on how to connect your editor to the antistixi instance. Once your editor is connected, follow the comments below, copy each code block to your composition and evaluate it right away.

First define an instrument. The instance only has a synth on MIDI channel 1. Check exempore logs to confirm that a new instrument was defined.
```xtm
(define piano 1)
```

Let's play a sound to test the instrument. The sound's pitch is c, volume is `60` and duration is a second.
```xtm
(play-note (now) piano c 60 *second*)
```

Define the tempo as 4/4. Every beat in the loop will pick a duration from this sequence.
```xtm
(define *durs* (list 1 1 1 1))
```

And set the base melody as a list of notes for the C minor chord. Each loop can play a note from this list to produce arpeggio.
```xtm
(define *melody* (mkchord c '-))
```

Now let's define the main recursive loop and evaluate it. The stream should play a 1/4 c note in a loop.
```xtm
(define loop
  ;; each loop is an function that accepts the beat number, 
  ;; base melody and a duration list
  (lambda (beat melody durs)
    ;; pick a beat duration from the list and 
    ;; the next note in the melody
    (let ((dur (car durs))
          (p (car melody)))

        ;; define your sounds here
        (play piano c 60 dur)

      ;; call the loop again for recursion
      ;; increment the beat number according to this beat's duration
      (callback (*metro* (+ beat dur))
        'loop (+ beat dur)
        ;; pass the rest of the melody to the next beat or start again
        (cdr-or-else melody *melody*)
        ;; pass the rest of durations to the next beat or start again
        (cdr-or-else durs *durs*)))))

(loop (*metro* 'get-beat 1) *melody* *durs*)
```

To change the loop, evaluate its definition once more. This should start playing an f note. 
```xtm
(define loop
  (lambda (beat melody durs)
    (let ((dur (car durs))
          (p (car melody)))

        ;; define your sounds here
        ;; now with a different sound
        (play piano f 60 dur)

      (callback (*metro* (+ beat dur))
        'loop (+ beat dur)
        (cdr-or-else melody *melody*)
        (cdr-or-else durs *durs*)))))
```

> From now on the code blocks will only show the sounds that need to go inside the loop. So instead of the last example, the code block will just say this:
```xtm
        ;; now with a different sound
        (play piano f 60 dur)
```

Let's start the arpeggio.
```xtm
        (play piano p 60 dur)
```

And add another arpeggio an octave higher.
```xtm
        (play piano p 60 dur)
        (play piano (octave (car *melody*) 5) 60 8)
```

Now let's add a random note four beats after each arpeggio.
```xtm
        (at 4 0
            (play piano (:mkint p (oneof 12 4 5) ) 50 (* dur 2) ) )
```

Popular songs often have chords alongside lyrics published online. To carry over those tabulatures into extempore, specify the chords and play each of them in sequence according to a list of tempos.

```xtm
(define *durs* (list 2))
(define c (mkchord c3 '^))
(define em (mkchord e3 '-))
(define f (mkchord f3 '^))
(define g (mkchord g3 '^))
(define am (mkchord a3 '-))
(define d (mkchord d3 '^))
(define f# (mkchord f#3 '^))
(define dm (mkchord d3 '-))
```

this doesn't work
```xtm
(define *melody*
  (map (lambda (a) (mkchord (eval a) '-))
     '(c3 c3 e3 e3 f3 g3 c3 c3
       c3 c3 e3 e3 f3 g3 c3 c3
       a3 a3 g3 g3 a3 d3 f#3
       c3 c3 d3 d3 f3 g3 c3)))
```

this doesn't work either
```xtm
(define *melody*
  (map eval
  '(c c em em f g c c
    c c em em f g c c
    am am g g am d f#
    c c dm dm f g c)))
```

Is this loop supposed to work?
```xtm
(define loop
  (lambda (beat melody durs)
    (let ((dur (car durs))
          (p (car melody)))
      (play piano (car melody) 50 dur)
      (callback (*metro* (+ beat dur))
                'loop (+ beat dur) (cdr-or-else melody *melody*) (cdr-or-else durs *durs*)))))

(loop (*metro* 'get-beat 1) *melody* *durs*)
```

For more examples of Extempore code, see [Michele Pasin](https://github.com/lambdamusic), [fetsorn](https://github.com/tempos).

To learn more, see the other [User guides](./user_guides.md) and [Design](./design.md).
