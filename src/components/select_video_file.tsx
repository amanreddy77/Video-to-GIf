import styled from "styled-components";
import React from "react";

export const selectImage = (onChange: (file: File) => void): void => {
  const input: HTMLInputElement = document.createElement("input");
  input.type = "file";
  input.accept = "video/*";
  input.multiple = false;
  input.onchange = () => {
    if (input.files != null && input.files.length > 0) {
      const file = input.files.item(0);
      if (file != null) {
        onChange(file);
      }
    }
  };
  input.click();
};

const ScreenWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f3f4f6;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: 2px dashed #aaa;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: #0073e6;
  }
`;

const Message = styled.div`
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-bottom: 16px;
`;

const UploadButton = styled.button`
  background-color: #0073e6;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  padding: 12px 24px;
  text-transform: uppercase;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #005bb5;
  }

  &:focus {
    outline: none;
  }
`;

interface Props {
  onVideoFileSelected: (videoFile: File) => void;
}

export const SelectVideoFile: React.FC<Props> = (props) => {
  const { onVideoFileSelected } = props;

  return (
    <ScreenWrapper>
      <Wrapper>
        <Message>Upload your video to convert it to a GIF!</Message>
        <UploadButton onClick={() => selectImage(onVideoFileSelected)}>
          Select Video File
        </UploadButton>
      </Wrapper>
    </ScreenWrapper>
  );
};
