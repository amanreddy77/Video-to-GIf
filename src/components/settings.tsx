import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { ConvertSetting } from "../lib/ffmpeg";

const Container = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 24px;
  max-width: 600px;
  margin: 24px auto;
`;

const Table = styled.table`
  width: 100%;
  margin: 16px 0;
  border-spacing: 0 8px;

  th,
  td {
    padding: 10px;
  }

  th {
    text-align: left;
    color: #333;
    font-weight: bold;
  }
`;

const PreviewVideo = styled.video`
  max-height: 50vh;
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const InputLabel = styled.span`
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 4px;
`;

const RangeInput = styled.input`
  width: 100%;
  margin-top: 8px;
`;

const NumberInput = styled.input`
  padding: 6px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 80px;
`;

const Select = styled.select`
  padding: 6px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
`;

const Button = styled.button`
  background-color: #ff7f50;
  border-radius: 6px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  padding: 12px 24px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  width: 100%;

  &:hover {
    background-color: #e06836;
  }
`;

interface Props {
  convertSetting: ConvertSetting;
  updateConvertSetting: (partialConvertSetting: Partial<ConvertSetting>) => void;
  videoUrl: string | null;
  onConvert: () => void;
}

export const Settings: React.FC<Props> = (props) => {
  const { videoUrl, convertSetting, updateConvertSetting, onConvert } = props;
  const { frameRate, sizePixel, sizeType, rangeStart, rangeEnd } = convertSetting;

  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef) return;
    const onTimeUpdate = () => {
      const rangeEnd = Math.round(videoRef.currentTime * 100) / 100;
      updateConvertSetting({ rangeEnd });
    };
    videoRef.addEventListener("timeupdate", onTimeUpdate);
    return () => videoRef.removeEventListener("timeupdate", onTimeUpdate);
  }, [videoRef]);

  return (
    <Container>
      {videoUrl && (
        <PreviewVideo ref={setVideoRef} src={videoUrl} controls muted />
      )}
      <Table>
        <tr>
          <th>Frame Rate</th>
          <td>
            <InputLabel>{frameRate} FPS</InputLabel>
            <RangeInput
              type="range"
              min="1"
              max="30"
              step="1"
              value={frameRate}
              onChange={(event) =>
                updateConvertSetting({ frameRate: parseInt(event.target.value, 10) })
              }
            />
          </td>
        </tr>
        <tr>
          <th>Size</th>
          <td>
            <Select
              onChange={(event) =>
                updateConvertSetting({ sizeType: event.target.value as "width" | "height" })
              }
              value={sizeType}
            >
              <option value="width">Width</option>
              <option value="height">Height</option>
            </Select>
            <NumberInput
              type="number"
              value={sizePixel}
              onChange={(event) =>
                updateConvertSetting({ sizePixel: parseInt(event.target.value, 10) })
              }
            />
            <InputLabel>(-1 = Auto)</InputLabel>
          </td>
        </tr>
        <tr>
          <th>Range</th>
          <td>
            <NumberInput
              type="number"
              value={rangeStart}
              onChange={(event) =>
                updateConvertSetting({ rangeStart: parseFloat(event.target.value) })
              }
            />
            <span> sec 〜 </span>
            <NumberInput
              type="number"
              value={rangeEnd}
              onChange={(event) =>
                updateConvertSetting({ rangeEnd: parseFloat(event.target.value) })
              }
            />
            <span> sec</span>
          </td>
        </tr>
        <tr>
          <th colSpan={2}>
            <Button onClick={onConvert}>Convert</Button>
          </th>
        </tr>
      </Table>
    </Container>
  );
};
