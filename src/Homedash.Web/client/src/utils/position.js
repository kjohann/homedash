export default ({ x, y, height: h, width: w, minHeight: minH, minWidth: minW, maxHeight: maxH, maxWidth: maxW, isStatic, isDraggable, isResizable }) => {
  return {
    'data-grid': { x, y, w, h, minW, maxW, minH, maxH, static: isStatic, isDraggable, isResizable }
  };
};
