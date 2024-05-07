export const getResizeEventListener = (standardWidth: number, standardHeight: number) => {
  return () => {
    const outletContainer = document.querySelector('#outletContainer');
    const outlet = document.querySelector('#outlet');

    if (outlet instanceof HTMLElement && outletContainer instanceof HTMLElement) {
      // 원하는 해상도로 width, height 고정
      outlet.style.width = `${standardWidth}px`;
      outlet.style.height = `${standardHeight}px`;

      let width = outletContainer?.clientWidth;
      console.log(width);
      let height = width * (standardHeight / standardWidth);
      console.log(height);

      outlet.style.cssText = `zoom: ${height / standardHeight}`;

      if (height > outletContainer.clientHeight) {
        height = outletContainer.clientHeight;
        width = height * (standardWidth / standardHeight);

        // zoom 이용하여 화면을 크기를 조정
        outlet.style.cssText = `zoom: ${height / standardHeight}`;
      }
    }
  };
};
