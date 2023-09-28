import React, {useState} from "react";
import BeatButton from "./BeatButton";

function EdmPads({ sounds, setPlayingSongs, setGlobalMute, beatButtonWasClicked, setBeatButtonWasClicked }) {

    const edmSounds = sounds.filter(sound => sound.genre === "EDM")

    const edmElements = edmSounds.map(sound => {
        return (<BeatButton key={sound.id} sound={sound} beatButtonWasClicked={beatButtonWasClicked} setBeatButtonWasClicked={setBeatButtonWasClicked}/>)
    })

    //if they are not muted, then make a player for each of them which starts upon them all being loaded

    function playEdmSong() {
        console.log("play song")
        //fetch all edmSounds from the database
        fetch(`http://localhost:8003/sounds`)
            .then(r => r.json())
            .then(beats => {
                const edmBeats = beats.filter(beat => (beat.genre === "EDM"))
                const edmSong = edmBeats.filter(beat => (beat.isMuted === false))
                setPlayingSongs(edmSong)
                setGlobalMute(false)
                console.log(beats)
            })
    }

    return (
        <div>
            <h1>EDM Sounds:</h1>
            <div className="button-container">
                {edmElements}
                <br></br>
                <button className="play-btn" onClick={playEdmSong}>Play EDM Song</button>
            </div>
        </div>
    )
}

export default EdmPads