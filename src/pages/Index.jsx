import React, { useState, useEffect } from "react";
import { Container, VStack, Text, Box, Button, Input } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { FaPlay, FaPause } from "react-icons/fa";

const Index = () => {
  const [audioUrl, setAudioUrl] = useState("");
  const [subtitles, setSubtitles] = useState([]);
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  const [playing, setPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioUrl(URL.createObjectURL(file));
    }
  };

  const handleSubtitleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const parsedSubtitles = parseSRT(text);
        setSubtitles(parsedSubtitles);
      };
      reader.readAsText(file);
    }
  };

  const parseSRT = (data) => {
    const pattern = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n([\s\S]*?)(?=\n{2}|\n*$)/g;
    const subtitles = [];
    let match;
    while ((match = pattern.exec(data)) !== null) {
      subtitles.push({
        id: match[1],
        startTime: parseTime(match[2]),
        endTime: parseTime(match[3]),
        text: match[4].replace(/\n/g, " "),
      });
    }
    return subtitles;
  };

  const parseTime = (time) => {
    const parts = time.split(/[:,]/);
    return parseInt(parts[0], 10) * 3600 + parseInt(parts[1], 10) * 60 + parseInt(parts[2], 10) + parseInt(parts[3], 10) / 1000;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing) {
        setElapsedTime((prev) => prev + 0.1);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [playing]);

  useEffect(() => {
    const subtitle = subtitles.find((sub) => elapsedTime >= sub.startTime && elapsedTime <= sub.endTime);
    if (subtitle) {
      setCurrentSubtitle(subtitle.text);
    } else {
      setCurrentSubtitle("");
    }
  }, [elapsedTime, subtitles]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Input type="file" accept="audio/*" onChange={handleAudioUpload} aria-label="Upload audio file" />
        <Input type="file" accept=".srt" onChange={handleSubtitleUpload} aria-label="Upload subtitle file" />
        {audioUrl && (
          <Box width="100%">
            <ReactPlayer url={audioUrl} playing={playing} onProgress={({ playedSeconds }) => setElapsedTime(playedSeconds)} width="100%" height="50px" />
            <Button onClick={() => setPlaying(!playing)} leftIcon={playing ? <FaPause /> : <FaPlay />} aria-label={playing ? "Pause audio" : "Play audio"}>
              {playing ? "Pause" : "Play"}
            </Button>
          </Box>
        )}
        <Box padding="4" borderWidth="1px" borderRadius="lg" width="100%" textAlign="center" role="status" aria-live="polite">
          <Text fontSize="xl">{currentSubtitle}</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
