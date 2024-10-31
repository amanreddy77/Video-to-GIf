import React, { useState } from "react";
import styled from "styled-components";
import { History as HistoryType } from "../hooks/use_history";
import { gifDataToUrl } from "../lib/buffer_to_url";
import { getDateTime } from "../lib/datetime";

// Wrapper for the main content
const Wrapper = styled.main`
  border-left: 1px solid #e0e0e0; /* Subtle border color */
  background-color: #fefefe; /* Lighter background */
  position: fixed;
  top: 65px;
  bottom: 36px;
  right: 0;
  width: 40vw;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1); /* Shadow for depth */
`;

// Title for the history section
const HistoryTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #333;
  text-align: center;
`;

// Message when there are no GIFs converted
const NoHistory = styled.div`
  font-size: 18px;
  color: #888;
  text-align: center;
`;

// Card for each converted GIF
const Card = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 16px;
  width: 90%;
  max-width: 500px;
  transition: transform 0.2s; /* Smooth transition */
  
  &:hover {
    transform: translateY(-5px); /* Lift effect on hover */
  }
`;

// Title for the individual GIF entry
const Title = styled.h3`
  font-size: 18px;
  color: #555;
  margin-bottom: 12px;
  text-align: center;
`;

// Wrapper for the GIF image
const GifWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 12px 0;
`;

// GIF image style with blur effect
const Gif = styled.img<{ isGenerating: boolean }>`
  max-width: 100%;
  max-height: 300px;
  border-radius: 10px; /* Rounded corners */
  object-fit: contain;
  border: 2px solid #ddd; /* Subtle border around GIF */
  filter: ${({ isGenerating }) => (isGenerating ? 'blur(5px)' : 'none')}; /* Blur effect */
  transition: filter 0.3s ease; /* Smooth transition for blur */
`;

// Footer for each card with download and open links
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid #eee;
  font-size: 14px;
  color: #0066cc;
  
  a {
    text-decoration: none; /* Remove underline */
    transition: color 0.2s; /* Smooth transition */
    
    &:hover {
      color: #ff5722; /* Change color on hover */
    }
  }
`;

interface Props {
  histories: HistoryType[];
}

export const History: React.FC<Props> = ({ histories }) => {
  const [generatingGif, setGeneratingGif] = useState<boolean>(false);

  return (
    <Wrapper>
      <HistoryTitle>Converted GIFs</HistoryTitle>
      {histories.length === 0 ? (
        <NoHistory>(No converted GIFs)</NoHistory>
      ) : (
        histories.map((history) => {
          const gifUrl = gifDataToUrl(history.gifData, history.datetime);
          const { year, month, day, hour, minute, second } = getDateTime(new Date(history.datetime));
          
          return (
            <Card key={history.datetime}>
              <Title>
                {year}-{month}-{day} {hour}:{minute}:{second}
              </Title>
              <GifWrapper>
                <Gif
                  alt={`Converted at ${history.datetime}`}
                  src={gifUrl}
                  decoding="async"
                  loading="lazy"
                  isGenerating={generatingGif}
                  onLoad={() => setGeneratingGif(false)} // Set to false when loading completes
                  onError={() => setGeneratingGif(false)} // Set to false on error
                  onLoadStart={() => setGeneratingGif(true)} // Set to true when loading starts
                />
              </GifWrapper>
              <Footer>
                <a 
                  href={gifUrl} 
                  download={`${year}-${month}-${day}-${hour}-${minute}-${second}.gif`}
                >
                  Download &#x2b07;
                </a>
                <a 
                  href={gifUrl} 
                  target="_blank" 
                  rel="noreferrer"
                >
                  Open &#x2197;
                </a>
              </Footer>
            </Card>
          );
        })
      )}
    </Wrapper>
  );
};
