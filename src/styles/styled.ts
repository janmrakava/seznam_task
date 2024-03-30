import styled from "styled-components";

export const SuccesButton = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px 20px;
    border-radius: 10px;
    gap: 10px;
    border: 1px solid #303030;
    background: rgba(0, 255, 0, 0.4);
    cursor: pointer;
`
export const DeleteButton = styled(SuccesButton)`
    background: rgba(255, 0, 0, 0.6);
`
export const DraggableItem = styled.div<{$isDragging: boolean; $isDragOver: boolean }>`
  padding: 10px;
  margin-bottom: 5px;
  background-color: ${({ $isDragOver }) => ($isDragOver ? '#e0e0e0' : '#fff')};
  border: 1px solid #ccc;
  cursor: grab;
  opacity: ${({ $isDragging }) => ($isDragging ? 0.5 : 1)};
`