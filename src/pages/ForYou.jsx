import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import SongList from "../components/SongList";
import Player from "../components/Player";
import SearchBar from "../components/SearchBar";
import { Container, Row, Col } from "react-bootstrap";
import { getGradientFromImage } from "../utils/colorExtractor";
import "../styles/components/foryou.scss";

const ForYou = () => {
  const { currentSong, colorScheme } = useContext(PlayerContext);

  const backgroundStyle = colorScheme
  ? { background: getGradientFromImage(colorScheme) }
  : { background: "linear-gradient(to bottom, #f0f0f0 0%, #d0d0d0 100%)" };


  return (
    <div className="for-you-page" style={{ background: backgroundStyle }}>
      <Container fluid>
        <Row className="header mb-3">
          <Col md={12}>
            <h1 className="page-title">For You</h1>
            <SearchBar />
          </Col>
        </Row>

        <Row className="main-content">
          <Col md={currentSong ? 8 : 12} className="song-listing">
            <SongList />
          </Col>

          {/* Player Appears on the Right When a Song is Selected */}
          {currentSong && (
            <Col md={4} className="player-sidebar-wrapper">
              <Player />
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ForYou;
