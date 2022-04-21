import React from 'react'
import { useEffect, useRef, useState } from 'react';
import useInterval from '@use-it/interval';


const VALID_CHARS = `abcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"'#&_(),.;:?!\\|{}<>[]^~`;
const STREAM_MUTATION_ODDS = 0.05;

const MIN_STREAM_SIZE = 10;
const MAX_STREAM_SIZE = 100;

const MIN_INTERVAL_DELAY = 10;
const MAX_INTERVAL_DELAY = 100;

const MIN_DELAY_BETWEEN_STREAMS = 0;
const MAX_DELAY_BETWEEN_STREAMS = 1500;

const getRandInRange = (min, max) =>
	Math.floor(Math.random() * (max - min)) + min;


const getRandChar = () =>
    VALID_CHARS.charAt(Math.floor(Math.random() * VALID_CHARS.length));

const getRandStream = () =>
new Array(getRandInRange(MIN_STREAM_SIZE, MAX_STREAM_SIZE))
    .fill()
    .map(_ => getRandChar());

const getMutatedStream = stream => {
    const newStream = [];
    for (let i = 1; i < stream.length; i++) {
        if (Math.random() < STREAM_MUTATION_ODDS) {
            newStream.push(getRandChar());
        } else {
            newStream.push(stream[i]);
        }
    }
    newStream.push(getRandChar());
    return newStream;
};

 const RainStream = props => {
	const [stream, setStream] = useState(getRandStream());
	const [topPadding, setTopPadding] = useState(stream.length * -50);
	const [intervalDelay, setIntervalDelay] = useState(null);

	// Initialize intervalDelay
	useEffect(() => {
		setTimeout(() => {
			setIntervalDelay(getRandInRange(MIN_INTERVAL_DELAY, MAX_INTERVAL_DELAY));
		}, getRandInRange(MIN_DELAY_BETWEEN_STREAMS, MAX_DELAY_BETWEEN_STREAMS));
	}, []);

	useInterval(() => {
		if (!props.height) return;

		if (!intervalDelay) return;

		// If stream is off the screen, reset it after timeout
		if (topPadding > props.height) {
			setStream([]);
			const newStream = getRandStream();
			setStream(newStream);
			setTopPadding(newStream.length * -75);
			setIntervalDelay(null);
			setTimeout(
				() =>
					setIntervalDelay(
						getRandInRange(MIN_INTERVAL_DELAY, MAX_INTERVAL_DELAY),
					),
				getRandInRange(MIN_DELAY_BETWEEN_STREAMS, MAX_DELAY_BETWEEN_STREAMS),
			);
		} else {
			setTopPadding(topPadding + 75);
		}
		// setStream(stream => [...stream.slice(1, stream.length), getRandChar()]);
		setStream(getMutatedStream);
	}, intervalDelay);


  return (
    <div
    style={{
        fontFamily: 'matrixFont',
        color: '#20c20e',
        writingMode: 'vertical-rl',
        textOrientation: 'upright',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        textShadow: '0px 0px 8px rgba(32, 194, 14, 0.8)',
        fontSize: 40,

    }}>
        { stream.map((character, index) => (

        <a href
        style={{
            marginTop: topPadding,
            // Reduce opacity for last chars
            opacity: index < 6 ? 0.1 + index * 0.15 : 1,
            color: index === stream.length - 1 ? '#fff' : undefined,
            textShadow:
                index === stream.length - 1
                    ? '0px 0px 20px rgba(255, 255, 255, 1)'
                    : undefined,
        }}>
        {character}
</a>

    ))}
    </div>
  )
}

export default RainStream